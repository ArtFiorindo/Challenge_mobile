import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/Layout';
import DatePicker from 'react-native-datepicker';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sinistro: string;
  descricao: string;
}

const CadastroPacienteScreen: React.FC = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sinistro, setSinistro] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const API_URL = 'http://localhost:3000/api/pacientes';

  useEffect(() => {
    carregarPacientes();
  }, []);

  // Carrega todos os pacientes do backend
  const carregarPacientes = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Erro ao carregar pacientes');
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os pacientes.');
    }
  };

  // Adiciona um novo paciente no backend
  const adicionarPaciente = async () => {
    if (!nome || !cpf || !dataNascimento || !sinistro || !descricao) {
      setModalVisible(true);
      return;
    }
    const novoPaciente = { nome, cpf, dataNascimento, sinistro, descricao };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPaciente),
      });

      if (!response.ok) throw new Error('Erro ao adicionar paciente');
      const pacienteCriado = await response.json();
      setPacientes([...pacientes, pacienteCriado]);
      setNome('');
      setCpf('');
      setDataNascimento('');
      setSinistro('');
      setDescricao('');
      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar o paciente.');
    }
  };

  // Navega para a tela de detalhes do paciente
  const abrirFichaPaciente = (paciente: Paciente) => {
    navigation.navigate('DetalhesPacienteScreen', { paciente });
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Paciente</Text>

        <View style={styles.formContainer}>
          <TextInput placeholder="Nome Completo" value={nome} onChangeText={setNome} style={styles.input} />
          <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} style={styles.input} />

          {Platform.OS === 'web' ? (
            <TextInput
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              style={styles.input}
            />
          ) : (
            <DatePicker
              style={{ width: '100%', marginBottom: 10 }}
              date={dataNascimento}
              mode="date"
              placeholder="Selecione a data"
              format="DD/MM/YYYY"
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              onDateChange={setDataNascimento}
              customStyles={{
                dateInput: { borderWidth: 1, padding: 8, alignItems: 'flex-start', borderRadius: 5 },
              }}
            />
          )}

          <TextInput placeholder="Sinistro" value={sinistro} onChangeText={setSinistro} style={styles.input} />
          <TextInput placeholder="Descrição Geral" value={descricao} onChangeText={setDescricao} style={styles.input} />

          <TouchableOpacity onPress={adicionarPaciente} style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Paciente</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => abrirFichaPaciente(item)} style={styles.listItem}>
              <View>
                <Text style={styles.listItemText}>{item.nome}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Por favor, preencha todos os campos!</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#E2E0FF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8C82FC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 15,
    backgroundColor: '#6059b1',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  listItemText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: 300,
  },
  modalText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 15,
  },
});

export default CadastroPacienteScreen;

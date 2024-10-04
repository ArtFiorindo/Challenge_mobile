import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';

const DetalhesPacienteScreen: React.FC = ({ route }) => {
  const { paciente } = route.params;
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <Image 
            source={require('../../assets/OnData.jpeg')} 
            style={styles.logo}
            resizeMode="contain" 
          />
        </View>

        {/* Detalhes do Cliente */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Detalhes do Cliente</Text>
          <Text style={styles.boxText}>Nome: {paciente.nome}</Text>
          <Text style={styles.boxText}>CPF: {paciente.cpf}</Text>
          <Text style={styles.boxText}>Data de Nascimento: {paciente.dataNascimento}</Text>
        </View>

        {/* Detalhes do Sinistro */}
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Detalhes Do Sinistro</Text>
          <Text style={styles.boxText}>Sinistro: {paciente.sinistro}</Text>
          <Text style={styles.boxText}>Descrição: {paciente.descricao}</Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>✔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FC8282' }]}>
            <Text style={styles.actionButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C82FC',
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#E2E0FF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  boxText: {
    fontSize: 16,
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#82FC95',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetalhesPacienteScreen;

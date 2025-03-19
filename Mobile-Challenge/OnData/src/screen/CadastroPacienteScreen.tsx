import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AdicionarPaciente from '../components/AdicionarPaciente';

const CadastroPacienteScreen: React.FC = ({ route }) => {
  const [editandoPaciente, setEditandoPaciente] = useState<any | null>(null);
  const [recarregarPacientes, setRecarregarPacientes] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Verificar se há parâmetros de atualização de status
  useEffect(() => {
    if (route.params?.statusUpdated) {
      // Recarregar a lista quando o status for atualizado
      carregarPacientes();
    }
  }, [route.params?.statusUpdated]);

  // Carregar a lista de pacientes ao iniciar
  useEffect(() => {
    carregarPacientes();
  }, [recarregarPacientes]);

  // Recarregar a lista quando a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarPacientes();
      return () => {};
    }, [])
  );

  const carregarPacientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/pacientes');
      setPacientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pacientes');
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarPacienteSucesso = () => {
    // Implementar Toast
    Alert.alert('Sucesso', 'Paciente adicionado com sucesso!');
    setEditandoPaciente(null);
    setRecarregarPacientes(prev => !prev);
    setMostrarForm(false);
  };

  // Função para determinar o estilo do status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'aprovado':
        return {
          container: {
            backgroundColor: '#E6F7EF',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
          },
          text: { 
            color: '#36B37E',
            fontWeight: 'bold',
            fontSize: 10
          }
        };
      case 'recusado':
        return {
          container: {
            backgroundColor: '#FFE9E9',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
          },
          text: { 
            color: '#FC8282',
            fontWeight: 'bold',
            fontSize: 10
          }
        };
      default: // pendente
        return {
          container: {
            backgroundColor: '#FFF8E6',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
          },
          text: { 
            color: '#FFB800',
            fontWeight: 'bold',
            fontSize: 10
          }
        };
    }
  };

  // Renderizar cada item da lista de pacientes
  const renderPacienteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pacienteCard}
      onPress={() => navigation.navigate('DetalhesPacienteScreen', { paciente: item })}
    >
      <View style={styles.pacienteHeader}>
        <View style={styles.pacienteIconContainer}>
          <Icon name="account" size={24} color="#8C82FC" />
        </View>
        <View style={styles.pacienteInfo}>
          <Text style={styles.pacienteNome}>{item.nome}</Text>
          <View style={getStatusStyle(item.status).container}>
            <Text style={getStatusStyle(item.status).text}>
              {item.status || 'pendente'}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              setEditandoPaciente(item);
              setMostrarForm(true);
            }}
          >
            <Icon name="pencil" size={20} color="#8C82FC" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sinistroInfo}>
        <Text style={styles.sinistroLabel}>Sinistro:</Text>
        <Text style={styles.sinistroValue}>{item.sinistro}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
        <View style={styles.circleMid} />
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#8C82FC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastro de Pacientes</Text>
          <View style={{width: 24}} /> {/* Spacer for alignment */}
        </View>
        
        <View style={styles.content}>
          {mostrarForm ? (
            <ScrollView 
              style={styles.scrollContent}
              contentContainerStyle={styles.formScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formCard}>
                <View style={styles.formHeader}>
                  <Text style={styles.formHeaderTitle}>
                    {editandoPaciente ? 'Editar Paciente' : 'Novo Paciente'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => {
                      setMostrarForm(false);
                      setEditandoPaciente(null);
                    }}
                  >
                    <Icon name="close" size={24} color="#8C82FC" />
                  </TouchableOpacity>
                </View>
                
                <AdicionarPaciente 
                  onAdicionarPaciente={handleAdicionarPacienteSucesso} 
                  paciente={editandoPaciente} 
                  setEditandoPaciente={setEditandoPaciente} 
                />
              </View>
            </ScrollView>
          ) : (
            <FlatList
              data={pacientes}
              renderItem={renderPacienteItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              refreshing={loading}
              onRefresh={carregarPacientes}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Nenhum paciente cadastrado</Text>
                </View>
              )}
            />
          )}
        </View>

        {!mostrarForm && (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => setMostrarForm(true)}
          >
            <View style={styles.fabContent}>
              <Icon name="plus" size={20} color="#FFFFFF" />
              <Text style={styles.fabText}>Cadastro de Paciente & Sinistro</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.footerTab}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Icon name="home" size={24} color="#777777" />
            <Text style={styles.footerTabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.footerTab, styles.footerTabActive]}>
            <Icon name="account-group" size={24} color="#8C82FC" />
            <Text style={styles.footerTabTextActive}>Pacientes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerTab}
            onPress={() => navigation.navigate('ConfiguracaoScreen')}
          >
            <Icon name="cog" size={24} color="#777777" />
            <Text style={styles.footerTabText}>Config</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Estilos mantidos sem alteração
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    overflow: 'hidden',
  },
  circleTop: {
    width: 425,
    height: 425,
    backgroundColor: '#e6e4ff',
    borderRadius: 212.5,
    position: 'absolute',
    top: -200,
    right: -100,
    zIndex: -1,
    opacity: 0.8,
  },
  circleBottom: {
    width: 300,
    height: 300,
    backgroundColor: '#e6e4ff',
    borderRadius: 150,
    position: 'absolute',
    bottom: -100,
    left: 95,
    zIndex: -1,
    opacity: 0.8,
  },
  circleMid: {
    width: 225,
    height: 225,
    backgroundColor: '#e6e4ff',
    borderRadius: 112.5,
    position: 'absolute',
    bottom: 250,
    left: -70,
    zIndex: -1,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8C82FC',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollContent: {
    flex: 1,
  },
  formScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
    flexGrow: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 80,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  formHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8C82FC',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#8C82FC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10,
  },
  fabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerTabActive: {
    borderTopWidth: 3,
    borderTopColor: '#8C82FC',
    paddingTop: 7,
  },
  footerTabText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 4,
  },
  footerTabTextActive: {
    color: '#8C82FC',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  // Novos estilos para a lista de pacientes
  pacienteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  pacienteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pacienteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pacienteInfo: {
    flex: 1,
  },
  pacienteNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  sinistroInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  sinistroLabel: {
    fontSize: 12,
    color: '#777777',
    marginRight: 5,
  },
  sinistroValue: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#777777',
  },
});

export default CadastroPacienteScreen;
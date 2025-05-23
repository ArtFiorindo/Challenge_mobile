import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'; // Precisará importar axios ou outra biblioteca HTTP

const DetalhesPacienteScreen: React.FC = ({ route }) => {
  const { paciente } = route.params;
  const navigation = useNavigation();

  // Função atualizada para redirecionar diretamente para a tela de cadastro
  const handleUpdateStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:3000/api/pacientes/${paciente.id}/status`, { status });
      // Navegar diretamente para a tela de cadastro sem esperar confirmação
      navigation.navigate('CadastroPacienteScreen');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do paciente");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#8C82FC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes do Paciente</Text>
          <View style={{width: 24}} /> {/* Spacer for alignment */}
        </View>
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Foto do Paciente */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Icon name="account" size={50} color="#8C82FC" />
            </View>
            <Text style={styles.profileName}>{paciente.nome}</Text>
            <View style={getStatusStyle(paciente.status).container}>
              <Text style={getStatusStyle(paciente.status).text}>
                {paciente.status || 'pendente'}
              </Text>
            </View>
          </View>
          
          {/* Detalhes do Cliente */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="card-account-details" size={20} color="#8C82FC" />
              <Text style={styles.cardTitle}>Detalhes do Paciente</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nome completo</Text>
              <Text style={styles.infoValue}>{paciente.nome}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>CPF</Text>
              <Text style={styles.infoValue}>{paciente.cpf}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data de Nascimento</Text>
              <Text style={styles.infoValue}>{paciente.dataNascimento}</Text>
            </View>
          </View>

          {/* Detalhes do Sinistro */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="file-document" size={20} color="#8C82FC" />
              <Text style={styles.cardTitle}>Detalhes Do Sinistro</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Sinistro</Text>
              <Text style={styles.infoValue}>{paciente.sinistro}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Descrição</Text>
              <Text style={styles.infoValue}>{paciente.descricao}</Text>
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleUpdateStatus('aprovado')}
            >
              <Icon name="check" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Aprovar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#FC8282' }]}
              onPress={() => handleUpdateStatus('recusado')}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Rejeitar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {/* Footer code remains the same */}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Função auxiliar para estilizar o status
const getStatusStyle = (status) => {
  switch (status) {
    case 'aprovado':
      return {
        container: {
          backgroundColor: '#E6F7EF',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 20,
          marginTop: 8
        },
        text: { 
          color: '#36B37E',
          fontWeight: 'bold',
          fontSize: 12
        }
      };
    case 'recusado':
      return {
        container: {
          backgroundColor: '#FFE9E9',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 20,
          marginTop: 8
        },
        text: { 
          color: '#FC8282',
          fontWeight: 'bold',
          fontSize: 12
        }
      };
    default: // pendente
      return {
        container: {
          backgroundColor: '#FFF8E6',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 20,
          marginTop: 8
        },
        text: { 
          color: '#FFB800',
          fontWeight: 'bold',
          fontSize: 12
        }
      };
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  circleTop: {
    width: 425,
    height: 425,
    backgroundColor: '#E2E0FF',
    borderRadius: 200,
    position: 'absolute',
    top: -200,
    right: -100,
    zIndex: -1,
  },
  circleBottom: {
    width: 300,
    height: 300,
    backgroundColor: '#E2E0FF',
    borderRadius: 150,
    position: 'absolute',
    bottom: -100,
    left: -80,
    zIndex: -1,
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8C82FC',
    marginLeft: 10,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#777777',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#8C82FC',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerTabActive: {
    borderTopWidth: 3,
    borderTopColor: '#8C82FC',
    paddingTop: 9,
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
});

export default DetalhesPacienteScreen;
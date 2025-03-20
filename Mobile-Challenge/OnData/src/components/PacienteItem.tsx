import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sinistro: string;
  descricao: string;
  status?: string;
}

interface PacienteItemProps {
  paciente: Paciente;
  onEdit: (paciente: Paciente) => void;
  onDelete: (id: number) => void;
}

const PacienteItem: React.FC<PacienteItemProps> = ({ paciente, onEdit, onDelete }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('DetalhesPacienteScreen', { paciente });
  };

  // Simplificado para evitar problemas com o evento
  const handleDelete = (e: any) => {
    e.stopPropagation(); // Previne que o evento de navegação seja acionado
    console.log('Botão de exclusão pressionado para o paciente:', paciente.id);
    onDelete(paciente.id);
  };

  // Função para determinar o estilo do status
  const getStatusStyle = (status: string = 'pendente') => {
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

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.pacienteHeader}>
        <View style={styles.pacienteIconContainer}>
          <Icon name="account" size={24} color="#8C82FC" />
        </View>
        <View style={styles.pacienteInfo}>
          <Text style={styles.nome}>{paciente.nome}</Text>
          <View style={getStatusStyle(paciente.status).container}>
            <Text style={getStatusStyle(paciente.status).text}>
              {paciente.status || 'pendente'}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={(e) => {
              e.stopPropagation();
              onEdit(paciente);
            }}
          >
            <Icon name="pencil" size={20} color="#8C82FC" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDelete}
          >
            <Icon name="delete" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.sinistroInfo}>
        <Text style={styles.sinistroLabel}>Sinistro:</Text>
        <Text style={styles.sinistroValue}>{paciente.sinistro}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  nome: {
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
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#F0F0FF',
    borderRadius: 8,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#FF6347',
    borderRadius: 8,
  },
});

export default PacienteItem;
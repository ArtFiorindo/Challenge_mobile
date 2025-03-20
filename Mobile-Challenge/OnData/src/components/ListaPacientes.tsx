import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { Toast } from 'native-base';
import PacienteItem from './PacienteItem';

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  sinistro: string;
  descricao: string;
  status?: string;
}

interface ListaPacientesProps {
  setEditandoPaciente: (paciente: Paciente) => void;
  recarregarPacientes: boolean;
  mostrarForm?: (show: boolean) => void;
}

const ListaPacientes: React.FC<ListaPacientesProps> = ({ 
  setEditandoPaciente, 
  recarregarPacientes,
  mostrarForm
}) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/pacientes', { method: 'GET' });
      const data = await response.json();
      setPacientes(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      Toast.show({ description: 'Erro ao buscar pacientes', bgColor: 'red.500' });
      setLoading(false);
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setEditandoPaciente(paciente);
    if (mostrarForm) {
      mostrarForm(true);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este paciente?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => confirmDelete(id)
        }
      ]
    );
  };

  const confirmDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pacientes/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setPacientes(prev => prev.filter(paciente => paciente.id !== id));
        Toast.show({ description: 'Paciente excluído com sucesso!', bgColor: 'green.500' });
      } else {
        const errorText = await response.text();
        console.error('Erro retornado pela API:', errorText);
        throw new Error('Erro ao excluir paciente');
      }
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      Alert.alert('Erro', 'Não foi possível excluir o paciente.');
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, [recarregarPacientes]);

  return (
    <FlatList
      data={pacientes}
      renderItem={({ item }) => (
        <PacienteItem 
          paciente={item} 
          onDelete={handleDelete} 
          onEdit={handleEdit} 
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshing={loading}
      onRefresh={fetchPacientes}
    />
  );
};

export default ListaPacientes;
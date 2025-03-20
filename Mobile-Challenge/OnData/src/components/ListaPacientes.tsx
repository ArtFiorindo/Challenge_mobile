import React, { useEffect, useState } from 'react';
import { FlatList, Alert } from 'react-native';
import { Toast } from 'native-base';
import PacienteItem from './PacienteItem';
import axios from 'axios';

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
  setMostrarForm?: (mostrar: boolean) => void;
}

const ListaPacientes: React.FC<ListaPacientesProps> = ({ 
  setEditandoPaciente, 
  recarregarPacientes, 
  setMostrarForm 
}) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPacientes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/pacientes', { method: 'GET' });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Pacientes carregados:', data.length);
      setPacientes(data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
      Toast.show({ 
        description: 'Erro ao buscar pacientes', 
        bgColor: 'red.500' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // Primeiro confirmamos a exclusão
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
          onPress: () => confirmedDelete(id)
        }
      ]
    );
  };

  // Função separada que executa a exclusão depois da confirmação
  const confirmedDelete = async (id: number) => {
       try {
         console.log('Excluindo paciente com ID:', id);
         
         // Definir a URL completa para evitar problemas de URL relativa
         const url = `http://localhost:3000/api/pacientes/${id}`;
         console.log('URL da requisição:', url);
         
         const response = await fetch(url, { 
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           }
         });
    
         console.log('Status da resposta:', response.status);
         
         if (response.ok || response.status === 200) {
           console.log('Paciente excluído com sucesso na API');
           
           // Atualizamos o estado local removendo o paciente excluído
           setPacientes(prevPacientes => 
             prevPacientes.filter(paciente => paciente.id !== id)
           );
           
           Toast.show({ 
             description: 'Paciente excluído com sucesso!', 
             bgColor: 'green.500' 
           });
           
           // Recarregamos a lista para garantir sincronização
           setTimeout(fetchPacientes, 500);
         } else {
           const errorText = await response.text();
           console.error('Erro retornado pela API:', errorText);
           throw new Error(`Erro ao excluir paciente: ${response.status} - ${errorText}`);
         }
       } catch (error) {
         console.error('Erro ao excluir paciente:', error);
         Alert.alert('Erro', 'Não foi possível excluir o paciente. Verifique o console para mais detalhes.');
       }
     };
  const handleEdit = (paciente: Paciente) => {
    setEditandoPaciente(paciente);
    // Se a função setMostrarForm existir, chama ela também
    if (setMostrarForm) {
      setMostrarForm(true);
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
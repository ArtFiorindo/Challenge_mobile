import React, { useState } from 'react';
import { ScrollView, Text, Box, Toast } from 'native-base';
import Layout from '../components/Layout';
import ListaPacientes from '../components/ListaPacientes';
import AdicionarPaciente from '../components/AdicionarPaciente';

const CadastroPacienteScreen: React.FC = () => {
  const [editandoPaciente, setEditandoPaciente] = useState<Paciente | null>(null);
  const [recarregarPacientes, setRecarregarPacientes] = useState(false);

  const handleAdicionarPacienteSucesso = () => {
    Toast.show({
      description: 'Paciente adicionado com sucesso!',
      bgColor: 'green.500',
    });
    setEditandoPaciente(null);
    setRecarregarPacientes(prev => !prev); 
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <Box>
          <Text fontSize="2xl" bold mb={4} textAlign="center">
            Cadastro de Pacientes
          </Text>
          <AdicionarPaciente 
            onAdicionarPaciente={handleAdicionarPacienteSucesso} 
            paciente={editandoPaciente} 
            setEditandoPaciente={setEditandoPaciente} 
          />
          <ListaPacientes 
            setEditandoPaciente={setEditandoPaciente} 
            recarregarPacientes={recarregarPacientes} 
          />
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default CadastroPacienteScreen;

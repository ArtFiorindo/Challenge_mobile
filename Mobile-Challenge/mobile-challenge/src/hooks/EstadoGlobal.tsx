 import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  titulo: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (titulo: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

// Cria o contexto global de estado
const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => {},
  editarTarefa: () => {},
  excluirTarefa: () => {},
});

// Hook para acessar o contexto global de estado
export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

// Componente que fornece o contexto global de estado para seus filhos
export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = async (titulo: string) => {
    const novaTarefa: Tarefa = {
      id: Date.now(),
      titulo,
    };

    try {
      const novasTarefas = [...tarefas, novaTarefa];
      setTarefas(novasTarefas);
      await salvarTarefas(novasTarefas);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  // Função para editar o título de uma tarefa
  const editarTarefa = async (id: number, novoTitulo: string) => {
    const novasTarefas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, titulo: novoTitulo } : tarefa
    );

    try {
      setTarefas(novasTarefas);
      await salvarTarefas(novasTarefas);
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  // Função para excluir uma tarefa
  const excluirTarefa = async (id: number) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);

    try {
      setTarefas(novasTarefas);
      await salvarTarefas(novasTarefas);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  // Carrega as tarefas do AsyncStorage na inicialização
  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const tarefasArmazenadas = await AsyncStorage.getItem('tarefas');
        if (tarefasArmazenadas) {
          setTarefas(JSON.parse(tarefasArmazenadas));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    carregarTarefas();
  }, []);

  // Função para salvar as tarefas no AsyncStorage
  const salvarTarefas = async (tarefas: Tarefa[]) => {
    try {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  // Retorna o contexto global de estado com as funções para manipular as tarefas
  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};

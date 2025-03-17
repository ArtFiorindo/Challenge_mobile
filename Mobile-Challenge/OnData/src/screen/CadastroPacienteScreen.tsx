import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from '../components/Layout';
import ListaPacientes from '../components/ListaPacientes';
import AdicionarPaciente from '../components/AdicionarPaciente';

const CadastroPacienteScreen: React.FC = () => {
  const [editandoPaciente, setEditandoPaciente] = useState<Paciente | null>(null);
  const [recarregarPacientes, setRecarregarPacientes] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const navigation = useNavigation();

  const handleAdicionarPacienteSucesso = () => {
    // Implementar Toast
    alert('Paciente adicionado com sucesso!');
    setEditandoPaciente(null);
    setRecarregarPacientes(prev => !prev);
    setMostrarForm(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
        
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
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {mostrarForm ? (
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
          ) : (
            <ListaPacientes 
              setEditandoPaciente={(paciente) => {
                setEditandoPaciente(paciente);
                setMostrarForm(true);
              }} 
              recarregarPacientes={recarregarPacientes} 
            />
          )}
        </ScrollView>

        {!mostrarForm && (
          <TouchableOpacity 
            style={styles.fab}
            onPress={() => setMostrarForm(true)}
          >
            <Icon name="plus" size={24} color="#FFFFFF" />
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
    backgroundColor: '#e6e4ff',
    borderRadius: 200,
    position: 'absolute',
    top: -200,
    right: -100,
    zIndex: -1,
  },
  circleBottom: {
    width: 300,
    height: 300,
    backgroundColor: '#e6e4ff',
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
    paddingBottom: 80, // For FAB button
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
    bottom: 80,
    backgroundColor: '#8C82FC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8
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

export default CadastroPacienteScreen;
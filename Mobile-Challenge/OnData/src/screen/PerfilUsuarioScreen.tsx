import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_BASE_URL = 'http://seu-api-url'; // Substitua com a URL da sua API

const PerfilUsuarioScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Recuperar o token do usuário
      const token = await AsyncStorage.getItem('token');
      
      // Se não houver token, redirecionar para login
      if (!token) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
        return;
      }
      
      // Fazer requisição à API para obter os dados do usuário
      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao buscar dados');
      }
      
      const userData = await response.json();
      
      setEmail(userData.email);
      setNome(userData.username || 'Usuário');
      
      // Armazenar no AsyncStorage para uso offline
      await AsyncStorage.setItem('userEmail', userData.email);
      await AsyncStorage.setItem('userName', userData.username || 'Usuário');
      
    } catch (error: any) {
      console.error('Erro ao buscar dados do usuário:', error);
      
      // Tentar usar dados salvos localmente como fallback
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userName = await AsyncStorage.getItem('userName');
      
      if (userEmail) setEmail(userEmail);
      if (userName) setNome(userName);
      else {
        Alert.alert('Erro', error.message || 'Não foi possível carregar seus dados');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'O email não pode ficar vazio');
      return;
    }
    
    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setIsSaving(true);
    try {
      // Recuperar o token para autenticação
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
        return;
      }
      
      // Enviar a atualização para a API
      const response = await fetch('http://localhost:3000/api/update-email', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar email');
      }
      
      // Atualizar no AsyncStorage
      await AsyncStorage.setItem('userEmail', email);
      
      Alert.alert('Sucesso', 'Email atualizado com sucesso');
    } catch (error: any) {
      console.error('Erro ao salvar email:', error);
      Alert.alert('Erro', error.message || 'Não foi possível atualizar o email');
    } finally {
      setIsSaving(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const navigateToResetPassword = () => {
    navigation.navigate('ResetPasswordScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.circleTop} />
          <View style={styles.circleBottom} />
        </View>
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#8C82FC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil do Usuário</Text>
          <View style={{width: 24}} />
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8C82FC" />
            <Text style={styles.loadingText}>Carregando dados...</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="account" size={50} color="#8C82FC" />
              </View>
              <Text style={styles.userName}>{nome || 'Usuário'}</Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Informações da Conta</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Seu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEmail}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Icon name="content-save" size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Salvar Email</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Segurança</Text>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={navigateToResetPassword}
              >
                <Icon name="lock-reset" size={24} color="#8C82FC" />
                <Text style={styles.optionText}>Alterar Senha</Text>
                <Icon name="chevron-right" size={20} color="#AAAAAA" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.footerTab}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Icon name="home" size={24} color="#777777" />
            <Text style={styles.footerTabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerTab}
            onPress={() => navigation.navigate('CadastroPacienteScreen')}
          >
            <Icon name="account-group" size={24} color="#777777" />
            <Text style={styles.footerTabText}>Pacientes</Text>
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
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  circleTop: {
    width: 350,
    height: 350,
    backgroundColor: '#E2E0FF',
    borderRadius: 300,
    position: 'absolute',
    top: -50,
    right: -50,
    zIndex: -1,
  },
  circleBottom: {
    width: 250,
    height: 250, 
    backgroundColor: '#E2E0FF',
    borderRadius: 125,
    position: 'absolute',
    bottom: -125,
    left: -50,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#8C82FC',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#8C82FC',
  },
  userName: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8C82FC',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#F9F9F9',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#8C82FC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#444444',
    marginLeft: 16,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  footerTabActive: {
    borderTopWidth: 3,
    borderTopColor: '#8C82FC',
    paddingTop: 5,
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

export default PerfilUsuarioScreen;
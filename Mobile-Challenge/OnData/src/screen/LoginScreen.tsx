import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role: 'user',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);
      setError(null);
      navigation.replace('CadastroPacienteScreen');
    } catch (error) {
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  const handleNavigateToRegister = () => {
    navigation.replace('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      {/* Título e logo */}
      <Text style={styles.welcomeText}>Bem-Vindo</Text>
      <Image 
        source={require('../../assets/OnData.jpeg')} 
        style={styles.logo}
        resizeMode="contain" 
      />

      {/* Campos de login */}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Botão de login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Mensagem de erro */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Link de cadastro */}
      <TouchableOpacity onPress={handleNavigateToRegister} style={styles.registerLink}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Altera a justificativa para iniciar no topo
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 28,
    textAlign: 'center',
    color: '#8C82FC',
    marginBottom: 10, // Reduzido para empurrar o logo para cima
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20, // Reduzido para aproximar do campo
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#8C82FC',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;

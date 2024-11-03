import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const API_URL = 'http://localhost:3000/api/login';

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
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
      Alert.alert('Erro', 'Não foi possível fazer login. Verifique as credenciais e tente novamente.');
    }
  };

  const handleNavigateToRegister = () => {
    navigation.replace('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      {/* Círculos de fundo */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-Vindo</Text>
      </View>

      <Image 
        source={require('../../assets/OnDataLogo.png')} 
        style={styles.logo}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#5c5c5c"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#5c5c5c"
      />

      {/* Exibe o erro na frente dos elementos */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')} style={{ marginTop: 20 }}>
        <Text style={styles.loginLink}>Esqueceu a senha? Redefinir senha</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>ou</Text>

      <TouchableOpacity style={styles.socialButtonGoogle}>
        <FontAwesome name="google" size={20} color="#000" />
        <Text style={styles.socialButtonText}>Conecte com o Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButtonApple}>
        <FontAwesome name="apple" size={20} color="#000" />
        <Text style={styles.socialButtonText}>Conecte com a Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToRegister} style={styles.registerLink}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  circleTop: {
    width: 425,
    height: 425,
    backgroundColor: '#5c50b8',
    borderRadius: 200,
    position: 'absolute',
    top: -200,
    right: -100,
    zIndex: -1,
  },
  circleBottom: {
    width: 300,
    height: 300,
    backgroundColor: '#5c50b8',
    borderRadius: 150,
    position: 'absolute',
    bottom: -100,
    left: -80,
    zIndex: -1,
  },
  welcomeText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 190, 
    height: 190,
    resizeMode: 'contain', 
    marginBottom: 30, 
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#d4d4d4',
    color: '#000000',
  },
  button: {
    width: '100%',
    backgroundColor: '#7A6BF5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#ffffff',
    fontSize: 14,
    marginVertical: 10,
  },
  socialButtonGoogle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  socialButtonApple: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  registerLink: {
    marginTop: 10,
  },
  registerText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
    zIndex: 1,  
    width: '100%',
  },
  loginLink: {
    color: '#8f45fe',
  }
});

export default LoginScreen;

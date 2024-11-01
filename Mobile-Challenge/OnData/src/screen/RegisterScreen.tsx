import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importe a imagem
import Logo from '../../assets/OnDataLogo.png';  // ajuste o caminho da imagem

const { height, width } = Dimensions.get('window'); // Obtém a altura e largura da tela

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword || !cnpj || !email) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/register', {  // Substitua pelo IP da sua máquina
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          cnpj,
          email,
          role: 'user',  // Valor fixo de `role`
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('LoginScreen');
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.error || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      {/* Círculos de fundo */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNavigateToLogin} style={{ marginTop: 20 }}>
          <Text style={styles.loginLink}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#5c50b8',
    top: -150,
    right: -50,
    zIndex: -1,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#7A6BF5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  bottomCircle: {
    position: 'absolute',
    width: 500,
    height: 500,
    backgroundColor: '#5c50b8',
    borderRadius: 250,
    bottom: -150,
    left: -130,
    zIndex: -1,
  },
});

export default RegisterScreen;

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginScreen: undefined;
};

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

const ResetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();

  const handleResetPassword = async () => {
    setError(null);

    if (!email || !newPassword || !confirmNewPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        setError(null);
        alert('Senha redefinida com sucesso!');
        navigation.navigate('LoginScreen');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao redefinir a senha');
      }
    } catch (error) {
      setError('Falha ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Círculos de fundo */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../../assets/OnDataLogo.png')} 
          style={styles.logo}
        />
        
        <Text style={styles.title}>Redefinir Senha</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Nova Senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar Nova Senha"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>

        {/* Exibe a mensagem de erro, se houver */}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  circleTop: {
    width: 425,
    height: 425,
    backgroundColor: '#5c50b8',
    borderRadius: 200,
    position: 'absolute',
    top: -200,
    right: -100,
  },
  circleBottom: {
    width: 300,
    height: 300,
    backgroundColor: '#5c50b8',
    borderRadius: 150,
    position: 'absolute',
    bottom: -100,
    left: -80,
  },
  logo: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    color: '#000',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ResetPasswordScreen;

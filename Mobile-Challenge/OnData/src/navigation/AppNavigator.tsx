import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import CadastroPacienteScreen from '../screen/CadastroPacienteScreen';
import DetalhesPacienteScreen from '../screen/DetalhesPacienteScreen';
import ConfiguracaoScreen from '../screen/ConfiguracaoScreen';
import ResetPasswordScreen from '../screen/ResetPasswordScreen';
import HomeScreen from '../screen/HomeScreen'; 
import PerfilUsuarioScreen from '../screen/PerfilUsuarioScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ title: 'Cadastro' }} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="ResetPasswordScreen" 
          component={ResetPasswordScreen} 
          options={{ title: 'Redefinir Senha' }} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="CadastroPacienteScreen" 
          component={CadastroPacienteScreen} 
          options={{ title: 'Cadastro de Pacientes' }} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="ConfiguracaoScreen" 
          component={ConfiguracaoScreen} 
          options={{ title: 'Configurações' }} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="DetalhesPacienteScreen" 
          component={DetalhesPacienteScreen} 
          options={{ title: 'Detalhes do Paciente' }} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PerfilUsuarioScreen" 
          component={PerfilUsuarioScreen} 
          options={{ title: 'Perfil do Usuario' }} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
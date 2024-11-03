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
        />

        <Stack.Screen 
          name="ResetPasswordScreen" 
          component={ResetPasswordScreen} 
          options={{ title: 'Redefinir Senha' }} 
        />


        <Stack.Screen 
          name="CadastroPacienteScreen" 
          component={CadastroPacienteScreen} 
          options={{ title: 'Cadastro de Pacientes' }} 
        />

        <Stack.Screen 
          name="ConfiguracaoScreen" 
          component={ConfiguracaoScreen} 
          options={{ title: 'Configurações' }} 
        />

        <Stack.Screen 
          name="DetalhesPacienteScreen" 
          component={DetalhesPacienteScreen} 
          options={{ title: 'Detalhes do Paciente' }} 
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

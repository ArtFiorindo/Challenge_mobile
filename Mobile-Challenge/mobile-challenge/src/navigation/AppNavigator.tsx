import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import CadastroPacienteScreen from '../screen/CadastroPacienteScreen';
import DetalhesPacienteScreen from '../screen/DetalhesPacienteScreen';
import ConfiguracaoScreen from '../screen/ConfiguracaoScreen';


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="CadastroPacienteScreen" component={CadastroPacienteScreen} />
        <Stack.Screen name="ConfiguracaoScreen" component={ConfiguracaoScreen} />
        <Stack.Screen name="DetalhesPacienteScreen" component={DetalhesPacienteScreen} />
       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
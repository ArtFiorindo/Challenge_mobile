import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; 

const ConfiguracaoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isPressed, setIsPressed] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); 
      Alert.alert('Logout realizado com sucesso');
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Erro ao fazer logout');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Configurações</Text>

      <TouchableOpacity
        onPress={handleLogout}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)} 
        style={{
          backgroundColor: isPressed ? '#ff4d4d' : 'red',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfiguracaoScreen;

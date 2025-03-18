import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfiguracaoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    console.log('Logout button pressed');
    
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed successfully');
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      
      Alert.alert(
        'Logout', 
        'Logout realizado com sucesso'
      );
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Erro', 'Erro ao fazer logout');
    }
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
          <Text style={styles.headerTitle}>Configurações</Text>
          <View style={{width: 24}} />
        </View>
        
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Opções da Conta</Text>
            
            <TouchableOpacity 
              style={styles.optionItem}
              onPress={() => navigation.navigate('PerfilUsuarioScreen')}
            >
              <Icon name="account-cog" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Perfil do Usuário</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
            
          
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Aplicativo</Text>
           
            
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="translate" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Idioma</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            activeOpacity={0.5}
          >
            <Icon name="logout" size={20} color="#FFFFFF" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity style={[styles.footerTab, styles.footerTabActive]}>
            <Icon name="cog" size={24} color="#8C82FC" />
            <Text style={styles.footerTabTextActive}>Config</Text>
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
    overflow: 'hidden', // Impede o vazamento de conteúdo
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden', // Contém os círculos decorativos
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10, // Garante espaço na parte inferior
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
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Reduzido para economizar espaço
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
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
    paddingVertical: 8, // Reduzido para economizar espaço
  },
  footerTabActive: {
    borderTopWidth: 3,
    borderTopColor: '#8C82FC',
    paddingTop: 5, // Ajustado para compensar a borda
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
  
export default ConfiguracaoScreen;
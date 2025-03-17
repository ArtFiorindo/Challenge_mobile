import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfiguracaoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    console.log('Logout button pressed'); // Add this to verify the function is being called
    
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed successfully');
      
      // Use reset instead of navigate to prevent going back
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      
      // Show alert after navigation initiated
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
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
        
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#8C82FC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configurações</Text>
          <View style={{width: 24}} /> {/* Spacer for alignment */}
        </View>
        
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Opções da Conta</Text>
            
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="account-cog" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Perfil do Usuário</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="bell-outline" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Notificações</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="shield-lock-outline" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Segurança</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Aplicativo</Text>
            
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="theme-light-dark" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Tema</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <Icon name="translate" size={24} color="#8C82FC" />
              <Text style={styles.optionText}>Idioma</Text>
              <Icon name="chevron-right" size={20} color="#AAAAAA" />
            </TouchableOpacity>
          </View>
          
          {/* Logout button - make sure this is directly bound to the handler */}
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            activeOpacity={0.5} // Make it more responsive
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
  },
  circleTop: {
    width: 425,
    height: 425,
    backgroundColor: '#E2E0FF',
    borderRadius: 200,
    position: 'absolute',
    top: -200,
    right: -100,
    zIndex: -1,
  },
  circleBottom: {
    width: 300,
    height: 300,
    backgroundColor: '#E2E0FF',
    borderRadius: 150,
    position: 'absolute',
    bottom: -100,
    left: -80,
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
      marginVertical: 20,
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
      paddingBottom: 10,
    },
    footerTab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
    },
    footerTabActive: {
      borderTopWidth: 3,
      borderTopColor: '#8C82FC',
      paddingTop: 9,
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
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>OnData</Text>
        </View>

        <View style={styles.content}>
          <Image 
            source={require('../../assets/OnDataLogo.png')} 
            style={styles.logo}
            resizeMode="contain" 
          />
          
          <Text style={styles.title}>Bem-vindo ao OnData</Text>
          <Text style={styles.subtitle}>Gerenciamento de pacientes simplificado</Text>
          
          <View style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('CadastroPacienteScreen')}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconContainer}>
                <Icon name="account-plus" size={32} color="#8C82FC" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Cadastro de Pacientes</Text>
                <Text style={styles.cardDescription}>Gerencie o cadastro de pacientes</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#8C82FC" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('ConfiguracaoScreen')}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconContainer}>
                <Icon name="cog" size={32} color="#8C82FC" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Configurações</Text>
                <Text style={styles.cardDescription}>Ajuste as configurações do sistema</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#8C82FC" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={[styles.footerTab, styles.footerTabActive]}>
            <Icon name="home" size={24} color="#8C82FC" />
            <Text style={styles.footerTabTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerTab}
            onPress={() => navigation.navigate('CadastroPacienteScreen')}
          >
            <Icon name="account-group" size={24} color="#777777" />
            <Text style={styles.footerTabText}>Pacientes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerTab}
            onPress={() => navigation.navigate('ConfiguracaoScreen')}
          >
            <Icon name="cog" size={24} color="#777777" />
            <Text style={styles.footerTabText}>Config</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8C82FC',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C82FC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E6E',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#8C82FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  cardIconContainer: {
    backgroundColor: '#F0F0FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8C82FC',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6E6E6E',
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

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { SemanticColors, Colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageSelectionScreen = ({ navigation }: any) => {
  const handleSelectLanguage = async (lang: string) => {
    // In a real app we'd load i18n locales here
    await AsyncStorage.setItem('app_language', lang);
    navigation.navigate('RoleSelection');
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
        <Text style={styles.logo}>MAPS FREIGHT</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button 
          title="English" 
          variant="primary" 
          onPress={() => handleSelectLanguage('en')} 
        />
        <Button 
          title="हिन्दी" 
          variant="outline" 
          onPress={() => handleSelectLanguage('hi')} 
        />
        <Button 
          title="ગુજરાતી" 
          variant="outline" 
          onPress={() => handleSelectLanguage('gu')} 
        />
      </View>

      <Text style={styles.footerText}>You can change this later in Settings</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    color: SemanticColors.textPrimary,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  footerText: {
    color: SemanticColors.textSecondary,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  }
});

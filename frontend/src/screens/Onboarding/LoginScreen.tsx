import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';
import { supabase } from '../../services/supabase';
import { Ionicons } from '@expo/vector-icons';

export const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    if (phone.trim().length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const { data: user, error } = await supabase.rpc('check_user_login', {
        phone_input: phone.trim()
      });

      if (error) {
        console.error("RPC Error:", error);
        alert(`DB Error: ${error.message}`);
        return;
      }

      if (user && user.id) {
        const role = user.role; // 'broker', 'shipper', or 'transporter'
        
        // Sync to local PrototypeStore so the rest of the app works
        PrototypeStore.setCurrentUser({
          id: user.id,
          role: role,
          name: user.name,
          phone: user.mobile,
          city: user.location,
          status: role === 'broker' ? 'pending' : 'active',
          tier: role === 'broker' ? 'free_preview' : undefined,
          wallet: 0,
          unlocks: 0,
          deals: 0
        } as any);

        navigation.navigate('OTPLogin', { phone: user.mobile, role });
      } else {
        alert('Account not found with this phone number. Please register first.');
        navigation.navigate('RoleSelection');
      }
    } catch (e: any) {
      console.error(e);
      alert('Login error: ' + e.message);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={20} color={Colors.gold} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subtext}>Log in with your registered mobile number</Text>

        <Input
          label="Phone (WhatsApp)"
          placeholder="10 digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        <Button
          title="Send OTP"
          onPress={handleLogin}
          style={styles.submitBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backText: {
    color: Colors.gold,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    color: SemanticColors.textPrimary,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtext: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    marginBottom: 40,
    lineHeight: 20,
  },
  input: {
    marginBottom: 32,
  },
  submitBtn: {
    marginTop: 8,
  },
});

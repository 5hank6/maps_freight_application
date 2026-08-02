import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';
import { Ionicons } from '@expo/vector-icons';

export const OTPScreen = ({ route, navigation }: any) => {
  const { phone } = route.params || { phone: 'your number' };
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp.trim() !== '123456') {
      alert('Invalid OTP. Demo OTP is 123456.');
      return;
    }

    const me = PrototypeStore.getState().currentUser;
    if (me.role === 'admin') {
      navigation.reset({ index: 0, routes: [{ name: 'AdminPortal' }] });
    } else if (me.role === 'broker') {
      navigation.reset({ index: 0, routes: [{ name: 'BrokerPortal' }] });
    } else if (me.role === 'transporter') {
      navigation.reset({ index: 0, routes: [{ name: 'TruckOwnerPortal' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'ShipperPortal' }] });
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={20} color={Colors.gold} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Verify Phone</Text>
        <Text style={styles.subtext}>Enter the 6-digit verification code sent to{'\n'}+91 {phone}</Text>

        <View style={styles.demoOtpBox}>
          <Text style={styles.demoOtpText}>DEMO OTP: 123456</Text>
        </View>

        <Input
          placeholder="1 2 3 4 5 6"
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          style={styles.otpInput}
        />

        <Button
          title="Verify & Login"
          onPress={handleVerify}
          disabled={otp.length !== 6}
          style={styles.submitBtn}
        />

        <TouchableOpacity onPress={() => alert("OTP Resent!")}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendAction}>Resend OTP</Text></Text>
        </TouchableOpacity>
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
    marginBottom: 32,
    lineHeight: 22,
  },
  demoOtpBox: {
    backgroundColor: Colors.asphalt,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
    marginBottom: 32,
    alignItems: 'center',
  },
  demoOtpText: {
    color: Colors.goldHi,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 2,
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 12,
    marginBottom: 32,
    color: Colors.ivory,
  },
  submitBtn: {
    marginTop: 8,
  },
  resendText: {
    color: SemanticColors.textSecondary,
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
  },
  resendAction: {
    color: Colors.gold,
    fontWeight: '600',
  },
});

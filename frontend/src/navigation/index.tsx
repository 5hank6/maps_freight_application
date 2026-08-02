import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LanguageSelectionScreen } from '../screens/Onboarding/LanguageSelectionScreen';
import { RoleSelectionScreen } from '../screens/Onboarding/RoleSelectionScreen';
import { RegistrationScreen } from '../screens/Onboarding/RegistrationScreen';
import { LoginScreen } from '../screens/Onboarding/LoginScreen';
import { OTPScreen } from '../screens/Onboarding/OTPScreen';

import { ShipperNavigator } from './ShipperNavigator';
import { BrokerNavigator } from './BrokerNavigator';
import { TruckOwnerNavigator } from './TruckOwnerNavigator';
import { AdminDashboardScreen } from '../screens/Admin/AdminDashboardScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#071527' } }}>
      <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTPLogin" component={OTPScreen} />
      <Stack.Screen name="ShipperPortal" component={ShipperNavigator} />
      <Stack.Screen name="TruckOwnerPortal" component={TruckOwnerNavigator} />
      <Stack.Screen name="BrokerPortal" component={BrokerNavigator} />
      <Stack.Screen name="AdminPortal" component={AdminDashboardScreen} />
    </Stack.Navigator>
  );
};

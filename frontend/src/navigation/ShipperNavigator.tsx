import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { ShipperHomeScreen } from '../screens/Shipper/ShipperHomeScreen';
import { PostLoadScreen } from '../screens/Shipper/PostLoadScreen';
import { FindTrucksFeedScreen } from '../screens/Shipper/FindTrucksFeedScreen';
import { BrokerWalletScreen as ShipperWalletScreen } from '../screens/Broker/BrokerWalletScreen';
import { NotificationsScreen } from '../screens/Common/NotificationsScreen';
import { ProfileScreen } from '../screens/Common/ProfileScreen';
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const ShipperNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.ink,
          borderTopColor: 'rgba(159, 178, 203, 0.16)',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.slate,
        tabBarIcon: ({ color, size }) => {
          let iconName: any = 'cube-outline';
          if (route.name === 'PostLoad') iconName = 'add-circle-outline';
          if (route.name === 'FindTrucks') iconName = 'bus-outline';
          if (route.name === 'Wallet') iconName = 'wallet-outline';
          if (route.name === 'Alerts') iconName = 'notifications-outline';
          if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="PostLoad" component={PostLoadScreen} options={{ title: 'Post Goods' }} />
      <Tab.Screen name="Home" component={ShipperHomeScreen} options={{ title: 'My Listings' }} />
      <Tab.Screen name="FindTrucks" component={FindTrucksFeedScreen} options={{ title: 'Find Trucks' }} />
      <Tab.Screen name="Wallet" component={ShipperWalletScreen} options={{ title: 'Wallet' }} />
      <Tab.Screen name="Alerts" component={NotificationsScreen} options={{ title: 'Alerts' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

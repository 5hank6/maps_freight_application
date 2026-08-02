import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { BrokerGoodsScreen } from '../screens/Broker/BrokerGoodsScreen';
import { BrokerTrucksScreen } from '../screens/Broker/BrokerTrucksScreen';
import { BrokerUnlocksScreen } from '../screens/Broker/BrokerUnlocksScreen';
import { BrokerPostOnBehalfScreen } from '../screens/Broker/BrokerPostOnBehalfScreen';
import { BrokerWalletScreen } from '../screens/Broker/BrokerWalletScreen';
import { NotificationsScreen } from '../screens/Common/NotificationsScreen';
import { ProfileScreen } from '../screens/Common/ProfileScreen';
import { Colors, SemanticColors } from '../theme/colors';
import { PrototypeStore } from '../services/store';

const Tab = createBottomTabNavigator();

export const BrokerNavigator = () => {
  const storeState = PrototypeStore.getState();
  const me = storeState.currentUser;
  const isPending = me?.status === 'pending';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.ink }}>
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
          tabBarIcon: ({ color, size, focused }) => {
            let iconText = '📦';
            if (route.name === 'Goods') iconText = '📦';
            if (route.name === 'Trucks') iconText = '🚚';
            if (route.name === 'Unlocks') iconText = '🔓';
            if (route.name === 'PostBehalf') iconText = '🤝';
            if (route.name === 'Wallet') iconText = '💰';
            if (route.name === 'Alerts') iconText = '🔔';
            if (route.name === 'Profile') iconText = '👤';
            
            return (
              <Text style={{ fontSize: size * 0.8, opacity: focused ? 1 : 0.5 }}>
                {iconText}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen name="Goods" component={BrokerGoodsScreen} options={{ title: 'Goods' }} />
        <Tab.Screen name="Trucks" component={BrokerTrucksScreen} options={{ title: 'Trucks' }} />
        <Tab.Screen name="Unlocks" component={BrokerUnlocksScreen} options={{ title: 'My Unlocks' }} />
        <Tab.Screen name="PostBehalf" component={BrokerPostOnBehalfScreen} options={{ title: 'Post f/Behalf' }} />
        <Tab.Screen name="Wallet" component={BrokerWalletScreen} options={{ title: 'Wallet+Sub' }} />
        <Tab.Screen name="Alerts" component={NotificationsScreen} options={{ title: 'Alerts' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Tab.Navigator>

    </View>
  );
};

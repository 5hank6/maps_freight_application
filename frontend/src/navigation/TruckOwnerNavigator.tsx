import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { TruckOwnerHomeScreen } from '../screens/TruckOwner/TruckOwnerHomeScreen';
import { PostTripScreen } from '../screens/TruckOwner/PostTripScreen';
import { PostLoadScreen as TransporterPostGoodsScreen } from '../screens/Shipper/PostLoadScreen';
import { TransporterGoodsFeedScreen } from '../screens/TruckOwner/TransporterGoodsFeedScreen';
import { BrokerWalletScreen as TransporterWalletScreen } from '../screens/Broker/BrokerWalletScreen';
import { NotificationsScreen } from '../screens/Common/NotificationsScreen';
import { ProfileScreen } from '../screens/Common/ProfileScreen';
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const TruckOwnerNavigator = () => {
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
          let iconName: any = 'bus-outline';
          if (route.name === 'PostGoods') iconName = 'add-circle-outline';
          if (route.name === 'Home') iconName = 'list-outline';
          if (route.name === 'GoodsFeed') iconName = 'cube-outline';
          if (route.name === 'Wallet') iconName = 'wallet-outline';
          if (route.name === 'Alerts') iconName = 'notifications-outline';
          if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="PostTrip" component={PostTripScreen} options={{ title: 'Post Truck' }} />
      <Tab.Screen name="PostGoods" component={TransporterPostGoodsScreen} options={{ title: 'Post Goods' }} />
      <Tab.Screen name="Home" component={TruckOwnerHomeScreen} options={{ title: 'My Posts' }} />
      <Tab.Screen name="GoodsFeed" component={TransporterGoodsFeedScreen} options={{ title: 'Goods Feed' }} />
      <Tab.Screen name="Wallet" component={TransporterWalletScreen} options={{ title: 'Wallet' }} />
      <Tab.Screen name="Alerts" component={NotificationsScreen} options={{ title: 'Alerts' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const RoleCard = ({ title, subtitle, icon, onPress }: { title: string, subtitle: string, icon: React.ReactNode, onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={SemanticColors.textSecondary} style={styles.chevron} />
    </View>
  </TouchableOpacity>
);

export const RoleSelectionScreen = ({ navigation }: any) => {
  const handleSelectRole = (role: 'shipper' | 'transporter' | 'broker') => {
    navigation.navigate('Registration', { role });
  };

  const handleDemoLogin = (userId: string) => {
    const user = PrototypeStore.getState().users.find((u) => u.id === userId);
    if (!user) return;
    PrototypeStore.setCurrentUser(user);

    if (user.role === 'admin') {
      navigation.reset({ index: 0, routes: [{ name: 'AdminPortal' }] });
    } else if (user.role === 'broker') {
      navigation.reset({ index: 0, routes: [{ name: 'BrokerPortal' }] });
    } else if (user.role === 'transporter') {
      navigation.reset({ index: 0, routes: [{ name: 'TruckOwnerPortal' }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'ShipperPortal' }] });
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome to MAPS FREIGHT</Text>
          <Text style={styles.subHeader}>India's broker-first freight platform. Fill empty return trucks. Earn from every connection.</Text>
        </View>

        <View style={styles.cardsContainer}>
          <RoleCard
            title="I Have Goods to Ship"
            subtitle="Post cargo free. Brokers connect you with cheap return trucks."
            icon={<MaterialCommunityIcons name="package-variant-closed" size={26} color={Colors.gold} />}
            onPress={() => handleSelectRole('shipper')}
          />
          <RoleCard
            title="I Have Trucks"
            subtitle="Post empty trucks free. Get return loads. Also post goods."
            icon={<MaterialCommunityIcons name="truck-fast-outline" size={26} color={Colors.gold} />}
            onPress={() => handleSelectRole('transporter')}
          />
          <RoleCard
            title="I Am a Broker"
            subtitle="Free preview. ₹2,000/month full access. ₹150 per unlock."
            icon={<MaterialCommunityIcons name="handshake-outline" size={26} color={Colors.gold} />}
            onPress={() => handleSelectRole('broker')}
          />
        </View>

        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginBtnText}>Already have an account? Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.adminBtn} onPress={() => handleDemoLogin('admin')}>
          <MaterialCommunityIcons name="shield-account" size={18} color={Colors.yellow} style={{marginRight: 6}} />
          <Text style={styles.adminBtnText}>Admin Portal (Aman)</Text>
        </TouchableOpacity>

        {/* Demo Quick Logins matching Prototype */}
        <View style={styles.demoCard}>
          <Text style={styles.demoTitle}>💡 DEMO QUICK LOGINS:</Text>
          <TouchableOpacity onPress={() => handleDemoLogin('u1')}>
            <Text style={styles.demoLink}>• Shipper Rajesh Patel (9812345001)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDemoLogin('u2')}>
            <Text style={styles.demoLink}>• Transporter Mahesh Singh (9812345002)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDemoLogin('u3')}>
            <Text style={styles.demoLink}>• Broker Vikram Joshi (9812345003 - Subscribed)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDemoLogin('u4')}>
            <Text style={styles.demoLink}>• Broker Suresh Kumar (9812345004 - Pending)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 26,
    color: SemanticColors.textPrimary,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subHeader: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    lineHeight: 20,
  },
  cardsContainer: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: SemanticColors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(201, 162, 39, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    color: SemanticColors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    lineHeight: 18,
    opacity: 0.9,
  },
  chevron: {
    marginLeft: 10,
  },
  loginBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201, 162, 39, 0.1)',
  },
  loginBtnText: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 15,
  },
  adminBtn: {
    backgroundColor: Colors.asphalt,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  adminBtnText: {
    color: Colors.yellow,
    fontWeight: '700',
    fontSize: 14,
  },
  demoCard: {
    backgroundColor: Colors.blueBg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
    gap: 8,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.blue,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  demoLink: {
    fontSize: 13,
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';
import { Ionicons } from '@expo/vector-icons';


export const ProfileScreen = ({ navigation }: any) => {
  const user = PrototypeStore.getState().currentUser;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelection' }],
    });
  };

  if (!user) return null;

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.name}>{user.company || user.name}</Text>
            <Text style={styles.phone}>+91 {user.phone}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>Role: {user.role.toUpperCase()}</Text>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color={SemanticColors.textSecondary} />
              <Text style={styles.city}>{user.city}</Text>
            </View>
          </View>

          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name="language" size={20} color={SemanticColors.textPrimary} />
                <Text style={styles.menuText}>Change Language</Text>
              </View>
              <View style={styles.menuRight}>
                <Text style={styles.menuValue}>English</Text>
                <Ionicons name="chevron-forward" size={16} color={SemanticColors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name="business" size={20} color={SemanticColors.textPrimary} />
                <Text style={styles.menuText}>Edit Business Details</Text>
              </View>
              <View style={styles.menuRight}>
                <Ionicons name="chevron-forward" size={16} color={SemanticColors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons name="logo-whatsapp" size={20} color="#25d366" />
                <Text style={styles.menuText}>WhatsApp Support</Text>
              </View>
              <View style={styles.menuRight}>
                <Text style={styles.menuValue}>+91 81600 24858</Text>
                <Ionicons name="chevron-forward" size={16} color={SemanticColors.textSecondary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuLeft}>
                <Ionicons name="log-out" size={20} color={Colors.red} />
                <Text style={[styles.menuText, { color: Colors.red }]}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ink,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.ink,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
    marginBottom: 6,
  },
  phone: {
    fontSize: 15,
    color: SemanticColors.textSecondary,
    fontWeight: '600',
    marginBottom: 12,
  },
  roleBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  city: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(159, 178, 203, 0.1)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuText: {
    fontSize: 16,
    color: SemanticColors.textPrimary,
    fontWeight: '600',
  },
  menuValue: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    fontWeight: '500',
  },
});

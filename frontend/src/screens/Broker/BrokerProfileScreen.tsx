import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { SemanticColors, Colors } from '../../theme/colors';

export const BrokerProfileScreen = ({ navigation }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [routes, setRoutes] = useState(['Gujarat ↔ Delhi', 'Gujarat ↔ Rajasthan']);

  const handleSubscribe = () => {
    alert('Subscription active! ₹2,000/month renewed via Razorpay.');
  };

  const handleLogout = () => {
    alert('Logged out');
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelection' }],
    });
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Info Header */}
        <View style={styles.profileCard}>
          <View style={styles.badgeRow}>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedBadgeText}>✔ VERIFIED BROKER</Text>
            </View>
          </View>
          <Text style={styles.firmName}>Aman Logistics & Freight</Text>
          <Text style={styles.brokerName}>Broker: Aman Dana</Text>
          <Text style={styles.phone}>+91 81600 24858</Text>
          <Text style={styles.city}>Base: Gandhidham, Gujarat</Text>
        </View>

        {/* Subscription Plan Card */}
        <View style={styles.subCard}>
          <View style={styles.subHeader}>
            <Text style={styles.subTitle}>Current Subscription</Text>
            <Text style={styles.subStatus}>{isSubscribed ? '🟢 Active' : '🟡 Free Preview'}</Text>
          </View>
          <Text style={styles.subDetails}>
            {isSubscribed ? 'Premium Access · ₹2,000/mo (Renews Aug 2026)' : 'Delayed Access (2-hour feed delay)'}
          </Text>
          <Button
            title={isSubscribed ? 'Renew Subscription — ₹2,000/mo' : 'Upgrade to Instant Access — ₹2,000/mo'}
            variant="primary"
            onPress={handleSubscribe}
            style={styles.subBtn}
          />
        </View>

        {/* Broker Stats Card */}
        <Text style={styles.sectionTitle}>Performance Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14</Text>
            <Text style={styles.statLabel}>Total Unlocks</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Deals Closed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>64%</Text>
            <Text style={styles.statLabel}>Conversion Rate</Text>
          </View>
        </View>

        {/* WhatsApp Route Alerts */}
        <Text style={styles.sectionTitle}>WhatsApp Route Alerts</Text>
        <View style={styles.routeCard}>
          <Text style={styles.routeSub}>
            You receive instant WhatsApp alerts within seconds of any new load posted on these corridors:
          </Text>
          <View style={styles.routeList}>
            {routes.map((r, idx) => (
              <View key={idx} style={styles.routeChip}>
                <Text style={styles.routeChipText}>📍 {r}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Change Language</Text>
            <Text style={styles.menuValue}>English ›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>💬 Support & Helpdesk</Text>
            <Text style={styles.menuValue}>+91 81600 24858 ›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={[styles.menuText, { color: Colors.red }]}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: SemanticColors.card,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  badgeRow: {
    marginBottom: 8,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(243, 213, 122, 0.15)',
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedBadgeText: {
    fontSize: 10,
    color: Colors.goldHi,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  firmName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 4,
  },
  brokerName: {
    fontSize: 14,
    color: Colors.ivory,
    marginBottom: 2,
  },
  phone: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    marginBottom: 2,
  },
  city: {
    fontSize: 12,
    color: Colors.goldHi,
  },
  subCard: {
    backgroundColor: SemanticColors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
  },
  subStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.green,
  },
  subDetails: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    marginBottom: 12,
  },
  subBtn: {
    height: 44,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: SemanticColors.card,
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.goldHi,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
  },
  routeCard: {
    backgroundColor: SemanticColors.card,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },
  routeSub: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  routeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  routeChip: {
    backgroundColor: '#081627',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.3)',
  },
  routeChipText: {
    fontSize: 12,
    color: Colors.goldHi,
  },
  menuSection: {
    backgroundColor: SemanticColors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(159, 178, 203, 0.1)',
  },
  menuText: {
    fontSize: 14,
    color: SemanticColors.textPrimary,
  },
  menuValue: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
  },
});

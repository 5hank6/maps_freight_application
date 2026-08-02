import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';

export const AdminDashboardScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'appr' | 'list' | 'users' | 'rev'>('dash');
  const [storeState, setStoreState] = useState(PrototypeStore.getState());

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const totalRev = storeState.revenue.sub + storeState.revenue.unlock;
  const pendingBrokers = storeState.users.filter((u) => u.role === 'broker' && !u.approved);
  const payingBrokers = storeState.users.filter((u) => u.role === 'broker' && u.tier === 'standard').length;
  const liveGoods = storeState.goods.filter((g) => g.status === 'live').length;
  const liveTrucks = storeState.trucks.filter((t) => t.status === 'live').length;

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'LanguageSelection' }] });
  };

  const handleForceExpireGoods = (id: string) => {
    const g = storeState.goods.find((x) => x.id === id);
    if (g) g.status = 'expired';
    setStoreState({ ...PrototypeStore.getState() });
  };

  const handleForceExpireTruck = (id: string) => {
    const t = storeState.trucks.find((x) => x.id === id);
    if (t) t.status = 'expired';
    setStoreState({ ...PrototypeStore.getState() });
  };

  return (
    <ScreenContainer style={styles.container}>
      {/* Top Admin Header */}
      <View style={styles.topHeader}>
        <View style={styles.adminTag}>
          <Text style={styles.adminTagText}>🔐 ADMIN — AMAN ONLY</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.exitBtn}>
          <Text style={styles.exitText}>EXIT ADMIN</Text>
        </TouchableOpacity>
      </View>

      {/* Sub-Tabs */}
      <View style={styles.tabRow}>
        {[
          { id: 'dash', label: '📊 Dash' },
          { id: 'appr', label: `✅ Appr (${pendingBrokers.length})` },
          { id: 'list', label: '📋 Listings' },
          { id: 'users', label: '👥 Users' },
          { id: 'rev', label: '💵 Rev' },
        ].map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.tab, activeTab === t.id && styles.tabActive]}
            onPress={() => setActiveTab(t.id as any)}
          >
            <Text style={[styles.tabText, activeTab === t.id && styles.tabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* DASHBOARD TAB */}
        {activeTab === 'dash' && (
          <View>
            <Text style={styles.sectionTitle}>Platform Overview</Text>
            <View style={styles.statGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>₹{totalRev}</Text>
                <Text style={styles.statLabel}>TOTAL REVENUE</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{payingBrokers}</Text>
                <Text style={styles.statLabel}>PAYING BROKERS</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{liveGoods}</Text>
                <Text style={styles.statLabel}>LIVE GOODS</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{liveTrucks}</Text>
                <Text style={styles.statLabel}>LIVE TRUCKS</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNum}>{storeState.unlocks.length}</Text>
                <Text style={styles.statLabel}>TOTAL UNLOCKS</Text>
              </View>
              <View style={[styles.statBox, pendingBrokers.length > 0 && styles.alertBox]}>
                <Text style={[styles.statNum, pendingBrokers.length > 0 && styles.redText]}>{pendingBrokers.length}</Text>
                <Text style={styles.statLabel}>PENDING APPROVALS</Text>
              </View>
            </View>
          </View>
        )}

        {/* APPROVALS TAB */}
        {activeTab === 'appr' && (
          <View>
            <Text style={styles.sectionTitle}>Broker Verification Requests</Text>
            {pendingBrokers.length === 0 ? (
              <View style={styles.okCard}>
                <Text style={styles.okText}>✓ No pending approvals. All brokers verified.</Text>
              </View>
            ) : (
              pendingBrokers.map((b) => (
                <View key={b.id} style={styles.card}>
                  <Text style={styles.cardTitle}>{b.name} — {b.firm}</Text>
                  <Text style={styles.cardSub}>📱 {b.phone} · 📍 {b.city} · PAN {b.pan} · Aadhaar {b.aadhaar}</Text>
                  <Text style={styles.cardSub}>Routes: {b.routes?.join(', ')}</Text>
                  <Text style={styles.uploadText}>📎 aadhaar_front.jpg (Uploaded ✓)</Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.approveBtn}
                      onPress={() => PrototypeStore.approveBroker(b.id, true)}
                    >
                      <Text style={styles.btnText}>✓ Approve Broker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => PrototypeStore.approveBroker(b.id, false)}
                    >
                      <Text style={styles.btnText}>✕ Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {/* ALL LISTINGS TAB (Full Admin Unmasked View) */}
        {activeTab === 'list' && (
          <View>
            <Text style={styles.sectionTitle}>All Platform Listings (Unmasked Admin View)</Text>
            <Text style={styles.subText}>Goods Listings ({storeState.goods.length}):</Text>
            {storeState.goods.map((g) => {
              const owner = storeState.users.find((u) => u.id === g.by);
              return (
                <View key={g.id} style={styles.card}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>{g.from} ➔ {g.to}</Text>
                    <View style={styles.badge}><Text style={styles.badgeText}>{g.status.toUpperCase()}</Text></View>
                  </View>
                  <Text style={styles.cardSub}>{g.type} · {g.wt}T · Posted by: {owner?.name || 'Shipper'} ({owner?.phone})</Text>
                  <Text style={styles.cardSub}>Pickup: {g.addr || 'N/A'} · Rate: {g.rate || 'Open'}</Text>
                  <Text style={styles.cardSub}>👁 {g.views} views · 🔓 {g.unlockCount} unlocks</Text>
                  {g.status === 'live' && (
                    <TouchableOpacity style={styles.expireBtn} onPress={() => handleForceExpireGoods(g.id)}>
                      <Text style={styles.btnText}>Force Expire</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}

            <Text style={[styles.subText, { marginTop: 14 }]}>Truck Listings ({storeState.trucks.length}):</Text>
            {storeState.trucks.map((t) => (
              <View key={t.id} style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>{t.city} ➔ {t.to}</Text>
                  <View style={styles.badge}><Text style={styles.badgeText}>{t.status.toUpperCase()}</Text></View>
                </View>
                <Text style={styles.cardSub}>{t.type} · {t.cap}T · Truck #: {t.truckNo}</Text>
                <Text style={styles.cardSub}>Owner: {t.ownerName} ({t.ownerPhone}) · Driver: {t.driverName} ({t.driverPhone})</Text>
                <Text style={styles.cardSub}>👁 {t.views} views · 🔓 {t.unlockCount} unlocks</Text>
                {t.status === 'live' && (
                  <TouchableOpacity style={styles.expireBtn} onPress={() => handleForceExpireTruck(t.id)}>
                    <Text style={styles.btnText}>Force Expire</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <View>
            <Text style={styles.sectionTitle}>Registered Users ({storeState.users.length})</Text>
            {storeState.users.map((u) => (
              <View key={u.id} style={styles.card}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>{u.name}</Text>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{u.role.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.cardSub}>📱 {u.phone} · 📍 {u.city} · PAN {u.pan} · Wallet ₹{u.wallet}</Text>
                {u.role === 'broker' && (
                  <Text style={styles.cardSub}>Tier: {u.tier} · Unlocks: {u.unlocks || 0} · ⚠ Violations: {u.violations || 0}</Text>
                )}
                <TouchableOpacity
                  style={[styles.suspendBtn, u.status === 'suspended' && styles.reactivateBtn]}
                  onPress={() => PrototypeStore.toggleSuspendUser(u.id)}
                >
                  <Text style={styles.btnText}>{u.status === 'suspended' ? 'Reactivate Account' : 'Suspend User'}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* REVENUE TAB */}
        {activeTab === 'rev' && (
          <View>
            <Text style={styles.sectionTitle}>Platform Revenue Breakdown</Text>
            <View style={styles.cardAsphalt}>
              <Text style={styles.asphaltSub}>TOTAL REVENUE GENERATED</Text>
              <Text style={styles.asphaltAmount}>₹ {totalRev}</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.rowBetween}><Text style={styles.revLabel}>Subscription Revenue</Text><Text style={styles.revVal}>₹ {storeState.revenue.sub}</Text></View>
              <View style={styles.rowBetween}><Text style={styles.revLabel}>Unlock Fee Revenue</Text><Text style={styles.revVal}>₹ {storeState.revenue.unlock}</Text></View>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  adminTag: {
    backgroundColor: Colors.red,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  adminTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  exitBtn: {
    backgroundColor: Colors.asphalt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exitText: {
    color: Colors.yellow,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: SemanticColors.card,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 4,
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },

  tabActive: {
    backgroundColor: Colors.asphalt,
    borderColor: Colors.gold,
  },
  tabText: {
    fontSize: 11,
    color: SemanticColors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.goldHi,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 12,
  },
  subText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.goldHi,
    marginBottom: 8,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statBox: {
    width: '48%',
    backgroundColor: SemanticColors.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  alertBox: {
    borderColor: Colors.red,
    backgroundColor: Colors.redBg,
  },
  statNum: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 4,
  },
  redText: {
    color: Colors.red,
  },
  statLabel: {
    fontSize: 10,
    color: SemanticColors.textSecondary,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: SemanticColors.card,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 11,
    color: Colors.blue,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: Colors.green,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: Colors.red,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  expireBtn: {
    backgroundColor: Colors.red,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 6,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  okCard: {
    backgroundColor: Colors.greenBg,
    padding: 16,
    borderRadius: 12,
  },
  okText: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: 13,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  roleBadge: {
    backgroundColor: Colors.asphalt,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleText: {
    color: Colors.goldHi,
    fontSize: 10,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: Colors.greenBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: Colors.green,
    fontSize: 10,
    fontWeight: 'bold',
  },
  suspendBtn: {
    backgroundColor: Colors.red,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  reactivateBtn: {
    backgroundColor: Colors.green,
  },
  cardAsphalt: {
    backgroundColor: Colors.asphalt,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  asphaltSub: {
    color: Colors.slate,
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  asphaltAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.goldHi,
  },
  revLabel: {
    fontSize: 14,
    color: SemanticColors.textPrimary,
  },
  revVal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.green,
  },
});

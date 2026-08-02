import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { ChatModal } from '../../components/ChatModal';
import { SemanticColors, Colors } from '../../theme/colors';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { PrototypeStore, TruckListing } from '../../services/store';

export const FindTrucksFeedScreen = () => {
  const [storeState, setStoreState] = useState(PrototypeStore.getState());
  const [selectedTruck, setSelectedTruck] = useState<TruckListing | null>(null);
  const [activeChatUnlockId, setActiveChatUnlockId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const me = storeState.currentUser;
  const trucks = storeState.trucks.filter((t) => t.status === 'live');

  const handleUnlockConfirm = async () => {
    if (!selectedTruck) return;
    const success = await PrototypeStore.unlockListing('truck', selectedTruck.id);
    if (success) {
      setSelectedTruck(null);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.header}>Find Empty Trucks Feed</Text>
      
      {/* 2-Hour Delay Notice for Shippers matching prototype line 453 */}
      <View style={styles.delayWarnBox}>
        <Text style={styles.delayWarnText}>
          ⏱ <Text style={styles.bold}>Notice:</Text> As a Shipper you see truck listings with a 2-hour delay. Brokers see them instantly.
        </Text>
      </View>

      {trucks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🚚</Text>
          <Text style={styles.emptyText}>No empty trucks posted yet.</Text>
        </View>
      ) : (
        <FlatList
          data={trucks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const unlock = storeState.unlocks.find((u) => u.by === me.id && u.kind === 'truck' && u.lid === item.id);
            const isUnlocked = !!unlock;

            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.routeText}>{item.city} ➔ {item.to}</Text>
                  <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>● LIVE</Text></View>
                </View>

                <Text style={styles.detailsText}>{item.type} · {item.cap}T capacity · Available {item.date}</Text>

                {isUnlocked ? (
                  <View style={styles.revealedBox}>
                    <Text style={styles.revText}>🚚 Truck No: <Text style={styles.bold}>{item.truckNo}</Text></Text>
                    <Text style={styles.revText}>👤 Owner: {item.ownerName} ({item.ownerPhone})</Text>
                    <Text style={styles.revText}>👤 Driver: {item.driverName} ({item.driverPhone})</Text>
                    <Text style={styles.revText}>📍 Parked at: {item.parking}</Text>

                    <TouchableOpacity style={styles.chatBtn} onPress={() => setActiveChatUnlockId(unlock.id)}>
                      <Text style={styles.chatBtnText}>💬 Open In-App Chat</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.pardaBox}>
                    <Text style={styles.pardaText}>🔒 Truck no · Owner phone · Driver phone · Parking spot hidden behind parda</Text>
                    <TouchableOpacity onPress={() => setSelectedTruck(item)} style={{ width: '100%' }} activeOpacity={0.8}>
                      <LinearGradient
                        colors={[Colors.goldHi, Colors.gold, Colors.goldLo]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.unlockBtn}
                      >
                        <Text style={styles.unlockBtnText}>🔓 UNLOCK DETAILS — ₹150</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Unlock Modal */}
      <Modal visible={!!selectedTruck} transparent animationType="fade">
        <BlurView intensity={20} tint="dark" style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Unlock Truck Details?</Text>
            <Text style={styles.modalSub}>
              ₹150 will be deducted from your wallet to reveal owner name, driver phone & parking location.
            </Text>

            <View style={styles.balanceBox}>
              <Text style={styles.balanceText}>Current Balance: ₹{me.wallet}</Text>
              <Text style={styles.balanceText}>After Unlock: ₹{me.wallet - 150}</Text>
            </View>

            <Button title="Confirm & Unlock — ₹150" variant="primary" onPress={handleUnlockConfirm} />
            <Button title="Cancel" variant="secondary" onPress={() => setSelectedTruck(null)} style={{ marginTop: 8 }} />
          </View>
        </BlurView>
      </Modal>

      <ChatModal
        visible={!!activeChatUnlockId}
        unlockId={activeChatUnlockId}
        onClose={() => setActiveChatUnlockId(null)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 8,
  },
  delayWarnBox: {
    backgroundColor: Colors.amberBg,
    borderWidth: 1,
    borderColor: Colors.amber,
    borderRadius: 8,
    padding: 10,
    marginBottom: 14,
  },
  delayWarnText: {
    fontSize: 12,
    color: Colors.amber,
    lineHeight: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: SemanticColors.textSecondary,
    fontSize: 14,
  },
  card: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
  },
  liveBadge: {
    backgroundColor: Colors.greenBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveBadgeText: {
    fontSize: 10,
    color: Colors.green,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    marginBottom: 8,
  },
  pardaBox: {
    backgroundColor: '#081627',
    borderWidth: 1,
    borderColor: SemanticColors.border,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  pardaText: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  unlockBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  unlockBtnText: {
    color: Colors.ink,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  revealedBox: {
    backgroundColor: '#081627',
    padding: 12,
    borderRadius: 6,
    gap: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  revText: {
    color: SemanticColors.textPrimary,
    fontSize: 12,
  },
  chatBtn: {
    backgroundColor: Colors.green,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  chatBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 21, 39, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: SemanticColors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderBottomWidth: 0,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  balanceBox: {
    backgroundColor: Colors.asphalt,
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },
  balanceText: {
    fontSize: 12,
    color: SemanticColors.textPrimary,
  },
});

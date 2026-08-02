import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';

import { ChatModal } from '../../components/ChatModal';
import { Colors, SemanticColors } from '../../theme/colors';
import { BlurView } from 'expo-blur';
import { PrototypeStore, TruckListing } from '../../services/store';
import { Ionicons } from '@expo/vector-icons';

export const BrokerTrucksScreen = () => {
  const [storeState, setStoreState] = useState(PrototypeStore.getState());
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [activeChatUnlockId, setActiveChatUnlockId] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const me = storeState.currentUser;
  const filteredTrucks = storeState.trucks?.filter((t) => t.status === 'live') || [];
  const isPending = me?.status === 'pending';

  const handleUnlockConfirm = async () => {
    if (!selectedListing) return;
    setUnlocking(true);
    const success = await PrototypeStore.unlockListing('truck', selectedListing.id);
    setUnlocking(false);
    if (success) {
      setSelectedListing(null);
    }
  };

  const renderTruckCard = ({ item }: { item: TruckListing }) => {
    const unlock = storeState.unlocks?.find((u) => u.by === me?.id && u.kind === 'truck' && u.lid === item.id);
    const isUnlocked = !!unlock;
    const isBrokerLocked = me?.role === 'broker' && me?.tier === 'free_preview';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.routeText}>{item.city} <Ionicons name="arrow-forward" size={16} color={Colors.blue} /> {item.to}</Text>
          <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>LIVE</Text></View>
        </View>

        <Text style={styles.detailsText}>{item.type} • {item.cap}T capacity • Available {item.date}</Text>

        {isUnlocked ? (
          <View style={styles.revealedBox}>
            <View style={styles.revRow}>
              <Ionicons name="car" size={18} color={Colors.blue} />
              <Text style={styles.revText}>Truck No: <Text style={styles.bold}>{item.truckNo}</Text></Text>
            </View>
            <View style={styles.revRow}>
              <Ionicons name="person-circle" size={18} color={Colors.blue} />
              <Text style={styles.revText}>Owner: {item.ownerName} (<Text style={styles.blue}>{item.ownerPhone}</Text>)</Text>
            </View>
            <View style={styles.revRow}>
              <Ionicons name="person" size={18} color={Colors.blue} />
              <Text style={styles.revText}>Driver: {item.driverName} (<Text style={styles.blue}>{item.driverPhone}</Text>)</Text>
            </View>
            <View style={styles.revRow}>
              <Ionicons name="location" size={18} color={Colors.blue} />
              <Text style={styles.revText}>Parked at: {item.parking}</Text>
            </View>

            <TouchableOpacity style={styles.chatBtn} onPress={() => setActiveChatUnlockId(unlock.id)}>
              <Ionicons name="chatbubbles" size={18} color="#fff" />
              <Text style={styles.chatBtnText}>Open In-App Chat</Text>
            </TouchableOpacity>
          </View>
        ) : isBrokerLocked ? (
          <View style={styles.pardaBox}>
            <Ionicons name="lock-closed" size={24} color={Colors.blue} style={styles.lockIcon} />
            <Text style={styles.pardaText}>Truck number, owner & driver contacts hidden.</Text>
            <Text style={styles.pardaSub}>Subscribe (₹2,000/mo) to unlock.</Text>
          </View>
        ) : (
          <View style={styles.pardaBox}>
            <Ionicons name="lock-closed" size={24} color={Colors.blue} style={styles.lockIcon} />
            <Text style={styles.pardaText}>Truck no • Owner phone • Driver phone • Parking spot hidden</Text>
            <TouchableOpacity onPress={() => setSelectedListing(item)} style={styles.unlockBtn}>
              <Text style={styles.unlockBtnText}>🔓 UNLOCK DETAILS — ₹150</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <>

      <View style={{ paddingHorizontal: 16 }}>
        {isPending && (
          <View style={styles.verificationBanner}>
            <Ionicons name="time" size={20} color={Colors.purple} />
            <Text style={styles.verificationText}>
              Account under verification. Browsing in Free Preview.
            </Text>
          </View>
        )}
        <View style={styles.tabHeader}>
          <Text style={styles.tabTitle}>Empty Trucks Feed</Text>
          <Text style={styles.countText}>{filteredTrucks.length} Live Trucks</Text>
        </View>
      </View>
    </>
  );

  return (
    <ScreenContainer style={styles.container} >
      <FlatList
        data={filteredTrucks}
        keyExtractor={(item) => item.id}
        renderItem={renderTruckCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />

      {/* Unlock Confirmation Modal */}
      <Modal visible={!!selectedListing} transparent animationType="fade">
        <BlurView intensity={30} tint="dark" style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Unlock Full Details?</Text>
            <Text style={styles.modalSub}>
              ₹150 will be deducted from your wallet to reveal full contact details & pickup location.
            </Text>

            <View style={styles.balanceBox}>
              <Text style={styles.balanceText}>Current Balance: <Text style={styles.bold}>₹{me?.wallet || 0}</Text></Text>
              <Text style={styles.balanceText}>After Unlock: <Text style={styles.blue}>₹{(me?.wallet || 0) - 150}</Text></Text>
            </View>

            <Button 
              title={unlocking ? "Processing..." : "Confirm & Unlock — ₹150"} 
              onPress={handleUnlockConfirm} 
              disabled={unlocking}
            />
            <TouchableOpacity onPress={() => setSelectedListing(null)} style={styles.cancelBtn} disabled={unlocking}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      {/* Chat Modal */}
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
    backgroundColor: Colors.ink,
  },
  verificationBanner: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  verificationText: {
    color: Colors.purple,
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
  },
  countText: {
    fontSize: 13,
    color: Colors.blue,
    fontWeight: '700',
    backgroundColor: Colors.asphalt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden'
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  routeText: {
    fontSize: 20,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
    letterSpacing: -0.5,
  },
  liveBadge: {
    backgroundColor: Colors.blueBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveBadgeText: {
    fontSize: 10,
    color: Colors.blue,
    fontWeight: '800',
    letterSpacing: 1,
  },
  detailsText: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
  },
  pardaBox: {
    backgroundColor: 'rgba(159, 178, 203, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(159, 178, 203, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  lockIcon: {
    marginBottom: 8,
  },
  pardaText: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  pardaSub: {
    fontSize: 13,
    color: Colors.blue,
    fontWeight: '700',
  },
  unlockBtn: {
    backgroundColor: Colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  unlockBtnText: {
    color: Colors.ink,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  revealedBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 4,
  },
  revRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revText: {
    color: SemanticColors.textPrimary,
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '500',
  },
  bold: {
    fontWeight: '700',
  },
  blue: {
    color: Colors.blue, 
    fontWeight: '700',
  },
  chatBtn: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  chatBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.ink,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 48,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  modalSub: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  balanceBox: {
    backgroundColor: Colors.asphalt,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  balanceText: {
    fontSize: 15,
    color: SemanticColors.textPrimary,
    fontWeight: '500',
    marginBottom: 8,
  },
  cancelBtn: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: SemanticColors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';

import { ChatModal } from '../../components/ChatModal';
import { Colors, SemanticColors } from '../../theme/colors';
import { PrototypeStore, GoodsListing, TruckListing } from '../../services/store';
import { Ionicons } from '@expo/vector-icons';

export const BrokerUnlocksScreen = () => {
  const [storeState, setStoreState] = useState(PrototypeStore.getState());
  const [activeChatUnlockId, setActiveChatUnlockId] = useState<string | null>(null);
  const [dealStatuses, setDealStatuses] = useState<Record<string, 'Called' | 'Deal Done' | 'No Deal'>>({});

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const me = storeState.currentUser;
  const myUnlocks = storeState.unlocks
    ?.filter((u) => u.by === me?.id)
    .sort((a, b) => (b.at || 0) - (a.at || 0)) || [];

  const getListingDetails = (kind: 'goods' | 'truck', lid: string) => {
    if (kind === 'goods') {
      return storeState.goods?.find((g) => g.id === lid) as GoodsListing | undefined;
    }
    return storeState.trucks?.find((t) => t.id === lid) as TruckListing | undefined;
  };

  const setStatus = (id: string, status: 'Called' | 'Deal Done' | 'No Deal') => {
    setDealStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const renderItem = ({ item }: { item: any }) => {
    const listing = getListingDetails(item.kind, item.lid);
    if (!listing) return null;

    const isGoods = item.kind === 'goods';
    const goodsItem = listing as GoodsListing;
    const truckItem = listing as TruckListing;
    const currentStatus = dealStatuses[item.id] || 'Called';
    
    const themeColor = isGoods ? Colors.green : Colors.blue;
    const themeBg = isGoods ? 'rgba(34, 197, 94, 0.05)' : 'rgba(59, 130, 246, 0.05)';
    const themeBorder = isGoods ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.routeText}>
            {isGoods ? `${goodsItem.from} ` : `${truckItem.city} `}
            <Ionicons name="arrow-forward" size={16} color={themeColor} />
            {isGoods ? ` ${goodsItem.to}` : ` ${truckItem.to}`}
          </Text>
          <View style={[styles.typeBadge, { backgroundColor: isGoods ? Colors.greenBg : Colors.blueBg }]}>
            <Text style={[styles.typeBadgeText, { color: themeColor }]}>{isGoods ? 'GOODS' : 'TRUCK'}</Text>
          </View>
        </View>

        <View style={[styles.revealedBox, { backgroundColor: themeBg, borderColor: themeBorder }]}>
          {isGoods ? (
            <>
              <View style={styles.revRow}>
                <Ionicons name="person-circle" size={18} color={themeColor} />
                <Text style={styles.revText}>Contact: <Text style={styles.bold}>{goodsItem.contactName}</Text></Text>
              </View>
              <View style={styles.revRow}>
                <Ionicons name="call" size={18} color={themeColor} />
                <Text style={styles.revText}>Phone: <Text style={{ color: themeColor, fontWeight: '700' }}>{goodsItem.contactPhone}</Text></Text>
              </View>
              <View style={styles.revRow}>
                <Ionicons name="location" size={18} color={themeColor} />
                <Text style={styles.revText}>Pickup: {goodsItem.addr || '—'}</Text>
              </View>
              <View style={styles.revRow}>
                <Ionicons name="cash" size={18} color={themeColor} />
                <Text style={styles.revText}>Expected Rate: {goodsItem.rate || '—'}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.revRow}>
                <Ionicons name="car" size={18} color={themeColor} />
                <Text style={styles.revText}>Truck No: <Text style={styles.bold}>{truckItem.truckNo}</Text></Text>
              </View>
              <View style={styles.revRow}>
                <Ionicons name="person-circle" size={18} color={themeColor} />
                <Text style={styles.revText}>Owner: {truckItem.ownerName} (<Text style={{ color: themeColor, fontWeight: '700' }}>{truckItem.ownerPhone}</Text>)</Text>
              </View>
              <View style={styles.revRow}>
                <Ionicons name="person" size={18} color={themeColor} />
                <Text style={styles.revText}>Driver: {truckItem.driverName} (<Text style={{ color: themeColor, fontWeight: '700' }}>{truckItem.driverPhone}</Text>)</Text>
              </View>
              <View style={styles.revRow}>
                <Ionicons name="location" size={18} color={themeColor} />
                <Text style={styles.revText}>Parked at: {truckItem.parking}</Text>
              </View>
            </>
          )}

          <TouchableOpacity style={[styles.chatBtn, { backgroundColor: themeColor }]} onPress={() => setActiveChatUnlockId(item.id)}>
             <Ionicons name="chatbubbles" size={18} color="#fff" />
            <Text style={styles.chatBtnText}>Open Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Deal Status Buttons */}
        <Text style={styles.statusLabel}>Update Deal Status:</Text>
        <View style={styles.statusRow}>
          <TouchableOpacity
            style={[styles.statusBtn, currentStatus === 'Called' && styles.statusActive]}
            onPress={() => setStatus(item.id, 'Called')}
          >
            <Text style={[styles.btnText, currentStatus === 'Called' && { color: Colors.gold }]}>Called</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusBtn, currentStatus === 'Deal Done' && styles.statusActive]}
            onPress={() => setStatus(item.id, 'Deal Done')}
          >
            <Text style={[styles.btnText, currentStatus === 'Deal Done' && { color: Colors.gold }]}>Deal Done ✓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusBtn, currentStatus === 'No Deal' && styles.statusActive]}
            onPress={() => setStatus(item.id, 'No Deal')}
          >
            <Text style={[styles.btnText, currentStatus === 'No Deal' && { color: Colors.gold }]}>No Deal ✗</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      <View style={styles.tabHeader}>
        <Text style={styles.title}>My Unlocks</Text>
        <Text style={styles.countText}>{myUnlocks.length} Total</Text>
      </View>
    </>
  );

  return (
    <ScreenContainer style={styles.container} >
      {myUnlocks.length === 0 ? (
        <View>

           <View style={styles.tabHeader}>
             <Text style={styles.title}>My Unlocks</Text>
           </View>
           <View style={styles.emptyBox}>
             <Ionicons name="folder-open" size={48} color={SemanticColors.border} />
             <Text style={styles.emptyText}>No unlocks yet. Browse feeds and unlock matching listings.</Text>
           </View>
        </View>
      ) : (
        <FlatList
          data={myUnlocks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
        />
      )}

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
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
  },
  countText: {
    fontSize: 13,
    color: Colors.gold,
    fontWeight: '700',
    backgroundColor: Colors.asphalt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden'
  },
  emptyBox: {
    backgroundColor: 'rgba(159, 178, 203, 0.05)',
    padding: 32,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(159, 178, 203, 0.1)',
    alignItems: 'center',
    marginTop: 20,
    gap: 16,
  },
  emptyText: {
    color: SemanticColors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
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
    marginBottom: 16,
  },
  routeText: {
    fontSize: 20,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
    letterSpacing: -0.5,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  revealedBox: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    marginBottom: 16,
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
  chatBtn: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
  statusLabel: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.asphalt,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statusActive: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  btnText: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    fontWeight: '700',
  },
});

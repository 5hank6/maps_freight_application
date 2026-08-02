import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore, GoodsListing } from '../../services/store';

export const ShipperHomeScreen = ({ navigation }: any) => {
  const [storeState, setStoreState] = useState(PrototypeStore.getState());

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const me = storeState.currentUser;
  const listings = storeState.goods.filter((g) => g.by === me.id);

  const getStatusBadgeStyle = (status: GoodsListing['status']) => {
    switch (status) {
      case 'live':
        return { bg: 'rgba(74, 222, 120, 0.15)', text: Colors.green, border: 'rgba(74, 222, 120, 0.3)' };
      default:
        return { bg: 'rgba(159, 178, 203, 0.15)', text: Colors.slate, border: 'rgba(159, 178, 203, 0.3)' };
    }
  };

  const renderLoadCard = ({ item }: { item: GoodsListing }) => {
    const badge = getStatusBadgeStyle(item.status);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.routeText}>
            {item.from} <Text style={styles.arrow}>➔</Text> {item.to}
          </Text>
          <View style={[styles.badge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>● {item.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.detailText}>{item.type} · {item.wt} Tonnes</Text>
          <Text style={styles.timeText}>Date: {item.date}</Text>
        </View>

        {item.unlockCount > 0 ? (
          <View style={styles.interestRow}>
            <Text style={styles.interestText}>🤝 {item.unlockCount} broker{item.unlockCount > 1 ? 's' : ''} unlocked contacts</Text>
          </View>
        ) : (
          <View style={styles.interestRow}>
            <Text style={styles.noInterestText}>⚡ Live on Broker Feed (0 unlocks so far)</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer style={styles.container}>
      {/* Primary CTA */}
      <View style={styles.headerSection}>
        <Button
          title="📦 Post a Load"
          variant="primary"
          onPress={() => navigation.navigate('PostLoad')}
          style={styles.postBtn}
          textStyle={styles.postBtnText}
        />
      </View>

      <Text style={styles.sectionTitle}>Your Active Listings ({listings.length})</Text>

      {listings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No posted loads yet</Text>
          <Text style={styles.emptySub}>Post your first load and verified brokers will call you with trucks.</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderLoadCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  headerSection: {
    marginBottom: 20,
  },
  postBtn: {
    height: 54,
    borderRadius: 8,
  },
  postBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    color: SemanticColors.textPrimary,
    fontWeight: '600',
    marginBottom: 14,
  },
  listContent: {
    paddingBottom: 24,
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
    marginBottom: 10,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
  },
  arrow: {
    color: Colors.gold,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
  },
  timeText: {
    fontSize: 12,
    color: Colors.goldHi,
  },
  interestRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(159, 178, 203, 0.1)',
  },
  interestText: {
    fontSize: 12,
    color: Colors.goldHi,
    fontWeight: '500',
  },
  noInterestText: {
    fontSize: 12,
    color: Colors.green,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: SemanticColors.textPrimary,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

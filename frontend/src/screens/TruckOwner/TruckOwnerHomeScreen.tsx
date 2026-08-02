import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore, TruckListing, GoodsListing } from '../../services/store';

export const TruckOwnerHomeScreen = ({ navigation }: any) => {
  const [storeState, setStoreState] = useState(PrototypeStore.getState());

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const me = storeState.currentUser;
  
  // Transporters can post both trucks and goods in this prototype
  const myTrucks = storeState.trucks.filter((t) => t.by === me.id);
  const myGoods = storeState.goods.filter((g) => g.by === me.id);
  
  const allListings = [...myTrucks, ...myGoods].sort((a, b) => b.id.localeCompare(a.id));

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.headerSection}>
        <Button
          title="🚚 Post Empty Trip"
          variant="primary"
          onPress={() => navigation.navigate('PostTrip')}
          style={styles.postBtn}
          textStyle={styles.postBtnText}
        />
      </View>

      <Text style={styles.sectionTitle}>Your Active Posts ({allListings.length})</Text>

      {allListings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🚚</Text>
          <Text style={styles.emptyTitle}>No posted trips yet</Text>
          <Text style={styles.emptySub}>Post your empty return trips free to get loads quickly.</Text>
        </View>
      ) : (
        <FlatList
          data={allListings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isTruck = (item as any).cap !== undefined; // differentiate by capacity property

            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.routeText}>
                    {isTruck ? (item as TruckListing).city : (item as GoodsListing).from} <Text style={styles.arrow}>➔</Text> {item.to}
                  </Text>
                  <View style={styles.liveBadge}>
                    <Text style={styles.liveBadgeText}>🟢 LIVE</Text>
                  </View>
                </View>
                <Text style={styles.detailText}>
                  {item.type} · {isTruck ? (item as TruckListing).cap : (item as GoodsListing).wt} Tonnes
                </Text>
                <Text style={styles.timeText}>
                  {isTruck ? `Truck #${(item as TruckListing).truckNo}` : 'Goods Listing'} · Date: {item.date}
                </Text>
              </View>
            );
          }}
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
    marginBottom: 8,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
  },
  arrow: {
    color: Colors.gold,
  },
  liveBadge: {
    backgroundColor: 'rgba(74, 222, 120, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 120, 0.3)',
  },
  liveBadgeText: {
    fontSize: 10,
    color: Colors.green,
    fontWeight: '600',
  },
  detailText: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: Colors.goldHi,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
  },
});

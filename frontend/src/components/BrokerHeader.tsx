import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, SemanticColors } from '../theme/colors';
import { PrototypeStore } from '../services/store';

export const BrokerHeader = ({ navigation }: { navigation?: any }) => {
  const storeState = PrototypeStore.getState();
  const me = storeState.currentUser;

  return (
    <View style={styles.container}>
      {/* Top Banner */}
      <View style={styles.topBanner}>
        <View style={styles.freePreviewBadge}>
          <Text style={styles.freePreviewText}>FREE PREVIEW</Text>
        </View>
        <Text style={styles.logoText}>MAPS FREIGHT</Text>
        <TouchableOpacity 
          style={styles.exitBadge}
          onPress={() => PrototypeStore.logout()}
        >
          <Text style={styles.exitText}>EXIT</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{me?.unlocks || 0}</Text>
          <Text style={styles.statLabel}>UNLOCKS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{me?.deals || 0}</Text>
          <Text style={styles.statLabel}>DEALS DONE</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ink,
    paddingTop: 48, // Safe area for iOS/Android status bar
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  topBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  freePreviewBadge: {
    backgroundColor: Colors.navy2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freePreviewText: {
    color: Colors.slate,
    fontSize: 10,
    fontWeight: 'bold',
  },
  logoText: {
    color: Colors.ivory,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  exitBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exitText: {
    color: Colors.ink,
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.asphalt,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.yellow,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.steel,
    fontWeight: 'bold',
  },
});

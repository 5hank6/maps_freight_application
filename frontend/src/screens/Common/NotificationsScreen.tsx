import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore, NotificationItem } from '../../services/store';
import { Ionicons } from '@expo/vector-icons';


export const NotificationsScreen = () => {
  const me = PrototypeStore.getState().currentUser;
  const [notifs, setNotifs] = useState<NotificationItem[]>(
    PrototypeStore.getState().notifs?.filter((n) => n.uid === me?.id || n.uid === 'admin') || []
  );

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setNotifs([...PrototypeStore.getState().notifs?.filter((n) => n.uid === me?.id || n.uid === 'admin') || []]);
    });
    return unsubscribe;
  }, [me?.id]);

  const timeAgo = (at: number) => {
    const min = Math.floor((Date.now() - at) / 60000);
    if (min < 1) return 'Just now';
    if (min < 60) return `${min} min ago`;
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `${hrs} hrs ago`;
    return `${Math.floor(hrs / 24)} days ago`;
  };

  const renderHeader = () => (
    <>
      <View style={styles.tabHeader}>
        <Text style={styles.title}>Alerts</Text>
        <Text style={styles.subtext}>Simulated real-time WhatsApp & in-app alerts</Text>
      </View>
    </>
  );

  return (
    <ScreenContainer style={styles.container}>
      {notifs.length === 0 ? (
        <View>
           {renderHeader()}
           <View style={styles.emptyContainer}>
             <Ionicons name="notifications-off-outline" size={48} color={SemanticColors.border} />
             <Text style={styles.emptyText}>No notifications yet.</Text>
           </View>
        </View>
      ) : (
        <FlatList
          data={notifs}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <View style={styles.notifCard}>
              <View style={styles.cardHeader}>
                {item.wa ? (
                  <View style={styles.waBadge}>
                    <Ionicons name="logo-whatsapp" size={14} color="#fff" />
                    <Text style={styles.waText}>WhatsApp</Text>
                  </View>
                ) : (
                  <View style={styles.inAppBadge}>
                    <Ionicons name="notifications" size={14} color={Colors.gold} />
                    <Text style={styles.inAppText}>In-App</Text>
                  </View>
                )}
                <Text style={styles.timeText}>{timeAgo(item.at || Date.now())}</Text>
              </View>
              <Text style={styles.notifText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ink,
  },
  tabHeader: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 13,
    color: SemanticColors.textSecondary,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(159, 178, 203, 0.05)',
    marginHorizontal: 16,
    padding: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(159, 178, 203, 0.1)',
    marginTop: 20,
    gap: 16,
  },
  emptyText: {
    color: SemanticColors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  notifCard: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
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
    marginBottom: 12,
  },
  waBadge: {
    flexDirection: 'row',
    backgroundColor: '#25d366',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
  },
  waText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  inAppBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    alignItems: 'center',
    gap: 4,
  },
  inAppText: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    fontWeight: '500',
  },
  notifText: {
    fontSize: 14,
    color: SemanticColors.textPrimary,
    lineHeight: 22,
    fontWeight: '500',
  },
});

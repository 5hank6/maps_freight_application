import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';

import { Colors, SemanticColors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const BrokerWalletScreen = () => {
  const [storeState, setStoreState] = useState(PrototypeStore.getState());

  useEffect(() => {
    const unsubscribe = PrototypeStore.subscribe(() => {
      setStoreState({ ...PrototypeStore.getState() });
    });
    return unsubscribe;
  }, []);

  const me = storeState.currentUser;
  const isPending = me?.status === 'pending';
  
  // Real unlocks for transactions (basic implementation)
  const transactions = storeState.unlocks
    ?.filter((u) => u.by === me?.id)
    .map(u => ({
      id: u.id,
      type: 'unlock',
      desc: `Unlocked ${u.kind === 'goods' ? 'Goods' : 'Truck'}`,
      amt: -u.amount,
      date: new Date(u.createdAt || Date.now()).toLocaleDateString()
    })) || [];

  const handleTopUp = async (amount: number) => {
    await PrototypeStore.topupWallet(amount);
  };

  const renderTx = ({ item }: { item: any }) => (
    <View style={styles.txCard}>
      <View style={styles.txLeft}>
         <View style={[styles.txIconBox, { backgroundColor: item.amt > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
           <Ionicons name={item.amt > 0 ? "arrow-down" : "arrow-up"} size={20} color={item.amt > 0 ? Colors.green : Colors.red} />
         </View>
        <View>
          <Text style={styles.txDesc}>{item.desc}</Text>
          <Text style={styles.txDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={[styles.txAmt, item.amt > 0 ? styles.txPos : styles.txNeg]}>
        {item.amt > 0 ? '+' : ''}₹{Math.abs(item.amt)}
      </Text>
    </View>
  );

  return (
    <ScreenContainer style={styles.container} >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.tabHeader}>
          <Text style={styles.title}>Wallet & Subscription</Text>
        </View>
        
        {isPending && (
          <View style={styles.pendingBanner}>
            <Ionicons name="time" size={20} color={Colors.amber} />
            <Text style={styles.pendingText}>Pending admin approval. Limited to Free Preview.</Text>
          </View>
        )}
        
        <LinearGradient
          colors={['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.02)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceBox}
        >
          <View style={styles.balanceTopRow}>
            <Text style={styles.balanceLabel}>CURRENT BALANCE</Text>
            <Ionicons name="wallet" size={24} color={Colors.gold} />
          </View>
          <Text style={styles.balanceValue}>₹ {me?.wallet?.toLocaleString() || 0}</Text>
        </LinearGradient>
        
        <View style={styles.addMoneyBox}>
          <Text style={styles.addMoneyTitle}>Top Up Wallet instantly via UPI</Text>
          <View style={styles.addMoneyRow}>
            <TouchableOpacity style={styles.addBtn} onPress={() => handleTopUp(150)}>
              <Text style={styles.addBtnText}>+₹150</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={() => handleTopUp(500)}>
              <Text style={styles.addBtnText}>+₹500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={() => handleTopUp(2000)}>
              <Text style={styles.addBtnText}>+₹2,000</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.txHeader}>
          <Text style={styles.txTitle}>Recent Transactions</Text>
        </View>

        {transactions.length > 0 ? (
           transactions.map(tx => <React.Fragment key={tx.id}>{renderTx({ item: tx })}</React.Fragment>)
        ) : (
           <View style={styles.emptyBox}>
             <Ionicons name="receipt-outline" size={32} color={SemanticColors.border} />
             <Text style={styles.emptyText}>No recent transactions</Text>
           </View>
        )}
        
        <View style={{height: 100}} />
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
  },
  tabHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
  },
  pendingBanner: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    marginBottom: 16,
    alignItems: 'center',
    gap: 8,
  },
  pendingText: {
    color: Colors.amber,
    fontSize: 13,
    fontWeight: '600',
  },
  balanceBox: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  balanceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceLabel: {
    color: SemanticColors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  balanceValue: {
    color: Colors.gold,
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
  },
  addMoneyBox: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  addMoneyTitle: {
    fontSize: 14,
    color: SemanticColors.textPrimary,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  addMoneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  addBtn: {
    flex: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addBtnText: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: 15,
  },
  txHeader: {
    marginBottom: 16,
  },
  txTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: SemanticColors.textPrimary,
  },
  txCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SemanticColors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: SemanticColors.border,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txDesc: {
    fontSize: 15,
    fontWeight: '600',
    color: SemanticColors.textPrimary,
    marginBottom: 4,
  },
  txDate: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    fontWeight: '500',
  },
  txAmt: {
    fontSize: 16,
    fontWeight: '700',
  },
  txPos: {
    color: Colors.green,
  },
  txNeg: {
    color: SemanticColors.textPrimary,
  },
  emptyBox: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(159, 178, 203, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(159, 178, 203, 0.1)',
  },
  emptyText: {
    color: SemanticColors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  }
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Colors, SemanticColors } from '../../theme/colors';

export const BrokerPostOnBehalfScreen = ({ navigation }: any) => {
  return (
    <ScreenContainer style={styles.container} >
      <View style={styles.tabHeader}>
        <Text style={styles.title}>Post on Behalf</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.whiteBox}>
          <Text style={styles.infoText}>
            This feature allows you to post Goods or Trucks on behalf of your clients.
          </Text>
          <Text style={styles.infoSub}>
            (This is a placeholder screen for the Post on Behalf flow)
          </Text>
          
          <TouchableOpacity style={styles.actionBtn} onPress={() => alert('Feature coming soon')}>
            <Text style={styles.actionBtnText}>+ Post New Listing</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: SemanticColors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  whiteBox: {
    backgroundColor: SemanticColors.card,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: SemanticColors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  infoSub: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  actionBtn: {
    backgroundColor: Colors.gold,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  actionBtnText: {
    color: Colors.ink,
    fontWeight: '800',
    fontSize: 15,
  },
});

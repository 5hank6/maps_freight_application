import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../theme/colors';
import { PrototypeStore } from '../services/store';

export const FloatingBanner = () => {
  const me = PrototypeStore.getState().currentUser;

  if (me.role !== 'broker') return null;

  if (!me.approved) {
    return (
      <View style={styles.banner}>
        <Text style={styles.text}>
          ⏳ <Text style={styles.bold}>Account under verification.</Text> Admin reviews your Aadhaar. You are in Free Preview — browse but cannot unlock yet.
        </Text>
      </View>
    );
  }

  if (me.tier === 'free_preview') {
    return (
      <View style={styles.banner}>
        <Text style={styles.text}>
          🎉 <Text style={styles.bold}>Approved!</Text> Subscribe for <Text style={styles.bold}>₹2,000/month</Text> to unlock listings & get instant feed access.
        </Text>
        <TouchableOpacity style={styles.subBtn} onPress={() => PrototypeStore.subscribeBroker()}>
          <Text style={styles.subBtnText}>Subscribe Now — ₹2,000</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.purple,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: Colors.yellow,
  },
  subBtn: {
    backgroundColor: Colors.yellow,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  subBtnText: {
    color: Colors.ink,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

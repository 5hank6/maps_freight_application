import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from './Button';
import { SemanticColors, Colors } from '../theme/colors';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { PrototypeStore } from '../services/store';

interface ChatModalProps {
  visible: boolean;
  unlockId: string | null;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ visible, unlockId, onClose }) => {
  const [inputText, setInputText] = useState('');
  const state = PrototypeStore.getState();

  if (!unlockId) return null;

  const unlock = state.unlocks.find((u) => u.id === unlockId);
  if (!unlock) return null;

  const arr = unlock.kind === 'goods' ? state.goods : state.trucks;
  const listing = arr.find((x) => x.id === unlock.lid);
  const me = state.currentUser;
  const messages = state.chats[unlockId] || [];

  const handleSend = () => {
    if (!inputText.trim()) return;
    PrototypeStore.sendChatMessage(unlockId, inputText.trim());
    setInputText('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <BlurView intensity={30} tint="dark" style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>💬 Chat — {listing ? (listing as any).from || (listing as any).city : ''} ➔ {listing?.to}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chatBox} contentContainerStyle={styles.chatContent}>
            {messages.length === 0 ? (
              <Text style={styles.emptyText}>Chat opened after unlock. Coordinate here — text only, no numbers.</Text>
            ) : (
              messages.map((m, idx) => (
                <View key={idx}>
                  {m.blocked ? (
                    <View style={styles.blockedBox}>
                      <Text style={styles.blockedText}>⚠ Message blocked — phone numbers / contacts cannot be shared in chat.</Text>
                    </View>
                  ) : (
                    <View style={[styles.msgBubble, m.from === me.id ? styles.meBubble : styles.otherBubble]}>
                      <Text style={[styles.senderName, m.from === me.id ? styles.meSender : styles.otherSender]}>
                        {m.from === me.id ? 'You' : 'Counterparty'}
                      </Text>
                      <Text style={[styles.msgText, m.from === me.id ? styles.meMsg : styles.otherMsg]}>{m.text}</Text>
                    </View>
                  )}
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type message (no numbers)..."
              placeholderTextColor={SemanticColors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity onPress={handleSend} activeOpacity={0.8}>
              <LinearGradient
                colors={[Colors.goldHi, Colors.gold, Colors.goldLo]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.sendBtn}
              >
                <Text style={styles.sendText}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(7, 21, 39, 0.65)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: SemanticColors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: Colors.gold,
    borderBottomWidth: 0,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    fontSize: 18,
    color: Colors.goldHi,
  },
  chatBox: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    padding: 12,
    height: 280,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatContent: {
    gap: 12,
  },
  emptyText: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    textAlign: 'center',
    marginTop: 80,
  },
  msgBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  meBubble: {
    backgroundColor: Colors.green,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: Colors.navy2,
    alignSelf: 'flex-start',
  },
  senderName: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  meSender: {
    color: '#071527',
  },
  otherSender: {
    color: Colors.goldHi,
  },
  msgText: {
    fontSize: 13,
  },
  meMsg: {
    color: '#071527',
    fontWeight: '600',
  },
  otherMsg: {
    color: Colors.ivory,
  },
  blockedBox: {
    backgroundColor: Colors.redBg,
    padding: 8,
    borderRadius: 6,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: Colors.red,
  },
  blockedText: {
    fontSize: 11,
    color: Colors.red,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14,
    color: Colors.ivory,
  },
  sendBtn: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
  },
  sendText: {
    color: Colors.ink,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

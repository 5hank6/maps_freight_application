import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';

const GOODS_TYPES = ['Chemicals', 'Edible Oil', 'Salt', 'Ceramics', 'Steel', 'FMCG', 'Textile', 'Timber', 'General', 'Other'];

export const PostLoadScreen = ({ navigation }: any) => {
  const [goodsType, setGoodsType] = useState(GOODS_TYPES[0]);
  const [weight, setWeight] = useState('');
  const [pickupCity, setPickupCity] = useState('Gandhidham');
  const [destinationCity, setDestinationCity] = useState('');
  const [dateChip, setDateChip] = useState<'Today' | 'Tomorrow' | 'Custom'>('Today');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [customDateInput, setCustomDateInput] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  const [notes, setNotes] = useState('');

  const handlePickCustomDate = () => {
    if (customDateInput.trim()) {
      setSelectedDate(customDateInput);
      setDateChip('Custom');
      setShowDatePickerModal(false);
    } else {
      alert('Please enter a valid date (e.g. 2026-07-28)');
    }
  };

  const handleSubmit = async () => {
    if (!destinationCity.trim() || !weight.trim()) {
      alert('Please fill in Destination City and Weight');
      return;
    }

    const me = PrototypeStore.getState().currentUser;

    // Persist to central PrototypeStore (which now saves to Supabase)
    await PrototypeStore.postGoods({
      by: me.id,
      byRole: me.role,
      type: goodsType,
      wt: parseFloat(weight) || 20,
      from: pickupCity,
      to: destinationCity,
      date: dateChip === 'Custom' ? selectedDate : dateChip,
      contactName: me.name || 'Shipper',
      contactPhone: me.phone || '',
      rate: expectedRate ? `₹${expectedRate}` : 'Open to offers',
      notes: notes,
      status: 'live'
    });

    alert('🎉 Load posted successfully! It is now live for all brokers on this route.');
    navigation.navigate('Home');
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Post a Load</Text>
        </View>

        {/* Goods Type Selection */}
        <Text style={styles.label}>Goods Type *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {GOODS_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, goodsType === type && styles.chipActive]}
              onPress={() => setGoodsType(type)}
            >
              <Text style={[styles.chipText, goodsType === type && styles.chipTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input
          label="Weight (Tonnes) *"
          placeholder="e.g. 24"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <Input
          label="Pickup City *"
          placeholder="e.g. Gandhidham"
          value={pickupCity}
          onChangeText={setPickupCity}
        />

        <Input
          label="Destination City *"
          placeholder="e.g. Mumbai / Ludhiana / Delhi"
          value={destinationCity}
          onChangeText={setDestinationCity}
        />

        {/* Loading Date Picker */}
        <Text style={styles.label}>Loading Date *</Text>
        <View style={styles.dateChipRow}>
          <TouchableOpacity
            style={[styles.dateChip, dateChip === 'Today' && styles.dateChipActive]}
            onPress={() => { setDateChip('Today'); setSelectedDate('Today'); }}
          >
            <Text style={[styles.dateChipText, dateChip === 'Today' && styles.dateChipTextActive]}>Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateChip, dateChip === 'Tomorrow' && styles.dateChipActive]}
            onPress={() => { setDateChip('Tomorrow'); setSelectedDate('Tomorrow'); }}
          >
            <Text style={[styles.dateChipText, dateChip === 'Tomorrow' && styles.dateChipTextActive]}>Tomorrow</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateChip, dateChip === 'Custom' && styles.dateChipActive]}
            onPress={() => setShowDatePickerModal(true)}
          >
            <Text style={[styles.dateChipText, dateChip === 'Custom' && styles.dateChipTextActive]}>
              📅 {dateChip === 'Custom' ? selectedDate : 'Pick Date'}
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Expected Rate (Optional)"
          placeholder="e.g. 5000"
          keyboardType="numeric"
          value={expectedRate}
          onChangeText={setExpectedRate}
        />

        <Input
          label="Notes / Special Requirements"
          placeholder="e.g. Needs MXL container"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          style={styles.textArea}
        />

        <Button
          title="Post Load — Free"
          variant="primary"
          onPress={handleSubmit}
          style={styles.submitBtn}
        />
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal visible={showDatePickerModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📅 Select Loading Date</Text>
            <Text style={styles.modalSub}>Enter preferred date (YYYY-MM-DD):</Text>
            <Input
              placeholder="e.g. 2026-07-28"
              value={customDateInput}
              onChangeText={setCustomDateInput}
            />
            <Button title="Set Date" variant="primary" onPress={handlePickCustomDate} />
            <Button title="Cancel" variant="secondary" onPress={() => setShowDatePickerModal(false)} style={styles.modalCancel} />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    paddingRight: 16,
  },
  backText: {
    color: Colors.gold,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
  },
  label: {
    color: SemanticColors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  chip: {
    backgroundColor: SemanticColors.card,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  chipText: {
    color: SemanticColors.textSecondary,
    fontSize: 13,
  },
  chipTextActive: {
    color: Colors.ink,
    fontWeight: '600',
  },
  dateChipRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dateChip: {
    flex: 1,
    backgroundColor: SemanticColors.card,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  dateChipActive: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201, 162, 39, 0.15)',
  },
  dateChipText: {
    color: SemanticColors.textSecondary,
    fontSize: 13,
  },
  dateChipTextActive: {
    color: Colors.goldHi,
    fontWeight: '600',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  submitBtn: {
    marginTop: 24,
    height: 52,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: SemanticColors.card,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: SemanticColors.textPrimary,
    marginBottom: 6,
  },
  modalSub: {
    fontSize: 14,
    color: SemanticColors.textSecondary,
    marginBottom: 16,
  },
  modalCancel: {
    marginTop: 8,
  },
});

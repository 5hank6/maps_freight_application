import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';

const TRUCK_TYPES = ['Open Body', 'Container/MXL', 'Trailer', 'Tanker', 'Tipper', 'Flatbed'];

export const PostTripScreen = ({ navigation }: any) => {
  const [truckType, setTruckType] = useState(TRUCK_TYPES[0]);
  const [capacity, setCapacity] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [dateChip, setDateChip] = useState<'Today' | 'Tomorrow' | 'Custom'>('Today');
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [customDateInput, setCustomDateInput] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  const [detourAllowed, setDetourAllowed] = useState(false);

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
    if (!toCity.trim() || !truckNumber.trim()) {
      alert('Please fill in Destination City and Truck No');
      return;
    }

    const me = PrototypeStore.getState().currentUser;

    // Persist to central PrototypeStore
    await PrototypeStore.postTruck({
      by: me.id,
      type: truckType,
      cap: parseFloat(capacity) || 24,
      city: fromCity,
      to: toCity,
      date: dateChip === 'Custom' ? selectedDate : dateChip,
      detour: detourAllowed,
      truckNo: truckNumber,
      ownerName: me.name || 'Owner',
      ownerPhone: me.phone || '',
      driverName: driverName,
      driverPhone: driverPhone,
      parking: fromCity,
      status: 'live'
    });

    alert('✅ Truck posted successfully! Waiting for matching loads...');
    navigation.navigate('Home');
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Post Empty Trip</Text>
        </View>

        <Text style={styles.label}>Truck Type *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {TRUCK_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.chip, truckType === type && styles.chipActive]}
              onPress={() => setTruckType(type)}
            >
              <Text style={[styles.chipText, truckType === type && styles.chipTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input
          label="Capacity (Tonnes) *"
          placeholder="e.g. 20"
          keyboardType="numeric"
          value={capacity}
          onChangeText={setCapacity}
        />

        <Input
          label="From City (Current Location) *"
          placeholder="e.g. Delhi / Kandla"
          value={fromCity}
          onChangeText={setFromCity}
        />

        <Input
          label="Going To City *"
          placeholder="e.g. Kandla / Jaipur"
          value={toCity}
          onChangeText={setToCity}
        />

        {/* Departure Date Picker */}
        <Text style={styles.label}>Departure Date *</Text>
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
          label="Truck Number * (Hidden behind Parda)"
          placeholder="e.g. GJ-12-XX-1234"
          autoCapitalize="characters"
          value={truckNumber}
          onChangeText={setTruckNumber}
        />

        <Input
          label="Driver Name (Optional, Hidden)"
          placeholder="e.g. Gurdeep Singh"
          value={driverName}
          onChangeText={setDriverName}
        />

        <Input
          label="Driver Phone (Optional, Hidden)"
          placeholder="e.g. 9814055555"
          keyboardType="phone-pad"
          value={driverPhone}
          onChangeText={setDriverPhone}
        />

        <Input
          label="Expected Freight Rate (Optional)"
          placeholder="e.g. 45000"
          keyboardType="numeric"
          value={expectedRate}
          onChangeText={setExpectedRate}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Willing to Detour for Load?</Text>
          <Switch
            value={detourAllowed}
            onValueChange={setDetourAllowed}
            trackColor={{ false: SemanticColors.border, true: Colors.gold }}
            thumbColor={detourAllowed ? Colors.goldHi : Colors.slate}
          />
        </View>

        <Button
          title="Post Trip — Free"
          variant="primary"
          onPress={handleSubmit}
          style={styles.submitBtn}
        />
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal visible={showDatePickerModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📅 Select Departure Date</Text>
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SemanticColors.card,
    padding: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    marginVertical: 12,
  },
  switchLabel: {
    fontSize: 14,
    color: SemanticColors.textPrimary,
  },
  submitBtn: {
    marginTop: 16,
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

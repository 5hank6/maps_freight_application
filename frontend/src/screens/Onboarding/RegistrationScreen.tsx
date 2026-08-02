import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { SemanticColors, Colors } from '../../theme/colors';
import { PrototypeStore } from '../../services/store';
import { supabase } from '../../services/supabase';

const GOODS_TYPES = ['Chemicals', 'Edible Oil', 'Salt', 'Ceramics', 'Steel', 'FMCG', 'Textile', 'Timber', 'General'];
const TRUCK_TYPES = ['Open Body', 'Closed Body', 'Container', 'Tanker', 'Flatbed', 'Trailer'];
const ROUTES = ['Gujarat↔Delhi/NCR', 'Gujarat↔Mumbai', 'Gujarat↔Rajasthan', 'Gujarat↔Punjab', 'Gujarat↔MP', 'Pan-India', 'Other'];

export const RegistrationScreen = ({ route, navigation }: any) => {
  const role: 'shipper' | 'transporter' | 'broker' = (route.params?.role || 'shipper').toLowerCase();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [firmName, setFirmName] = useState('');
  const [city, setCity] = useState('Gandhidham');
  const [state, setState] = useState('Gujarat');
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedTruckTypes, setSelectedTruckTypes] = useState<string[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [truckCount, setTruckCount] = useState('1');
  const [subRole, setSubRole] = useState('Transport Company');
  const [yearsInBusiness, setYearsInBusiness] = useState('1-3');
  const [referralSource, setReferralSource] = useState('');
  const [tncAccepted, setTncAccepted] = useState(false);

  const toggleSelect = (list: string[], item: string, setter: (v: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleRegister = async () => {
    if (fullName.trim().length < 3) {
      alert('Please enter your full name (min 3 chars).');
      return;
    }
    if (phone.trim().length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (panNumber.trim().length !== 10) {
      alert('Please enter a valid 10-digit PAN Number (e.g. ABCDE1234F).');
      return;
    }

    // PAN Role-Lock Check
    const users = PrototypeStore.getState().users;
    const panUpper = panNumber.trim().toUpperCase();
    const existing = users.filter((u) => u.pan === panUpper);
    if (existing.length > 0) {
      for (const u of existing) {
        const exBroker = u.role === 'broker';
        const newBroker = role === 'broker';
        if (exBroker !== newBroker) {
          alert(`🚫 PAN Role-Lock Error: This PAN is already registered as a ${u.role.toUpperCase()}. A Broker account cannot share identity with Shipper/Transporter accounts.`);
          return;
        }
      }
    }

    if (role === 'broker' && !aadhaarUploaded) {
      alert('Please upload Aadhaar image before submitting.');
      return;
    }

    if (!tncAccepted) {
      alert('You must accept the Terms of Use.');
      return;
    }

    try {
      // Check if user already exists in DB
      const [
        { data: brokers },
        { data: shippers },
        { data: transporters }
      ] = await Promise.all([
        supabase.from('Broker').select('*').eq('mobile', phone.trim()),
        supabase.from('Shipper').select('*').eq('mobile', phone.trim()),
        supabase.from('TruckOwner').select('*').eq('mobile', phone.trim())
      ]);

      const existingUser = (brokers && brokers[0]) || (shippers && shippers[0]) || (transporters && transporters[0]);

      if (existingUser) {
        alert('You are already registered! Please login instead.');
        navigation.navigate('Login');
        return;
      }

      // Helper to generate a valid UUID v4
      const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
      
      const userId = generateUUID();
      let tableName = '';
      let insertData: any = {};
      
      const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
      const finalDbPhone = `+91${cleanPhone}`;
      
      if (role === 'broker') {
        tableName = 'Broker';
        // Note: Broker table only has id, name, mobile, location, createdAt
        insertData = {
          id: userId,
          name: fullName,
          mobile: finalDbPhone,
          location: city
        };
      } else if (role === 'shipper') {
        tableName = 'Shipper';
        // Shipper table needs: id, name, mobile, companyName, goodsType, volume, baseCity, routes
        insertData = {
          id: userId,
          name: fullName,
          mobile: finalDbPhone,
          companyName: company || firmName || 'Individual',
          goodsType: selectedCats.length > 0 ? selectedCats.join(', ') : 'General',
          volume: 'Not Specified', // Not in UI
          baseCity: city, // Required by DB
          routes: 'Pan-India' // Not in UI
        };
      } else if (role === 'transporter') {
        tableName = 'TruckOwner';
        // TruckOwner table needs: id, name, mobile, fleetName, truckCount, bodyType, baseCity, routes
        insertData = {
          id: userId,
          name: fullName,
          mobile: finalDbPhone,
          fleetName: company || firmName || 'Individual',
          truckCount: truckCount || '1',
          bodyType: selectedTruckTypes.length > 0 ? selectedTruckTypes.join(', ') : 'Any',
          baseCity: city, // Required by DB
          routes: 'Pan-India' // Not in UI
        };
      }

      const { error } = await supabase
        .from(tableName)
        .insert([insertData]);
        
      if (error) {
        console.error("Supabase insert error:", error);
        alert('Failed to register on backend: ' + error.message);
      } else {
        console.log("Successfully registered to Supabase!");
      }
    } catch (err) {
      console.error("Error connecting to Supabase", err);
    }

    // Create user in PrototypeStore (keep for local state fallback)
    const newUser = {
      id: 'u-' + Date.now(),
      role,
      name: fullName,
      phone,
      company: company || firmName,
      firm: firmName,
      email,
      city,
      state,
      pan: panUpper,
      gst: gstNumber,
      aadhaar: aadhaarNumber,
      status: role === 'broker' ? 'pending' : 'active',
      approved: role !== 'broker',
      tier: role === 'broker' ? ('free_preview' as const) : undefined,
      wallet: 0,
      unlocks: 0,
      deals: 0,
    };

    PrototypeStore.getState().users.push(newUser as any);
    PrototypeStore.setCurrentUser(newUser as any);
    PrototypeStore.addNotification(newUser.id, role === 'broker' ? 'Welcome! Your broker account is under verification. You can browse listings in Free Preview.' : '✅ Your account is live! You can post immediately.');

    navigation.navigate('OTPLogin', { phone, role });
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Register — {role.toUpperCase()}</Text>
        <Text style={styles.subtext}>Step 2 of 3 — Enter business verification details</Text>

        <Input
          label="Full Name *"
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Input
          label={role === 'broker' ? 'Company / Firm Name (optional — firm asked below)' : 'Company / Firm Name (optional)'}
          placeholder="e.g. Patel Logistics"
          value={company}
          onChangeText={setCompany}
        />

        <Input
          label="Phone (WhatsApp) *"
          placeholder="10 digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
        />

        <Input
          label="Email (optional)"
          placeholder="Enter email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="City *"
              placeholder="e.g. Gandhidham"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.halfWidth}>
            <Input
              label="State *"
              placeholder="e.g. Gujarat"
              value={state}
              onChangeText={setState}
            />
          </View>
        </View>

        <Input
          label="PAN Number * (PAN Role-Lock Enforced)"
          placeholder="ABCDE1234F"
          autoCapitalize="characters"
          maxLength={10}
          value={panNumber}
          onChangeText={setPanNumber}
        />

        <Input
          label="GSTIN Number (Optional)"
          placeholder="15-char GST Number"
          autoCapitalize="characters"
          maxLength={15}
          value={gstNumber}
          onChangeText={setGstNumber}
        />

        {/* Shipper Specific */}
        {role === 'shipper' && (
          <View style={styles.section}>
            <Input label="Company Name" placeholder="e.g. Patel Logistics" value={company} onChangeText={setCompany} />
            <Text style={styles.label}>Goods Categories Usually Shipped *</Text>
            <View style={styles.chipGrid}>
              {GOODS_TYPES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, selectedCats.includes(cat) && styles.chipActive]}
                  onPress={() => toggleSelect(selectedCats, cat, setSelectedCats)}
                >
                  <Text style={[styles.chipText, selectedCats.includes(cat) && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Transporter Specific */}
        {role === 'transporter' && (
          <View style={styles.section}>
            <Input label="Company / Firm Name (optional)" placeholder="e.g. Singh Roadlines" value={company} onChangeText={setCompany} />
            <Input label="Your Role *" placeholder="Transport Company / Truck Owner" value={subRole} onChangeText={setSubRole} />
            <Input label="Number of Trucks *" keyboardType="numeric" placeholder="1" value={truckCount} onChangeText={setTruckCount} />
            
            <Text style={styles.label}>Truck Types Operated *</Text>
            <View style={styles.chipGrid}>
              {TRUCK_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.checkboxRow, selectedTruckTypes.includes(type) && styles.checkboxRowActive]}
                  onPress={() => toggleSelect(selectedTruckTypes, type, setSelectedTruckTypes)}
                >
                  <View style={[styles.roundCheckbox, selectedTruckTypes.includes(type) && styles.roundCheckboxActive]}>
                    {selectedTruckTypes.includes(type) && <View style={styles.roundCheckboxInner} />}
                  </View>
                  <Text style={styles.checkboxText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Broker Specific */}
        {role === 'broker' && (
          <View style={styles.section}>
            <Input label="Firm Name *" placeholder="Your brokerage / agency name" value={firmName} onChangeText={setFirmName} />
            <Input label="Aadhaar Number *" placeholder="12-digit Aadhaar" keyboardType="numeric" maxLength={12} value={aadhaarNumber} onChangeText={setAadhaarNumber} />
            
            <Text style={styles.label}>Aadhaar Card Photo * <Text style={{fontWeight: 'normal', color: SemanticColors.textSecondary}}>(demo: tap to simulate upload)</Text></Text>
            <TouchableOpacity
              style={[styles.uploadBtn, aadhaarUploaded && styles.uploadBtnSuccess]}
              onPress={() => setAadhaarUploaded(true)}
            >
              <Text style={styles.uploadBtnText}>
                {aadhaarUploaded ? '✓ aadhaar_front.jpg Uploaded' : '📎 Upload Aadhaar image'}
              </Text>
            </TouchableOpacity>

            <Input label="Years in Business *" placeholder="1-3" value={yearsInBusiness} onChangeText={setYearsInBusiness} />

            <Text style={styles.label}>Routes You Operate *</Text>
            <View style={styles.chipGrid}>
              {ROUTES.map((routeItem) => (
                <TouchableOpacity
                  key={routeItem}
                  style={[styles.checkboxRow, selectedRoutes.includes(routeItem) && styles.checkboxRowActive]}
                  onPress={() => toggleSelect(selectedRoutes, routeItem, setSelectedRoutes)}
                >
                  <View style={[styles.roundCheckbox, selectedRoutes.includes(routeItem) && styles.roundCheckboxActive]}>
                    {selectedRoutes.includes(routeItem) && <View style={styles.roundCheckboxInner} />}
                  </View>
                  <Text style={styles.checkboxText}>{routeItem}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input label="How did you hear about MAPS FREIGHT? (optional)" placeholder="Referral / group / friend" value={referralSource} onChangeText={setReferralSource} />
          </View>
        )}

        {/* Terms of Use */}
        <View style={styles.termsBox}>
          <Text style={styles.termsTitle}>TERMS OF USE (summary)</Text>
          <Text style={styles.termsContent}>
            1. MAPS FREIGHT is an information platform. Deals, rates, payments and delivery are strictly between the connected parties. 2. Unlock fees (₹150) are for access to contact information and are non-refundable once details are revealed, except when a listing is confirmed stale within 24 hours. 3. Broker membership (₹2,000/month) renews monthly; no pro-rata refunds. 4. Sharing phone numbers/emails inside platform chat is prohibited; repeat violations lead to suspension. 5. Posting fake or expired listings leads to account ban. 6. One PAN = one role tier: a Broker identity cannot also hold Shipper/Transporter accounts. 7. All data provided must be accurate; misrepresentation is grounds for termination.
          </Text>
        </View>

        <TouchableOpacity style={styles.tncRow} onPress={() => setTncAccepted(!tncAccepted)}>
          <View style={[styles.checkbox, tncAccepted && styles.checkboxActive]}>
            {tncAccepted && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.tncText}>I accept the Terms of Use and confirm my details are accurate. *</Text>
        </TouchableOpacity>

        <Button
          title="Create Account →"
          onPress={handleRegister}
          style={styles.submitBtn}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  backBtn: {
    paddingRight: 16,
  },
  backText: {
    color: Colors.gold,
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    color: SemanticColors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 12,
    color: SemanticColors.textSecondary,
    marginBottom: 16,
  },
  section: {
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: SemanticColors.textPrimary,
    marginBottom: 8,
    marginTop: 6,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: SemanticColors.card,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  chipText: {
    color: SemanticColors.textSecondary,
    fontSize: 12,
  },
  chipTextActive: {
    color: Colors.ink,
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  checkboxRowActive: {
    opacity: 1,
  },
  roundCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: SemanticColors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roundCheckboxActive: {
    borderColor: Colors.gold,
  },
  roundCheckboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gold,
  },
  checkboxText: {
    color: SemanticColors.textPrimary,
    fontSize: 14,
  },
  termsBox: {
    backgroundColor: Colors.asphalt,
    borderWidth: 1,
    borderColor: SemanticColors.border,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 8,
    maxHeight: 120,
    overflow: 'hidden',
  },
  termsTitle: {
    color: SemanticColors.textPrimary,
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 6,
  },
  termsContent: {
    color: SemanticColors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  uploadBtn: {
    backgroundColor: SemanticColors.card,
    borderWidth: 1,
    borderColor: Colors.blue,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadBtnSuccess: {
    borderColor: Colors.green,
    backgroundColor: Colors.greenBg,
  },
  uploadBtnText: {
    color: Colors.ivory,
    fontWeight: 'bold',
    fontSize: 13,
  },
  tncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SemanticColors.card,
  },
  checkboxActive: {
    backgroundColor: Colors.gold,
  },
  checkMark: {
    color: Colors.ink,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tncText: {
    flex: 1,
    fontSize: 12,
    color: SemanticColors.textSecondary,
    lineHeight: 16,
  },
  submitBtn: {
    marginTop: 10,
  },
});

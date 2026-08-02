import { supabase } from './supabase';

export interface User {
  id: string;
  role: 'shipper' | 'transporter' | 'broker' | 'admin';
  name: string;
  phone: string;
  email?: string;
  company?: string;
  firm?: string;
  city: string;
  state: string;
  pan: string;
  gst?: string;
  aadhaar?: string;
  years?: string;
  routes?: string[];
  roleType?: string;
  numTrucks?: string;
  truckTypes?: string[];
  cats?: string[];
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  approved?: boolean;
  tier?: 'standard' | 'free_preview';
  subEnd?: string;
  wallet: number;
  unlocks?: number;
  deals?: number;
  violations?: number;
}

export interface GoodsListing {
  id: string;
  by: string;
  byRole: string;
  type: string;
  wt: number;
  from: string;
  to: string;
  date: string;
  addr?: string;
  rate?: string;
  notes?: string;
  status: 'live' | 'unconfirmed' | 'booked' | 'expired';
  views: number;
  unlockCount: number;
  created?: number;
  createdAt?: string;
  contactName?: string;
  contactPhone?: string;
}

export interface TruckListing {
  id: string;
  by: string;
  type: string;
  cap: number;
  city: string;
  to: string;
  date: string;
  detour: boolean;
  truckNo: string;
  ownerName: string;
  ownerPhone: string;
  driverName: string;
  driverPhone: string;
  parking: string;
  status: 'live' | 'matched' | 'expired';
  views: number;
  unlockCount: number;
  created?: number;
  createdAt?: string;
}

export interface UnlockRecord {
  id: string;
  by: string;
  kind: 'goods' | 'truck';
  lid: string;
  amount: number;
  deal: 'pending' | 'confirmed' | 'failed';
  at?: number;
  createdAt?: string;
}

export interface NotificationItem {
  id: string;
  uid: string;
  text: string;
  wa?: boolean;
  at?: number;
}

export interface ChatMessage {
  id: string;
  unlockId: string;
  senderId: string;
  text: string;
  ts: number;
}

let state = {
  currentUser: {} as User,
  goods: [] as GoodsListing[],
  trucks: [] as TruckListing[],
  unlocks: [] as UnlockRecord[],
  notifs: [] as NotificationItem[],
  users: [] as User[],
  chats: [] as ChatMessage[],
  revenue: 0,
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();
const notifyListeners = () => listeners.forEach((l) => l());

export const PrototypeStore = {
  getState: () => state,
  subscribe: (l: Listener) => {
    listeners.add(l);
    return () => { listeners.delete(l); };
  },

  postGoods: async (goods: any) => {
    const { data, error } = await supabase.from('GoodsListings').insert([{ ...goods, unlockCount: 0, views: 0 }]).select().single();
    if (data) {
      state.goods = [data, ...state.goods];
      notifyListeners();
    } else {
      console.error("Error posting goods:", error);
    }
  },
  postTruck: async (truck: any) => {
    const { data, error } = await supabase.from('TruckListings').insert([{ ...truck, unlockCount: 0, views: 0 }]).select().single();
    if (data) {
      state.trucks = [data, ...state.trucks];
      notifyListeners();
    } else {
      console.error("Error posting truck:", error);
    }
  },
  toggleSuspendUser: (uid: string) => {},
  addNotification: (uid: string, text: string, wa?: boolean) => {},
  logout: () => {},
  sendChatMessage: (unlockId: string, text: string) => {},
  approveBroker: (uid: string) => {},

  setCurrentUser: (user: User) => {
    state.currentUser = user;
    notifyListeners();
    PrototypeStore.loadInitialData(); // Load data when user logs in
  },

  loadInitialData: async () => {
    try {
      const [goodsRes, trucksRes, unlocksRes] = await Promise.all([
        supabase.from('GoodsListings').select('*').order('createdAt', { ascending: false }),
        supabase.from('TruckListings').select('*').order('createdAt', { ascending: false }),
        supabase.from('Unlocks').select('*').eq('by', state.currentUser?.id)
      ]);

      if (goodsRes.data) state.goods = goodsRes.data;
      if (trucksRes.data) state.trucks = trucksRes.data;
      if (unlocksRes.data) state.unlocks = unlocksRes.data;
      
      notifyListeners();
    } catch (e) {
      console.error("Error loading data:", e);
    }
  },

  unlockListing: async (kind: 'goods' | 'truck', lid: string) => {
    const u = state.currentUser;
    if (u.role === 'broker') {
      if (u.status === 'pending') {
        alert('Your broker account is pending admin approval. You are in Free Preview.');
        return false;
      }
      if (u.tier === 'free_preview') {
        alert('Subscribe (₹2,000/month) to unlock listings.');
        return false;
      }
    }

    const existing = state.unlocks.find((un) => un.by === u.id && un.kind === kind && un.lid === lid);
    if (existing) return true;

    if (u.wallet < 150) {
      alert('Insufficient wallet balance. Please top up ₹150.');
      return false;
    }

    u.wallet -= 150;
    const newUnlock = { by: u.id, kind, lid, amount: 150, deal: 'pending' };
    
    // Optimistic update
    state.unlocks.push({ id: 'temp', ...newUnlock } as any);
    notifyListeners();

    // DB update
    await supabase.from('Unlocks').insert([newUnlock]);
    
    // Need to also deduct from the user's wallet in their specific table
    let table = 'Broker';
    if (u.role === 'shipper') table = 'Shipper';
    if (u.role === 'transporter') table = 'TruckOwner';
    
    await supabase.from(table).update({ wallet: u.wallet }).eq('id', u.id);

    // Refresh unlocks
    const { data } = await supabase.from('Unlocks').select('*').eq('by', u.id);
    if (data) state.unlocks = data;
    notifyListeners();
    
    return true;
  },

  subscribeBroker: async () => {
    const u = state.currentUser;
    u.tier = 'standard';
    u.wallet -= 2000; // Assuming they top up and pay from wallet
    
    await supabase.from('Broker').update({ tier: 'standard', wallet: u.wallet }).eq('id', u.id);
    notifyListeners();
    alert('🎉 Subscription active! You now see listings instantly.');
  },

  topupWallet: async (amount: number) => {
    const u = state.currentUser;
    u.wallet = (u.wallet || 0) + amount;
    
    let table = 'Broker';
    if (u.role === 'shipper') table = 'Shipper';
    if (u.role === 'transporter') table = 'TruckOwner';

    await supabase.from(table).update({ wallet: u.wallet }).eq('id', u.id);
    notifyListeners();
    alert(`₹${amount} added successfully!`);
  }
};

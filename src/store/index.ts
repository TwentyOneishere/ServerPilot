import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ServerConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  authType: 'password' | 'key';
  password?: string;
  privateKey?: string;
  color: string;
  status?: string;
}

export interface Alert {
  id: string;
  type: 'temp' | 'cpu' | 'disk' | 'down';
  server: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'amoled';
  language: string;
  pinEnabled: boolean;
  pin: string;
  biometricEnabled: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  sshTimeout: number;
  keepAlive: boolean;
  notifications: { temp: boolean; cpu: boolean; disk: boolean; serverDown: boolean; };
  thresholds: { temp: number; cpu: number; disk: number; };
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark', language: 'ro', pinEnabled: true, pin: '1234',
  biometricEnabled: false, fontSize: 'md', sshTimeout: 30, keepAlive: true,
  notifications: { temp: true, cpu: true, disk: true, serverDown: true },
  thresholds: { temp: 80, cpu: 85, disk: 90 },
};

interface AppStore {
  servers: ServerConfig[];
  activeServerId: string | null;
  settings: AppSettings;
  alerts: Alert[];
  isLocked: boolean;
  commandHistory: string[];
  addServer: (s: ServerConfig) => void;
  removeServer: (id: string) => void;
  updateServer: (id: string, u: Partial<ServerConfig>) => void;
  setActiveServer: (id: string) => void;
  updateSettings: (u: Partial<AppSettings>) => void;
  addAlert: (a: Alert) => void;
  markAlertRead: (id: string) => void;
  clearAlerts: () => void;
  setLocked: (v: boolean) => void;
  addToHistory: (cmd: string) => void;
  hydrate: () => Promise<void>;
  persist: () => Promise<void>;
  exportAll: () => string;
  importAll: (json: string) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  servers: [], activeServerId: null, settings: DEFAULT_SETTINGS,
  alerts: [], isLocked: true, commandHistory: [],

  addServer: (s) => { set(st => ({ servers: [...st.servers, s] })); get().persist(); },
  removeServer: (id) => { set(st => ({ servers: st.servers.filter(s => s.id !== id) })); get().persist(); },
  updateServer: (id, u) => { set(st => ({ servers: st.servers.map(s => s.id === id ? { ...s, ...u } : s) })); get().persist(); },
  setActiveServer: (id) => set({ activeServerId: id }),
  updateSettings: (u) => { set(st => ({ settings: { ...st.settings, ...u } })); get().persist(); },
  addAlert: (a) => set(st => ({ alerts: [a, ...st.alerts].slice(0, 100) })),
  markAlertRead: (id) => set(st => ({ alerts: st.alerts.map(a => a.id === id ? { ...a, read: true } : a) })),
  clearAlerts: () => set({ alerts: [] }),
  setLocked: (v) => set({ isLocked: v }),
  addToHistory: (cmd) => set(st => ({
    commandHistory: [cmd, ...st.commandHistory.filter(c => c !== cmd)].slice(0, 100),
  })),
  hydrate: async () => {
    try {
      const raw = await AsyncStorage.getItem('@serverpilot_state');
      if (raw) {
        const saved = JSON.parse(raw);
        set({
          servers: saved.servers || [],
          activeServerId: saved.activeServerId || null,
          settings: { ...DEFAULT_SETTINGS, ...(saved.settings || {}) },
          alerts: saved.alerts || [],
          commandHistory: saved.commandHistory || [],
        });
      }
    } catch (e) { console.warn('Hydrate failed', e); }
  },
  persist: async () => {
    const st = get();
    await AsyncStorage.setItem('@serverpilot_state', JSON.stringify({
      servers: st.servers, activeServerId: st.activeServerId,
      settings: st.settings, alerts: st.alerts, commandHistory: st.commandHistory,
    }));
  },
  exportAll: () => {
    const st = get();
    return JSON.stringify({
      version: '1.0', exported: new Date().toISOString(),
      servers: st.servers.map(s => ({ ...s, password: undefined })),
      settings: st.settings, commandHistory: st.commandHistory,
    }, null, 2);
  },
  importAll: (json) => {
    try {
      const data = JSON.parse(json);
      if (data.servers) set({ servers: data.servers });
      if (data.settings) set({ settings: { ...DEFAULT_SETTINGS, ...data.settings } });
      get().persist();
    } catch (e) { console.error('Import failed', e); }
  },
}));

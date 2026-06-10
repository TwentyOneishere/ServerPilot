import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useStore } from '../store';

const C = {
  bg: '#0A0C10', surface: '#111318', surfaceHigh: '#191D25', border: '#1E2330',
  accent: '#00D4FF', green: '#00E57A', yellow: '#FFB800', red: '#FF4560',
  purple: '#A855F7', orange: '#FF7A30', teal: '#00C9A7',
  text: '#E8EBF2', textSub: '#7A8399', textMuted: '#4A5168',
};

const DETECTED = [
  { name: 'CasaOS',      port: 81,   icon: '🏠', color: C.accent  },
  { name: 'qBittorrent', port: 8080, icon: '⬇',  color: C.green   },
  { name: 'Jellyfin',    port: 8096, icon: '🎬', color: C.purple  },
  { name: 'Immich',      port: 2283, icon: '📷', color: C.yellow  },
];

const QUICK = [
  { label: 'Terminal', icon: '⌨', color: C.accent,  screen: 'Terminal'   },
  { label: 'Docker',   icon: '🐳', color: C.purple, screen: 'Docker'     },
  { label: 'Files',    icon: '📁', color: C.yellow,  screen: 'Files'      },
  { label: 'Samba',    icon: '🗂', color: C.teal,   screen: 'Samba'      },
  { label: 'Firewall', icon: '🛡', color: C.orange,  screen: 'Firewall'   },
  { label: 'Install',  icon: '📦', color: C.green,  screen: 'Install'    },
];

export default function DashboardScreen() {
  const nav = useNavigation<any>();
  const { servers, activeServerId } = useStore();
  const server = servers.find(s => s.id === activeServerId);
  const [refreshing, setRefreshing] = useState(false);
  const [cpu, setCpu] = useState(34);

  useEffect(() => {
    const i = setInterval(() => setCpu(v => Math.max(5, Math.min(95, v + (Math.random() > 0.5 ? 3 : -3)))), 2000);
    return () => clearInterval(i);
  }, []);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      {/* TopBar */}
      <View style={s.bar}>
        <TouchableOpacity style={s.menuBtn} onPress={() => nav.dispatch(DrawerActions.openDrawer())}>
          <View style={{ gap: 4 }}>
            {[0,1,2].map(i => <View key={i} style={s.line} />)}
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={s.serverName} numberOfLines={1}>
            {server ? server.name : 'Niciun server selectat'}
          </Text>
          {server && <Text style={s.serverHost}>{server.host}</Text>}
        </View>
        <View style={[s.dot2, { backgroundColor: server?.status === 'online' ? C.green : C.red }]} />
      </View>

      <ScrollView contentContainerStyle={s.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => setRefreshing(false), 1200);
        }} tintColor={C.accent} />}>

        <Text style={s.pageTitle}>Dashboard</Text>

        {/* Server card */}
        <View style={s.card}>
          <Text style={s.sectionLabel}>SERVER ACTIV</Text>
          <Text style={s.bigText}>{server?.name || 'Adaugă un server'}</Text>
          <Text style={s.subText}>{server ? `${server.username}@${server.host}` : 'Mergi la Servere din meniu'}</Text>
          <View style={s.statsRow}>
            {[
              { l: 'CPU',    v: `${cpu}%`,  c: C.accent  },
              { l: 'TEMP',   v: '61°C',     c: C.yellow  },
              { l: 'RAM',    v: '65%',      c: C.purple  },
              { l: 'DISK',   v: '61%',      c: C.green   },
            ].map(item => (
              <View key={item.l}>
                <Text style={s.statL}>{item.l}</Text>
                <Text style={[s.statV, { color: item.c }]}>{item.v}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick actions */}
        <View style={s.card}>
          <Text style={s.sectionLabel}>ACȚIUNI RAPIDE</Text>
          <View style={s.grid}>
            {QUICK.map(q => (
              <TouchableOpacity key={q.label} style={s.qBtn}
                onPress={() => nav.navigate(q.screen)}>
                <Text style={{ fontSize: 22 }}>{q.icon}</Text>
                <Text style={[s.qLabel, { color: q.color }]}>{q.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Detected panels */}
        <View style={s.card}>
          <Text style={s.sectionLabel}>PANELE DETECTATE</Text>
          {DETECTED.map((p, i) => (
            <View key={p.name} style={[s.panelRow, i < DETECTED.length - 1 && s.panelBorder]}>
              <Text style={{ fontSize: 20 }}>{p.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.panelName}>{p.name}</Text>
                <Text style={s.panelPort}>:{p.port}</Text>
              </View>
              <TouchableOpacity style={[s.openBtn, { borderColor: p.color + '50', backgroundColor: p.color + '18' }]}>
                <Text style={[s.openText, { color: p.color }]}>DESCHIDE →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: C.bg },
  bar:         { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 14,
                 backgroundColor: C.surface, borderBottomWidth: 1, borderBottomColor: C.border },
  menuBtn:     { width: 36, height: 36, backgroundColor: C.surfaceHigh, borderWidth: 1,
                 borderColor: C.border, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  line:        { width: 14, height: 1.5, backgroundColor: C.textSub, borderRadius: 1 },
  serverName:  { fontSize: 13, fontWeight: '600', color: C.text },
  serverHost:  { fontSize: 9, color: C.textMuted },
  dot2:        { width: 8, height: 8, borderRadius: 4 },
  content:     { padding: 14, paddingBottom: 100, gap: 12 },
  pageTitle:   { fontSize: 24, fontWeight: '800', color: C.text, letterSpacing: -0.5 },
  card:        { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 16, padding: 14 },
  sectionLabel:{ fontSize: 9, color: C.textMuted, letterSpacing: 1.2, marginBottom: 8 },
  bigText:     { fontSize: 16, fontWeight: '700', color: C.text, marginBottom: 2 },
  subText:     { fontSize: 10, color: C.textMuted, marginBottom: 10 },
  statsRow:    { flexDirection: 'row', gap: 20, marginTop: 4 },
  statL:       { fontSize: 8, color: C.textMuted },
  statV:       { fontSize: 13, fontWeight: '700' },
  grid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  qBtn:        { flex: 1, minWidth: '30%', alignItems: 'center', gap: 5, padding: 12,
                 backgroundColor: C.bg, borderWidth: 1, borderColor: C.border, borderRadius: 10 },
  qLabel:      { fontSize: 9 },
  panelRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  panelBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  panelName:   { fontSize: 13, fontWeight: '600', color: C.text },
  panelPort:   { fontSize: 9, color: C.textMuted },
  openBtn:     { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, borderWidth: 1 },
  openText:    { fontSize: 9, fontWeight: '700' },
});

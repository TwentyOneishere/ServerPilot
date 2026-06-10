import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../store';

const C = {
  surface: '#111318', surfaceHigh: '#191D25', border: '#1E2330',
  accent: '#00D4FF', green: '#00E57A', red: '#FF4560',
  text: '#E8EBF2', textSub: '#7A8399', textMuted: '#4A5168',
};

export default function TopBar({ onMenu }: { onMenu: () => void }) {
  const { servers, activeServerId, alerts } = useStore();
  const server = servers.find(s => s.id === activeServerId);
  const unread = alerts.filter(a => !a.read).length;

  return (
    <View style={s.bar}>
      <TouchableOpacity style={s.menuBtn} onPress={onMenu}>
        <View style={{ gap: 4 }}>
          {[0,1,2].map(i => <View key={i} style={s.line} />)}
        </View>
      </TouchableOpacity>
      <View style={s.mid}>
        <View style={s.row}>
          <View style={[s.dot, { backgroundColor: server?.status === 'online' ? C.green : C.red }]} />
          <Text style={s.name} numberOfLines={1}>{server?.name || 'Niciun server'}</Text>
        </View>
        {server && <Text style={s.host}>{server.host}</Text>}
      </View>
      <TouchableOpacity style={s.iconBtn}>
        <Text style={{ fontSize: 16 }}>🔔</Text>
        {unread > 0 && (
          <View style={s.badge}>
            <Text style={s.badgeT}>{unread > 9 ? '9+' : unread}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  bar:    { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 14,
            backgroundColor: C.surface, borderBottomWidth: 1, borderBottomColor: C.border },
  menuBtn:{ width: 36, height: 36, backgroundColor: C.surfaceHigh, borderWidth: 1,
            borderColor: C.border, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  line:   { width: 14, height: 1.5, backgroundColor: C.textSub, borderRadius: 1 },
  mid:    { flex: 1, marginHorizontal: 10 },
  row:    { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot:    { width: 7, height: 7, borderRadius: 3.5 },
  name:   { fontSize: 13, fontWeight: '600', color: C.text, flex: 1 },
  host:   { fontSize: 9, color: C.textMuted },
  iconBtn:{ width: 36, height: 36, backgroundColor: C.surfaceHigh, borderWidth: 1,
            borderColor: C.border, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  badge:  { position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16,
            backgroundColor: C.red, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
            borderWidth: 1.5, borderColor: C.surface, paddingHorizontal: 2 },
  badgeT: { fontSize: 8, color: '#fff', fontWeight: '700' },
});

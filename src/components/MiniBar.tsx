import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props { label: string; used: number; total: number; unit: string; color: string; }

export default function MiniBar({ label, used, total, unit, color }: Props) {
  const pct = Math.round((used / total) * 100);
  return (
    <View style={{ marginBottom: 8 }}>
      <View style={s.row}>
        <Text style={s.label}>{label}</Text>
        <Text style={s.val}>{used}{unit} / {total}{unit} <Text style={s.pct}>({pct}%)</Text></Text>
      </View>
      <View style={s.track}>
        <View style={[s.fill, { width: `${pct}%` as any, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  label: { fontSize: 10, color: '#7A8399' },
  val:   { fontSize: 10, color: '#E8EBF2' },
  pct:   { color: '#4A5168' },
  track: { height: 3, backgroundColor: '#1E2330', borderRadius: 2 },
  fill:  { height: '100%', borderRadius: 2 },
});

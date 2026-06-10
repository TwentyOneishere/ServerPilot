import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props { value: number; color: string; label: string; sub: string; size?: number; }

export default function ArcGauge({ value, color, label, sub, size = 86 }: Props) {
  const tc = value > 85 ? '#FF4560' : value > 65 ? '#FFB800' : color;
  return (
    <View style={[s.container, { width: size }]}>
      <View style={[s.circle, { width: size - 10, height: size - 10, borderColor: tc,
        borderWidth: 4, borderRadius: (size - 10) / 2 }]}>
        <Text style={[s.val, { color: tc }]}>{value}</Text>
        <Text style={s.sub}>{sub}</Text>
      </View>
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'center' },
  circle:    { alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  val:       { fontSize: 16, fontWeight: '700' },
  sub:       { fontSize: 8, color: '#4A5168' },
  label:     { fontSize: 9, color: '#7A8399' },
});

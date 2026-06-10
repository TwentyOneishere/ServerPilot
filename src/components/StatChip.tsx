import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props { label: string; value: string; color?: string; }

export default function StatChip({ label, value, color = '#00D4FF' }: Props) {
  return (
    <View style={s.chip}>
      <Text style={s.label}>{label}</Text>
      <Text style={[s.value, { color }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  chip:  { backgroundColor: '#0A0C10', borderWidth: 1, borderColor: '#1E2330',
           borderRadius: 8, padding: 8, alignItems: 'center', flex: 1 },
  label: { fontSize: 8, color: '#4A5168', marginBottom: 2 },
  value: { fontSize: 12, fontWeight: '700' },
});

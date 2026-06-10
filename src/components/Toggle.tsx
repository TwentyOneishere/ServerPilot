import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props { value: boolean; onChange: (v: boolean) => void; color?: string; }

export default function Toggle({ value, onChange, color = '#00D4FF' }: Props) {
  return (
    <TouchableOpacity onPress={() => onChange(!value)} activeOpacity={0.8}
      style={[s.track, { backgroundColor: value ? color : '#1E2330' }]}>
      <View style={[s.thumb, { marginLeft: value ? 20 : 3 }]} />
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  track: { width: 42, height: 23, borderRadius: 12, justifyContent: 'center', paddingVertical: 3 },
  thumb: { width: 17, height: 17, borderRadius: 8.5, backgroundColor: '#fff' },
});

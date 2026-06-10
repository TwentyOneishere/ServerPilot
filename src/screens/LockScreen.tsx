import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, Vibration, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store';

const Colors = {
  bg: '#0A0C10', surface: '#111318', border: '#1E2330',
  accent: '#00D4FF', accentDim: '#0094B3', text: '#E8EBF2',
  textSub: '#7A8399', textMuted: '#4A5168', red: '#FF4560',
};

const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

export default function LockScreen() {
  const { settings, setLocked } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const shakeAnim = new Animated.Value(0);

  const shake = () => {
    Vibration.vibrate(200);
    setError(true);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10,  duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8,   duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8,  duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0,   duration: 60, useNativeDriver: true }),
    ]).start(() => { setPin(''); setError(false); });
  };

  const handleKey = useCallback((k: string) => {
    if (k === '⌫') { setPin(p => p.slice(0, -1)); return; }
    const next = pin + k;
    setPin(next);
    if (next.length === 4) {
      if (next === settings.pin) {
        Vibration.vibrate(50);
        setTimeout(() => setLocked(false), 100);
      } else {
        shake();
      }
    }
  }, [pin, settings.pin]);

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <Text style={s.appName}>ServerPilot</Text>
      <Text style={s.subtitle}>Introdu PIN pentru acces</Text>
      <Animated.View style={[s.dots, { transform: [{ translateX: shakeAnim }] }]}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[s.dot, {
            backgroundColor: i < pin.length ? (error ? Colors.red : Colors.accent) : 'transparent',
            borderColor: i < pin.length ? (error ? Colors.red : Colors.accent) : Colors.border,
          }]} />
        ))}
      </Animated.View>
      <View style={s.numpad}>
        {KEYS.map((k, i) => (
          <TouchableOpacity key={i} style={[s.key, !k && s.keyEmpty]}
            onPress={() => k && handleKey(k)} disabled={!k} activeOpacity={0.6}>
            {k ? <Text style={[s.keyText, k === '⌫' && s.keyBack]}>{k}</Text> : null}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={s.hint}>PIN demo: 1234</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', gap: 28 },
  appName:   { fontSize: 36, fontWeight: '900', color: Colors.accent, letterSpacing: -1 },
  subtitle:  { fontSize: 12, color: Colors.textMuted, marginTop: -16 },
  dots:      { flexDirection: 'row', gap: 18 },
  dot:       { width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  numpad:    { flexDirection: 'row', flexWrap: 'wrap', width: 240, gap: 12, justifyContent: 'center' },
  key:       { width: 72, height: 72, borderRadius: 16, backgroundColor: Colors.surface,
               borderWidth: 1, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  keyEmpty:  { backgroundColor: 'transparent', borderColor: 'transparent' },
  keyText:   { fontSize: 26, fontWeight: '600', color: Colors.text },
  keyBack:   { fontSize: 20, color: Colors.textSub },
  hint:      { fontSize: 10, color: Colors.textMuted },
});

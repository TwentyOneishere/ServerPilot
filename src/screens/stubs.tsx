import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
  bg: '#0A0C10', surface: '#111318', border: '#1E2330',
  accent: '#00D4FF', accentDim: '#0094B3', text: '#E8EBF2',
  textSub: '#7A8399', textMuted: '#4A5168',
};

function StubScreen({ title, icon, features }: { title: string; icon: string; features: string[] }) {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>{icon} {title}</Text>
        <View style={s.card}>
          <Text style={s.label}>FUNCȚIONALITĂȚI</Text>
          {features.map((f, i) => (
            <View key={i} style={[s.row, i === features.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={s.dot} />
              <Text style={s.feat}>{f}</Text>
            </View>
          ))}
        </View>
        <View style={s.note}>
          <Text style={s.noteText}>
            Conectează un server SSH pentru a activa funcțiile live.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function MonitorScreen()     { return <StubScreen title="Monitoring" icon="📊" features={["CPU/Temp/RAM/Disk live","Grafice 60s animate","SMART disk health","Temperaturi per core","Top procese RAM"]} />; }
export function TerminalScreen()    { return <StubScreen title="Terminal SSH" icon="⌨" features={["Multi-sesiuni simultane","Autocomplete Tab","Istoric comenzi","Comenzi rapide","Ctrl+C / Ctrl+L"]} />; }
export function DockerScreen()      { return <StubScreen title="Docker Manager" icon="🐳" features={["Containere cu status live","Stop/Start/Restart","Logs live","Stats CPU/RAM","Compose editor YAML"]} />; }
export function ProcessScreen()     { return <StubScreen title="Procese" icon="⚙" features={["Lista procese","Kill/SIGSTOP","Renice slider","Căutare PID","Sortare CPU/MEM"]} />; }
export function FileScreen()        { return <StubScreen title="File Manager" icon="📁" features={["Navigare directoare","chmod vizual","Toggle hidden","Grid/List view","Download/Arhivare"]} />; }
export function SambaScreen()       { return <StubScreen title="Samba Manager" icon="🗂" features={["Add/delete shares","Permisiuni per user","smb.conf preview","Toggle guest/writable","Schimbare parolă"]} />; }
export function DiskScreen()        { return <StubScreen title="Disk & SMART" icon="💾" features={["Discuri detectate","SMART health","Temperaturi disk","Read/Write I/O","Benchmark dd"]} />; }
export function BackupScreen()      { return <StubScreen title="Backup" icon="📦" features={["Scheduler cron","Compresie tar.gz","Remote sync","Logs rulări","Notificare erori"]} />; }
export function NetworkScreen()     { return <StubScreen title="Rețea & IP" icon="🌐" features={["Interfețe active","Statistici trafic","Top conexiuni","IP/subnet/gateway","Modificare IP"]} />; }
export function PortForwardScreen() { return <StubScreen title="Port Forwarding" icon="🔀" features={["Diagram vizual","Preseturi rapide","Toggle ON/OFF","Preview iptables","TCP/UDP/TCP+UDP"]} />; }
export function FirewallScreen()    { return <StubScreen title="Firewall UFW" icon="🛡" features={["Reguli UFW","ALLOW/DENY/LIMIT","Politici default","Preview ufw","Enable/disable"]} />; }
export function DNSScreen()         { return <StubScreen title="DNS Checker" icon="🔍" features={["DNS lookup A/MX/CNAME","Verificare propagare","PTR reverse","Comparare NS","Export rezultate"]} />; }
export function SpeedtestScreen()   { return <StubScreen title="Speedtest" icon="⚡" features={["Download/Upload/Ping","Grafic istoric","Selecție server","Benchmark disk","Export CSV"]} />; }
export function NginxScreen()       { return <StubScreen title="Nginx / VHosts" icon="🔀" features={["Lista virtual hosts","Add/edit/delete","Enable/disable","Config preview","Test nginx -t"]} />; }
export function SSLScreen()         { return <StubScreen title="SSL Certificates" icon="🔒" features={["Let's Encrypt","Data expirare","Reînnoire certbot","Multi-domenii","Self-signed"]} />; }
export function DatabaseScreen()    { return <StubScreen title="MySQL Manager" icon="🐬" features={["Lista databases","Creare/ștergere DB","Users + GRANT","Query SQL","Export mysqldump"]} />; }
export function ServicesScreen()    { return <StubScreen title="Servicii systemd" icon="🔧" features={["Lista servicii","Start/Stop/Restart","Enable/Disable","Status + logs","Filtrare rapidă"]} />; }
export function CronScreen()        { return <StubScreen title="Cron Jobs" icon="⏰" features={["Lista cron jobs","Editor vizual","Preview next run","Activare/dezactivare","Testare expresie"]} />; }
export function LogsScreen()        { return <StubScreen title="Log Viewer" icon="📋" features={["syslog live","Docker logs","Filtrare WARN/ERR","Căutare în log","Export snapshot"]} />; }
export function InstallScreen()     { return <StubScreen title="Install Center" icon="📦" features={["10 panele","25+ servicii","Progress animat","Detecție instalate","Versiuni selectabile"]} />; }
export function PanelsScreen()      { return <StubScreen title="Panele Detectate" icon="🖥" features={["Auto-detecție","Link direct WebUI","Verificare port","Restart panel","Status online"]} />; }
export function PowerScreen()       { return <StubScreen title="Power Control" icon="⚡" features={["Shutdown confirmat","Restart server","Suspend","Wake-on-LAN","Programare shutdown"]} />; }
export function AlertsScreen()      { return <StubScreen title="Alerturi" icon="🔔" features={["CPU/Temp/Disk/Down","Prag configurabil","Push notifications","Istoric 30 zile","Mark as read"]} />; }
export function ServersScreen()     { return <StubScreen title="Servere" icon="🖥" features={["Adaugă server","SSH key/parolă","Test conexiune","Import/export JSON","Ping history"]} />; }
export function SettingsScreen()    { return <StubScreen title="Setări" icon="⚙" features={["Dark/Light/AMOLED","10 limbi","PIN + biometrie","SSH timeout","Import/Export JSON"]} />; }

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 14, paddingBottom: 100, gap: 14 },
  title:   { fontFamily: 'System', fontSize: 22, color: Colors.text, fontWeight: '800', marginBottom: 4 },
  card:    { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 14, padding: 14 },
  label:   { fontFamily: 'System', fontSize: 9, color: Colors.textMuted, letterSpacing: 1.2, marginBottom: 10 },
  row:     { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.border },
  dot:     { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent },
  feat:    { fontFamily: 'System', fontSize: 11, color: Colors.textSub, flex: 1 },
  note:    { backgroundColor: 'rgba(0,212,255,0.1)', borderWidth: 1, borderColor: 'rgba(0,212,255,0.3)', borderRadius: 12, padding: 14 },
  noteText:{ fontFamily: 'System', fontSize: 11, color: Colors.accentDim, textAlign: 'center', lineHeight: 18 },
});

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import { useStore } from './src/store';
import { Colors } from './src/utils/theme';

import LockScreen        from './src/screens/LockScreen';
import DashboardScreen   from './src/screens/DashboardScreen';
import { MonitorScreen }    from './src/screens/stubs';
import { TerminalScreen }   from './src/screens/stubs';
import { DockerScreen }     from './src/screens/stubs';
import { ProcessScreen }    from './src/screens/stubs';
import { FileScreen }       from './src/screens/stubs';
import { SambaScreen }      from './src/screens/stubs';
import { DiskScreen }       from './src/screens/stubs';
import { BackupScreen }     from './src/screens/stubs';
import { NetworkScreen }    from './src/screens/stubs';
import { PortForwardScreen }from './src/screens/stubs';
import { FirewallScreen }   from './src/screens/stubs';
import { DNSScreen }        from './src/screens/stubs';
import { SpeedtestScreen }  from './src/screens/stubs';
import { NginxScreen }      from './src/screens/stubs';
import { SSLScreen }        from './src/screens/stubs';
import { DatabaseScreen }   from './src/screens/stubs';
import { ServicesScreen }   from './src/screens/stubs';
import { CronScreen }       from './src/screens/stubs';
import { LogsScreen }       from './src/screens/stubs';
import { InstallScreen }    from './src/screens/stubs';
import { PanelsScreen }     from './src/screens/stubs';
import { PowerScreen }      from './src/screens/stubs';
import { AlertsScreen }     from './src/screens/stubs';
import { ServersScreen }    from './src/screens/stubs';
import { SettingsScreen }   from './src/screens/stubs';

import CustomDrawer from './src/components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Tab    = createBottomTabNavigator();

const navTheme = {
  dark: true,
  colors: {
    primary:      Colors.accent,
    background:   Colors.bg,
    card:         Colors.surface,
    text:         Colors.text,
    border:       Colors.border,
    notification: Colors.red,
  },
};

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 20, opacity: color === Colors.accent ? 1 : 0.5 }}>{icon}</Text>;
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor:  Colors.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor:   Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontFamily: 'JetBrainsMono-Regular', fontSize: 9 },
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen}
        options={{ tabBarLabel: 'Home',     tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} /> }} />
      <Tab.Screen name="Monitor"   component={MonitorScreen}
        options={{ tabBarLabel: 'Monitor',  tabBarIcon: ({ color }) => <TabIcon icon="📊" color={color} /> }} />
      <Tab.Screen name="Terminal"  component={TerminalScreen}
        options={{ tabBarLabel: 'Terminal', tabBarIcon: ({ color }) => <TabIcon icon="⌨"  color={color} /> }} />
      <Tab.Screen name="Docker"    component={DockerScreen}
        options={{ tabBarLabel: 'Docker',   tabBarIcon: ({ color }) => <TabIcon icon="🐳" color={color} /> }} />
      <Tab.Screen name="Settings"  component={SettingsScreen}
        options={{ tabBarLabel: 'Setări',   tabBarIcon: ({ color }) => <TabIcon icon="⚙"  color={color} /> }} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle:           { backgroundColor: Colors.surface, width: 280 },
        drawerActiveTintColor: Colors.accent,
        drawerInactiveTintColor: Colors.textSub,
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.6)',
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen name="MainTabs"    component={BottomTabs}        options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="Processes"   component={ProcessScreen}     options={{ title: 'Procese' }} />
      <Drawer.Screen name="Files"       component={FileScreen}        options={{ title: 'File Manager' }} />
      <Drawer.Screen name="Samba"       component={SambaScreen}       options={{ title: 'Samba Manager' }} />
      <Drawer.Screen name="Disk"        component={DiskScreen}        options={{ title: 'Disk & SMART' }} />
      <Drawer.Screen name="Backup"      component={BackupScreen}      options={{ title: 'Backup' }} />
      <Drawer.Screen name="Network"     component={NetworkScreen}     options={{ title: 'Rețea' }} />
      <Drawer.Screen name="PortForward" component={PortForwardScreen} options={{ title: 'Port Forwarding' }} />
      <Drawer.Screen name="Firewall"    component={FirewallScreen}    options={{ title: 'Firewall UFW' }} />
      <Drawer.Screen name="DNS"         component={DNSScreen}         options={{ title: 'DNS Checker' }} />
      <Drawer.Screen name="Speedtest"   component={SpeedtestScreen}   options={{ title: 'Speedtest' }} />
      <Drawer.Screen name="Nginx"       component={NginxScreen}       options={{ title: 'Nginx' }} />
      <Drawer.Screen name="SSL"         component={SSLScreen}         options={{ title: 'SSL' }} />
      <Drawer.Screen name="Database"    component={DatabaseScreen}    options={{ title: 'MySQL' }} />
      <Drawer.Screen name="Services"    component={ServicesScreen}    options={{ title: 'Servicii' }} />
      <Drawer.Screen name="Cron"        component={CronScreen}        options={{ title: 'Cron Jobs' }} />
      <Drawer.Screen name="Logs"        component={LogsScreen}        options={{ title: 'Logs' }} />
      <Drawer.Screen name="Install"     component={InstallScreen}     options={{ title: 'Install Center' }} />
      <Drawer.Screen name="Panels"      component={PanelsScreen}      options={{ title: 'Panele' }} />
      <Drawer.Screen name="Power"       component={PowerScreen}       options={{ title: 'Power' }} />
      <Drawer.Screen name="Alerts"      component={AlertsScreen}      options={{ title: 'Alerturi' }} />
      <Drawer.Screen name="Servers"     component={ServersScreen}     options={{ title: 'Servere' }} />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  const isLocked    = useStore(s => s.isLocked);
  const pinEnabled  = useStore(s => s.settings.pinEnabled);
  if (isLocked && pinEnabled) return <LockScreen />;
  return <MainDrawer />;
}

export default function App() {
  const hydrate = useStore(s => s.hydrate);
  useEffect(() => { hydrate(); }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
        <NavigationContainer theme={navTheme}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

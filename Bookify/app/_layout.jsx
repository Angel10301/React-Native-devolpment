import React from 'react'; // React and react native core imports.
import { Platform } from 'react-native';
import { Tabs } from 'expo-router'; // Expo Router for navigation setup.
import { HapticTab } from '@/components/HapticTab'; // Custom components and utilities imported from project structure.
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'; // Theme management for navigation.
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';

// This file sets up the root layout for the Bookify app with tab navigation
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        {/* Define only the intended tabs, excluding +not-found */}
        <Tabs.Screen
          name="BookShelf"
          options={{
            title: 'BookShelf',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="library" color={color} />,
          }}
        />
        <Tabs.Screen
          name="pdfupload"
          options={{
            title: 'Upload',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="cloud-upload" color={color} />,
          }}
        />
        <Tabs.Screen
          name="+not-found"
          options={{
            tabBarItemStyle: { display: 'none' }, // Hides the tab from the bar
          }}
/>
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
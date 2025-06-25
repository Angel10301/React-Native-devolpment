// React and react native core imports.
import React from 'react';
import { Platform } from 'react-native';

// Expo Router for tab navigation setup.
import { Tabs } from 'expo-router';

// Custom componetns and utilities imported from project structure.
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

// Constants and hooks for theming/styling.
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Tablayout manages global tab settings, tab bar apperance, and individual screen options.
export default function TabLayout() {
  const colorScheme = useColorScheme(); // Reads system preference or user-selected theme.

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false, // Hide header by defualt.
        tabBarButton: HapticTab, // Use custom HapticTab for haptic feedback on presses.
        tabBarBackground: TabBarBackground, // Apply a custom background component (e.g., for blur).
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect.
            position: 'absolute',
          },
          default: {},
        }),
      }}>

      {/*
        Define individual tab screens. The 'name' prop maps to the file name
        in the 'tabs' directory (e.g., BookShelf.jsx).
      */}
      <Tabs.Screen
        name="BookShelf"
        options={{
          title: 'BookShelf',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pdfupload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

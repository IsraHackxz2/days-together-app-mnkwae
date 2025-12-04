
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import React from 'react';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      route: '/(home)',
      label: 'Home',
      icon: 'heart.fill',
      color: colors.text,
    },
    {
      route: '/games',
      label: 'Games',
      icon: 'gamecontroller.fill',
      color: colors.text,
    },
    {
      route: '/calendar',
      label: 'Calendar',
      icon: 'calendar',
      color: colors.text,
    },
    {
      route: '/profile',
      label: 'About',
      icon: 'info.circle.fill',
      color: colors.text,
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Screen
          name="(home)"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Icon name="heart.fill" color={color} />,
            tabBarLabel: ({ color }) => <Label color={color}>Home</Label>,
          }}
        />
        <NativeTabs.Screen
          name="games"
          options={{
            title: 'Games',
            tabBarIcon: ({ color }) => <Icon name="gamecontroller.fill" color={color} />,
            tabBarLabel: ({ color }) => <Label color={color}>Games</Label>,
          }}
        />
        <NativeTabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color }) => <Icon name="calendar" color={color} />,
            tabBarLabel: ({ color }) => <Label color={color}>Calendar</Label>,
          }}
        />
        <NativeTabs.Screen
          name="profile"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <Icon name="info.circle.fill" color={color} />,
            tabBarLabel: ({ color }) => <Label color={color}>About</Label>,
          }}
        />
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="games" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}

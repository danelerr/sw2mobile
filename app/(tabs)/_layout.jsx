import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#FF6DC6', 
      tabBarInactiveTintColor: '#FFFFFF',
      tabBarStyle: { backgroundColor: '#000000' }, 
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Generar',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          headerShown: false,
          title: 'Videos',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="video-camera" color={color} />,
        }}
      />
    </Tabs>
  );
}
import React from 'react';
import { View } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function EmailScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Email Screen</Text>
      <FAB
        icon="plus"
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        onPress={() => router.push('/compose-email')}
      />
    </View>
  );
}
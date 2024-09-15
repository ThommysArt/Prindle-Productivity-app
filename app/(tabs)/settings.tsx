import React from 'react';
import { View, ScrollView } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          right={() => <Switch value={darkMode} onValueChange={setDarkMode} />}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Sign Out"
          left={props => <List.Icon {...props} icon="logout" />}
          onPress={handleSignOut}
        />
      </List.Section>
    </ScrollView>
  );
}
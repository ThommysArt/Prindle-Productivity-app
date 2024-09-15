import React from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ComposeEmailScreen() {
  const router = useRouter();
  const [to, setTo] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');

  const handleSend = () => {
    // Implement email sending logic here
    console.log('Sending email:', { to, subject, body });
    router.back();
  };

  return (
    <View className="flex-1 p-4">
      <TextInput
        label="To"
        value={to}
        onChangeText={setTo}
        className="mb-4"
      />
      <TextInput
        label="Subject"
        value={subject}
        onChangeText={setSubject}
        className="mb-4"
      />
      <TextInput
        label="Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={10}
        className="mb-4"
      />
      <Button mode="contained" onPress={handleSend}>
        Send
      </Button>
    </View>
  );
}
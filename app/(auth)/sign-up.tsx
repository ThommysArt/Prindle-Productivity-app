import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import SignInWithOAuth from '@/components/SignInWithOAuth';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const theme = useTheme();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  

  const onSignUpPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  const onPressVerify = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, code]);


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      {!pendingVerification ? (
        <>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button mode="contained" onPress={onSignUpPress} style={styles.button}>
            Sign Up
          </Button>
          <SignInWithOAuth />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Verification Code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <Button mode="contained" onPress={onPressVerify} style={styles.button}>
            Verify Email
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
});
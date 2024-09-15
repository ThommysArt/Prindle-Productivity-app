import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  useWarmUpBrowser()
  const router = useRouter()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google", redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }), });
  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({ strategy: "oauth_apple", redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }), });
  const { startOAuthFlow: startGitHubOAuthFlow } = useOAuth({ strategy: "oauth_github", redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }), });

  const onOAuthPress = React.useCallback(async (startOAuthFlow: () => Promise<any>) => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <>
        <Button mode="outlined" onPress={() => onOAuthPress(startGoogleOAuthFlow)}>
            Sign up with Google
        </Button>
        <Button mode="outlined" onPress={() => onOAuthPress(startAppleOAuthFlow)}>
            Sign up with Apple
        </Button>
        <Button mode="outlined" onPress={() => onOAuthPress(startGitHubOAuthFlow)}>
            Sign up with GitHub
        </Button>
    </>
  )
}
export default SignInWithOAuth
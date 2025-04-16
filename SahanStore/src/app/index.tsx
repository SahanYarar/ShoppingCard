import { Redirect } from 'expo-router';

export default function Index() {
  // Check if user is authenticated
  if (global.token) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/(auth)/login" />;
} 
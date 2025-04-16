import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { useRouter } from 'expo-router';
import { API_URL } from '../../config';
import { theme } from '../../theme/theme';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Attempting login with:', { email });
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', { status: response.status, data });

      if (!response.ok) {
        console.log('Login failed with status:', response.status);
        Alert.alert(
          'Error',
          data.message || 'Invalid email or password',
          [{ text: 'OK' }],
          { cancelable: true }
        );
        return;
      }

      // Store the token and user data
      global.token = data.token;
      await login({
        id: data.user.uid,
        email: data.user.email,
        name: data.user.name,
      });

      // Navigate to home screen
      router.replace('/');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error',
        'Invalid email or password',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push('/register')}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.text.light,
    padding: 8,
    fontSize: theme.typography.fontSize.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.text.primary,
    height: 35,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.sm,
  },
}); 
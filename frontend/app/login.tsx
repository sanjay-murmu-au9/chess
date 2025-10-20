import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>♟️</Text>
          <Text style={styles.title}>Chess Master</Text>
          <Text style={styles.subtitle}>Play chess against AI and players worldwide</Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Ionicons name="trophy" size={24} color="#7B61FF" />
            <Text style={styles.featureText}>Track your wins & stats</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="timer" size={24} color="#7B61FF" />
            <Text style={styles.featureText}>10-minute time control</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="people" size={24} color="#7B61FF" />
            <Text style={styles.featureText}>Play against AI</Text>
          </View>
        </View>

        <View style={styles.authContainer}>
          <TouchableOpacity style={styles.googleButton} onPress={login}>
            <View style={styles.googleButtonContent}>
              <Image
                source={{ uri: 'https://www.google.com/favicon.ico' }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.privacyText}>
            By signing in, you agree to our{' '}
            <Text 
              style={styles.privacyLink}
              onPress={() => router.push('/terms')}
            >
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text 
              style={styles.privacyLink}
              onPress={() => router.push('/privacy')}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginTop: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  authContainer: {
    marginBottom: 40,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  privacyText: {
    fontSize: 12,
    color: '#a0a0a0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

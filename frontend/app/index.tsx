import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Check if profile is complete
        if (!user.profile_complete) {
          router.replace('/onboarding');
        } else {
          router.replace('/game');
        }
      } else {
        // User not logged in, redirect to login
        router.replace('/login');
      }
    }
  }, [user, loading]);

  // Show loading screen while checking auth
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>♟️</Text>
        <ActivityIndicator size="large" color="#7B61FF" />
        <Text style={styles.text}>Loading Chess Master...</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#a0a0a0',
  },
});
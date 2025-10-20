import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DataDeletionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Deletion</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="trash-outline" size={60} color="#e74c3c" />
        </View>

        <Text style={styles.title}>Account & Data Deletion</Text>
        <Text style={styles.subtitle}>
          You have full control over your data. Follow these instructions to permanently delete your account and all associated data.
        </Text>

        <Text style={styles.sectionTitle}>What Gets Deleted:</Text>
        <Text style={styles.bulletPoint}>✓ Your profile information (name, email, picture)</Text>
        <Text style={styles.bulletPoint}>✓ Age and country information</Text>
        <Text style={styles.bulletPoint}>✓ Game history and statistics</Text>
        <Text style={styles.bulletPoint}>✓ All session data</Text>
        <Text style={styles.bulletPoint}>✓ Any other personal data we store</Text>

        <Text style={styles.sectionTitle}>Deletion Methods:</Text>

        <View style={styles.methodCard}>
          <Text style={styles.methodTitle}>Method 1: In-App Deletion</Text>
          <Text style={styles.methodStep}>1. Open Chess Master app</Text>
          <Text style={styles.methodStep}>2. Go to Profile (tap your picture)</Text>
          <Text style={styles.methodStep}>3. Scroll to bottom</Text>
          <Text style={styles.methodStep}>4. Tap "Delete Account"</Text>
          <Text style={styles.methodStep}>5. Confirm deletion</Text>
          <Text style={styles.methodNote}>⏱️ Instant deletion</Text>
        </View>

        <View style={styles.methodCard}>
          <Text style={styles.methodTitle}>Method 2: Email Request</Text>
          <Text style={styles.methodStep}>Send email to: support@chessmaster.app</Text>
          <Text style={styles.methodStep}>Subject: "Delete My Account"</Text>
          <Text style={styles.methodStep}>Include: Your registered email address</Text>
          <Text style={styles.methodNote}>⏱️ Processed within 48 hours</Text>
        </View>

        <View style={styles.methodCard}>
          <Text style={styles.methodTitle}>Method 3: Help Center</Text>
          <Text style={styles.methodStep}>1. Go to Settings → Help & Support</Text>
          <Text style={styles.methodStep}>2. Click "Request Data Deletion"</Text>
          <Text style={styles.methodStep}>3. Fill out the form</Text>
          <Text style={styles.methodStep}>4. Submit request</Text>
          <Text style={styles.methodNote}>⏱️ Processed within 48 hours</Text>
        </View>

        <Text style={styles.sectionTitle}>Important Notes:</Text>
        <Text style={styles.warningText}>⚠️ Deletion is PERMANENT and IRREVERSIBLE</Text>
        <Text style={styles.warningText}>⚠️ You cannot recover your account after deletion</Text>
        <Text style={styles.warningText}>⚠️ All game statistics will be lost forever</Text>
        <Text style={styles.warningText}>⚠️ You can create a new account anytime</Text>

        <Text style={styles.sectionTitle}>What Happens After Deletion:</Text>
        <Text style={styles.bulletPoint}>• Your account is immediately deactivated</Text>
        <Text style={styles.bulletPoint}>• All data is permanently deleted within 30 days</Text>
        <Text style={styles.bulletPoint}>• You will receive a confirmation email</Text>
        <Text style={styles.bulletPoint}>• No data remains in our systems after 30 days</Text>

        <Text style={styles.sectionTitle}>Data Retention (Legal):</Text>
        <Text style={styles.paragraph}>
          Some data may be retained for up to 30 days for:
        </Text>
        <Text style={styles.bulletPoint}>• Legal compliance requirements</Text>
        <Text style={styles.bulletPoint}>• Fraud prevention</Text>
        <Text style={styles.bulletPoint}>• Resolving disputes</Text>
        <Text style={styles.paragraph}>
          After 30 days, ALL data is completely removed from our servers.
        </Text>

        <Text style={styles.sectionTitle}>Questions?</Text>
        <Text style={styles.paragraph}>
          Contact us at: support@chessmaster.app
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Chess Master © 2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4e',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B61FF',
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#c0c0c0',
    lineHeight: 24,
    marginLeft: 8,
  },
  methodCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B61FF',
    marginBottom: 12,
  },
  methodStep: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 22,
    marginLeft: 8,
  },
  methodNote: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 8,
    fontStyle: 'italic',
  },
  warningText: {
    fontSize: 14,
    color: '#e74c3c',
    lineHeight: 24,
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});
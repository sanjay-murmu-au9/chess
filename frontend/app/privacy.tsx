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

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.lastUpdated}>Last Updated: October 20, 2025</Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          When you use Chess Master, we collect the following information:
        </Text>
        <Text style={styles.bulletPoint}>• Name and email address (via Google Sign-In)</Text>
        <Text style={styles.bulletPoint}>• Profile picture (via Google Sign-In)</Text>
        <Text style={styles.bulletPoint}>• Age and country (provided during registration)</Text>
        <Text style={styles.bulletPoint}>• Game statistics (wins, losses, draws)</Text>
        <Text style={styles.bulletPoint}>• Device information and usage data</Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the collected information to:
        </Text>
        <Text style={styles.bulletPoint}>• Provide and maintain our chess gaming service</Text>
        <Text style={styles.bulletPoint}>• Authenticate your identity</Text>
        <Text style={styles.bulletPoint}>• Track your game progress and statistics</Text>
        <Text style={styles.bulletPoint}>• Improve our app and user experience</Text>
        <Text style={styles.bulletPoint}>• Send important updates about the service</Text>

        <Text style={styles.sectionTitle}>3. Data Sharing and Third Parties</Text>
        <Text style={styles.paragraph}>
          We do NOT sell your personal information. We may share data with:
        </Text>
        <Text style={styles.bulletPoint}>• Google (for authentication purposes only)</Text>
        <Text style={styles.bulletPoint}>• Cloud service providers (MongoDB, hosting)</Text>
        <Text style={styles.bulletPoint}>• Analytics services (anonymous usage data)</Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement industry-standard security measures including:
        </Text>
        <Text style={styles.bulletPoint}>• Encrypted data transmission (HTTPS/SSL)</Text>
        <Text style={styles.bulletPoint}>• Secure session management</Text>
        <Text style={styles.bulletPoint}>• Regular security audits</Text>
        <Text style={styles.bulletPoint}>• Limited access to personal data</Text>

        <Text style={styles.sectionTitle}>5. Your Rights (GDPR Compliance)</Text>
        <Text style={styles.paragraph}>You have the right to:</Text>
        <Text style={styles.bulletPoint}>• Access your personal data</Text>
        <Text style={styles.bulletPoint}>• Request data correction or deletion</Text>
        <Text style={styles.bulletPoint}>• Withdraw consent at any time</Text>
        <Text style={styles.bulletPoint}>• Export your data</Text>
        <Text style={styles.bulletPoint}>• Lodge a complaint with authorities</Text>

        <Text style={styles.sectionTitle}>6. Children's Privacy (COPPA)</Text>
        <Text style={styles.paragraph}>
          Our service is intended for users aged 13 and above. We do not knowingly collect data from children under 13. If you believe we have collected data from a child under 13, please contact us immediately.
        </Text>

        <Text style={styles.sectionTitle}>7. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your data for as long as your account is active. You can request deletion at any time through the app settings or by contacting support.
        </Text>

        <Text style={styles.sectionTitle}>8. Cookies and Tracking</Text>
        <Text style={styles.paragraph}>
          We use session cookies for authentication. We do not use tracking cookies for advertising purposes.
        </Text>

        <Text style={styles.sectionTitle}>9. Changes to Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this policy from time to time. Users will be notified of significant changes via email or in-app notification.
        </Text>

        <Text style={styles.sectionTitle}>10. Contact Us</Text>
        <Text style={styles.paragraph}>
          For privacy-related questions or data deletion requests:
        </Text>
        <Text style={styles.bulletPoint}>• Email: privacy@chessmaster.app</Text>
        <Text style={styles.bulletPoint}>• In-app: Settings → Help & Support</Text>

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
  lastUpdated: {
    fontSize: 12,
    color: '#a0a0a0',
    fontStyle: 'italic',
    marginBottom: 20,
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
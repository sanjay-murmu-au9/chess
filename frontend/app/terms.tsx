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

export default function TermsOfServiceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.lastUpdated}>Last Updated: October 20, 2025</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By downloading, installing, or using Chess Master, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.paragraph}>
          You must be at least 13 years old to use this app. By using Chess Master, you represent that you meet this age requirement.
        </Text>

        <Text style={styles.sectionTitle}>3. Account Registration</Text>
        <Text style={styles.paragraph}>
          To use certain features, you must:
        </Text>
        <Text style={styles.bulletPoint}>• Create an account using Google Sign-In</Text>
        <Text style={styles.bulletPoint}>• Provide accurate and complete information</Text>
        <Text style={styles.bulletPoint}>• Maintain the security of your account</Text>
        <Text style={styles.bulletPoint}>• Notify us of any unauthorized access</Text>

        <Text style={styles.sectionTitle}>4. Acceptable Use</Text>
        <Text style={styles.paragraph}>You agree NOT to:</Text>
        <Text style={styles.bulletPoint}>• Cheat or use unauthorized software/bots</Text>
        <Text style={styles.bulletPoint}>• Harass, abuse, or harm other users</Text>
        <Text style={styles.bulletPoint}>• Attempt to hack or disrupt the service</Text>
        <Text style={styles.bulletPoint}>• Share your account credentials</Text>
        <Text style={styles.bulletPoint}>• Reverse engineer the app</Text>
        <Text style={styles.bulletPoint}>• Use the app for illegal purposes</Text>

        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content, features, and functionality of Chess Master, including but not limited to software, design, graphics, and logos, are owned by us and protected by copyright and trademark laws.
        </Text>

        <Text style={styles.sectionTitle}>6. Game Rules and Fair Play</Text>
        <Text style={styles.paragraph}>
          Chess Master follows standard chess rules (FIDE). We reserve the right to:
        </Text>
        <Text style={styles.bulletPoint}>• Monitor games for cheating</Text>
        <Text style={styles.bulletPoint}>• Suspend or ban accounts violating fair play</Text>
        <Text style={styles.bulletPoint}>• Adjust game statistics if cheating is detected</Text>

        <Text style={styles.sectionTitle}>7. In-App Purchases (Future)</Text>
        <Text style={styles.paragraph}>
          Currently, Chess Master is free to use. If we introduce paid features:
        </Text>
        <Text style={styles.bulletPoint}>• All purchases are final and non-refundable</Text>
        <Text style={styles.bulletPoint}>• Prices are subject to change</Text>
        <Text style={styles.bulletPoint}>• Subscription terms will be clearly stated</Text>

        <Text style={styles.sectionTitle}>8. Service Availability</Text>
        <Text style={styles.paragraph}>
          We strive for 99.9% uptime but do not guarantee uninterrupted service. We may:
        </Text>
        <Text style={styles.bulletPoint}>• Perform maintenance without notice</Text>
        <Text style={styles.bulletPoint}>• Modify or discontinue features</Text>
        <Text style={styles.bulletPoint}>• Suspend service for technical issues</Text>

        <Text style={styles.sectionTitle}>9. User Content and Data</Text>
        <Text style={styles.paragraph}>
          Your game data and statistics remain yours. By using the app, you grant us the right to use anonymous, aggregated data for analytics and improvements.
        </Text>

        <Text style={styles.sectionTitle}>10. Account Termination</Text>
        <Text style={styles.paragraph}>
          We reserve the right to suspend or terminate accounts that:
        </Text>
        <Text style={styles.bulletPoint}>• Violate these Terms of Service</Text>
        <Text style={styles.bulletPoint}>• Engage in fraudulent activity</Text>
        <Text style={styles.bulletPoint}>• Remain inactive for extended periods</Text>
        <Text style={styles.paragraph}>
          You may delete your account at any time from Settings.
        </Text>

        <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Chess Master is provided "as is" without warranties. We are not liable for:
        </Text>
        <Text style={styles.bulletPoint}>• Data loss or corruption</Text>
        <Text style={styles.bulletPoint}>• Service interruptions</Text>
        <Text style={styles.bulletPoint}>• Third-party actions</Text>
        <Text style={styles.bulletPoint}>• Damages arising from app use</Text>

        <Text style={styles.sectionTitle}>12. Dispute Resolution</Text>
        <Text style={styles.paragraph}>
          Any disputes will be resolved through:
        </Text>
        <Text style={styles.bulletPoint}>• Good faith negotiation first</Text>
        <Text style={styles.bulletPoint}>• Binding arbitration if needed</Text>
        <Text style={styles.bulletPoint}>• Governed by laws of [Your Country]</Text>

        <Text style={styles.sectionTitle}>13. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We may update these Terms at any time. Continued use after changes constitutes acceptance. Major changes will be notified via email or in-app notification.
        </Text>

        <Text style={styles.sectionTitle}>14. Contact Information</Text>
        <Text style={styles.paragraph}>
          For questions about these Terms:
        </Text>
        <Text style={styles.bulletPoint}>• Email: legal@chessmaster.app</Text>
        <Text style={styles.bulletPoint}>• In-app: Settings → Help & Support</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Chess Master © 2025</Text>
          <Text style={styles.footerText}>All Rights Reserved</Text>
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
    marginBottom: 4,
  },
});
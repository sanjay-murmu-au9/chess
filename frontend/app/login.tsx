import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const features = [
    {
      icon: 'trophy-outline',
      title: 'Track Your Progress',
      description: 'Win, losses, and rating - all in one place',
    },
    {
      icon: 'time-outline',
      title: '10-Minute Games',
      description: 'Fast-paced classical time control',
    },
    {
      icon: 'cube-outline',
      title: 'Powerful AI',
      description: 'Play against adaptive AI opponents',
    },
    {
      icon: 'people-outline',
      title: 'Global Community',
      description: 'Compete with players worldwide',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        >
          <View style={styles.heroContent}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>♔</Text>
            </View>
            <Text style={styles.heroTitle}>Chess Master</Text>
            <Text style={styles.heroSubtitle}>
              Master the art of chess. Play, learn, and compete.
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.contentInner}>
          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name={feature.icon as any} size={32} color="#667eea" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to play?</Text>
            <Text style={styles.ctaSubtitle}>Join thousands of chess players</Text>

            <TouchableOpacity style={styles.googleButton} onPress={login}>
              <View style={styles.googleButtonContent}>
                <Image
                  source={{ uri: 'https://www.google.com/favicon.ico' }}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.legalLinks}>
              <Text style={styles.legalText}>
                By signing in, you agree to our{' '}
                <Text 
                  style={styles.legalLink}
                  onPress={() => router.push('/terms')}
                >
                  Terms
                </Text>
                {' and '}
                <Text 
                  style={styles.legalLink}
                  onPress={() => router.push('/privacy')}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    height: isWeb ? 400 : 300,
    width: '100%',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 600,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoIcon: {
    fontSize: 72,
    color: '#ffffff',
  },
  heroTitle: {
    fontSize: isWeb ? 56 : 40,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    fontSize: isWeb ? 20 : 16,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 28,
  },
  content: {
    flex: 1,
    paddingTop: isWeb ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: isWeb ? 40 : 20,
  },
  contentInner: {
    maxWidth: 1200,
    width: '100%',
    marginHorizontal: 'auto',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: isWeb ? -12 : -8,
    marginBottom: isWeb ? 60 : 40,
  },
  featureCard: {
    width: isWeb ? '25%' : '50%',
    paddingHorizontal: isWeb ? 12 : 8,
    marginBottom: 24,
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    paddingVertical: isWeb ? 40 : 24,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    maxWidth: 600,
    marginHorizontal: 'auto',
    width: '100%',
  },
  ctaTitle: {
    fontSize: isWeb ? 32 : 24,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginBottom: 24,
    minWidth: isWeb ? 320 : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
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
  legalLinks: {
    paddingHorizontal: 20,
  },
  legalText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
  legalLink: {
    color: '#667eea',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

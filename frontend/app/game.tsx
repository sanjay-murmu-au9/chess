import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import ChessGame from '../components/ChessGame';

export default function GameScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const startGame = () => {
    setGameStarted(true);
  };

  const backToMenu = () => {
    setGameStarted(false);
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  if (gameStarted) {
    return (
      <View style={{ flex: 1 }}>
        {/* Header with profile picture */}
        <View style={styles.gameHeader}>
          <TouchableOpacity onPress={goToProfile} style={styles.profileButton}>
            {user?.picture ? (
              <Image source={{ uri: user.picture }} style={styles.profileImageSmall} />
            ) : (
              <View style={styles.profileImageSmallPlaceholder}>
                <Text style={styles.profileImageSmallText}>
                  {user?.name?.charAt(0) || '?'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        <ChessGame
          playerName={user?.name || 'Player'}
          difficulty={difficulty}
          onBackToMenu={backToMenu}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with profile picture */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>♟️ Chess Master</Text>
            <Text style={styles.subtitle}>Play Against AI</Text>
          </View>
          
          <TouchableOpacity onPress={goToProfile} style={styles.profileButton}>
            {user?.picture ? (
              <Image source={{ uri: user.picture }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageText}>
                  {user?.name?.charAt(0) || '?'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back, {user?.name}!</Text>
          <Text style={styles.cardSubtitle}>Choose AI difficulty and start playing</Text>
        </View>

        <View style={styles.difficultyContainer}>
          <Text style={styles.sectionTitle}>AI Difficulty</Text>
          <View style={styles.difficultyButtons}>
            {['easy', 'medium', 'hard'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.difficultyButton,
                  difficulty === level && styles.difficultyButtonActive,
                ]}
                onPress={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === level && styles.difficultyButtonTextActive,
                  ]}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.playButton} onPress={startGame}>
          <Text style={styles.playButtonText}>Start Game</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>🎯 Tap a piece to select</Text>
          <Text style={styles.infoText}>🎯 Tap highlighted square to move</Text>
          <Text style={styles.infoText}>🤖 AI will respond automatically</Text>
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
  gameHeader: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 1000,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    fontWeight: '600',
  },
  profileButton: {
    marginLeft: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#7B61FF',
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileImageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileImageSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7B61FF',
  },
  profileImageSmallPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileImageSmallText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#2a2a4e',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  difficultyContainer: {
    width: '100%',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#16213e',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#2a2a4e',
  },
  difficultyButtonActive: {
    backgroundColor: '#7B61FF',
    borderColor: '#7B61FF',
  },
  difficultyButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#a0a0a0',
  },
  difficultyButtonTextActive: {
    color: '#ffffff',
  },
  playButton: {
    width: '100%',
    backgroundColor: '#7B61FF',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
});
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChessGame from '../components/ChessGame';

export default function Index() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayerName();
  }, []);

  const loadPlayerName = async () => {
    try {
      let name = await AsyncStorage.getItem('playerName');
      if (!name) {
        name = `Player${Math.floor(Math.random() * 9000) + 1000}`;
        await AsyncStorage.setItem('playerName', name);
      }
      setPlayerName(name);
    } catch (error) {
      console.error('Error loading player name:', error);
      setPlayerName(`Player${Math.floor(Math.random() * 9000) + 1000}`);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const backToMenu = () => {
    setGameStarted(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7B61FF" />
      </View>
    );
  }

  if (gameStarted) {
    return <ChessGame playerName={playerName} difficulty={difficulty} onBackToMenu={backToMenu} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>♟️ Chess Master</Text>
          <Text style={styles.subtitle}>Play Against AI</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome, {playerName}!</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
    fontWeight: '600',
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
    fontSize: 24,
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
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
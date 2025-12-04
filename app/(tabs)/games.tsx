
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface Game {
  id: number;
  title: string;
  emoji: string;
  description: string;
  color: string;
}

const games: Game[] = [
  { id: 1, title: "Love Quiz", emoji: "❤️", description: "Test how well you know each other", color: colors.primary },
  { id: 2, title: "Truth or Dare", emoji: "🎭", description: "Classic game for couples", color: colors.secondary },
  { id: 3, title: "Would You Rather", emoji: "🤔", description: "Choose between two options", color: colors.accent },
  { id: 4, title: "20 Questions", emoji: "❓", description: "Guess what your partner is thinking", color: "#FF6B6B" },
  { id: 5, title: "Never Have I Ever", emoji: "🙈", description: "Learn new things about each other", color: "#4ECDC4" },
  { id: 6, title: "Two Truths One Lie", emoji: "🎲", description: "Can you spot the lie?", color: "#95E1D3" },
  { id: 7, title: "Story Builder", emoji: "📖", description: "Create a story together", color: "#F38181" },
  { id: 8, title: "Memory Match", emoji: "🧠", description: "Test your memory skills", color: "#AA96DA" },
  { id: 9, title: "Emoji Charades", emoji: "🎬", description: "Act out using only emojis", color: "#FCBAD3" },
  { id: 10, title: "Love Trivia", emoji: "💝", description: "Answer questions about your relationship", color: "#A8D8EA" },
];

export default function GamesScreen() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGamePress = (game: Game) => {
    setSelectedGame(game);
    Alert.alert(
      game.title,
      `${game.description}\n\nThis is a fun game to play together! Get creative and enjoy your time together! 💕`,
      [
        { text: "Start Game", onPress: () => console.log(`Starting ${game.title}`) },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Couple Games</Text>
          <Text style={styles.headerSubtitle}>Fun activities to enjoy together</Text>
        </View>

        <View style={styles.gamesGrid}>
          {games.map((game, index) => (
            <Pressable
              key={index}
              style={[styles.gameCard, { borderLeftColor: game.color, borderLeftWidth: 4 }]}
              onPress={() => handleGamePress(game)}
            >
              <View style={styles.gameContent}>
                <Text style={styles.gameEmoji}>{game.emoji}</Text>
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameDescription}>{game.description}</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
            </Pressable>
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <IconSymbol name="lightbulb.fill" color={colors.accent} size={24} />
            <Text style={styles.tipTitle}>Pro Tip</Text>
          </View>
          <Text style={styles.tipText}>
            These games are designed to help you connect, laugh, and create beautiful memories together. 
            Take turns choosing games and enjoy quality time with your loved one! 💑
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  gamesGrid: {
    marginBottom: 20,
  },
  gameCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  gameContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gameEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

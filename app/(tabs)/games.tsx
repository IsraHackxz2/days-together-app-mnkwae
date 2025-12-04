
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useLanguage } from '@/contexts/LanguageContext';

interface Game {
  id: number;
  titleKey: keyof typeof import('@/constants/translations').translations.en;
  descKey: keyof typeof import('@/constants/translations').translations.en;
  emoji: string;
  color: string;
}

const games: Game[] = [
  { id: 1, titleKey: 'loveQuiz', descKey: 'loveQuizDesc', emoji: "❤️", color: colors.primary },
  { id: 2, titleKey: 'truthOrDare', descKey: 'truthOrDareDesc', emoji: "🎭", color: colors.secondary },
  { id: 3, titleKey: 'wouldYouRather', descKey: 'wouldYouRatherDesc', emoji: "🤔", color: colors.accent },
  { id: 4, titleKey: 'twentyQuestions', descKey: 'twentyQuestionsDesc', emoji: "❓", color: "#FF6B6B" },
  { id: 5, titleKey: 'neverHaveIEver', descKey: 'neverHaveIEverDesc', emoji: "🙈", color: "#4ECDC4" },
  { id: 6, titleKey: 'twoTruthsOneLie', descKey: 'twoTruthsOneLieDesc', emoji: "🎲", color: "#95E1D3" },
  { id: 7, titleKey: 'storyBuilder', descKey: 'storyBuilderDesc', emoji: "📖", color: "#F38181" },
  { id: 8, titleKey: 'memoryMatch', descKey: 'memoryMatchDesc', emoji: "🧠", color: "#AA96DA" },
  { id: 9, titleKey: 'emojiCharades', descKey: 'emojiCharadesDesc', emoji: "🎬", color: "#FCBAD3" },
  { id: 10, titleKey: 'loveTrivia', descKey: 'loveTriviaDesc', emoji: "💝", color: "#A8D8EA" },
];

export default function GamesScreen() {
  const { t } = useLanguage();

  const handleGamePress = (game: Game) => {
    const title = t[game.titleKey];
    const description = t[game.descKey];
    
    Alert.alert(
      title,
      `${description}\n\n${t.gameMessage}`,
      [
        { text: t.startGame, onPress: () => console.log(`Starting ${title}`) },
        { text: t.cancel, style: "cancel" }
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
          <Text style={styles.headerTitle}>{t.coupleGames}</Text>
          <Text style={styles.headerSubtitle}>{t.funActivities}</Text>
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
                  <Text style={styles.gameTitle}>{t[game.titleKey]}</Text>
                  <Text style={styles.gameDescription}>{t[game.descKey]}</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
            </Pressable>
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <IconSymbol name="lightbulb.fill" color={colors.accent} size={24} />
            <Text style={styles.tipTitle}>{t.proTip}</Text>
          </View>
          <Text style={styles.tipText}>
            {t.proTipText}
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

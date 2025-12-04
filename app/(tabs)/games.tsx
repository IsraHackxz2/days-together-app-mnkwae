
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
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
  questions: string[];
}

const games: Game[] = [
  { 
    id: 1, 
    titleKey: 'loveQuiz', 
    descKey: 'loveQuizDesc', 
    emoji: "❤️", 
    color: colors.primary,
    questions: [
      "What's my favorite color?",
      "Where did we first meet?",
      "What's my favorite food?",
      "What's my dream vacation destination?",
      "What's my biggest fear?",
    ]
  },
  { 
    id: 2, 
    titleKey: 'truthOrDare', 
    descKey: 'truthOrDareDesc', 
    emoji: "🎭", 
    color: colors.secondary,
    questions: [
      "Truth: What's your most embarrassing moment with me?",
      "Dare: Give me a 30-second massage",
      "Truth: What do you love most about our relationship?",
      "Dare: Do your best impression of me",
      "Truth: What's one thing you've never told me?",
    ]
  },
  { 
    id: 3, 
    titleKey: 'wouldYouRather', 
    descKey: 'wouldYouRatherDesc', 
    emoji: "🤔", 
    color: colors.accent,
    questions: [
      "Would you rather travel the world or buy a house?",
      "Would you rather have a romantic dinner or a fun adventure?",
      "Would you rather live in the city or countryside?",
      "Would you rather have more time or more money?",
      "Would you rather be able to read minds or see the future?",
    ]
  },
  { 
    id: 4, 
    titleKey: 'twentyQuestions', 
    descKey: 'twentyQuestionsDesc', 
    emoji: "❓", 
    color: "#FF6B6B",
    questions: [
      "Think of something and let your partner guess!",
      "Give hints: Is it a person, place, or thing?",
      "Answer only with yes or no",
      "Your partner has 20 questions to guess",
      "Take turns being the guesser!",
    ]
  },
  { 
    id: 5, 
    titleKey: 'neverHaveIEver', 
    descKey: 'neverHaveIEverDesc', 
    emoji: "🙈", 
    color: "#4ECDC4",
    questions: [
      "Never have I ever lied to you",
      "Never have I ever forgotten an important date",
      "Never have I ever stalked your social media",
      "Never have I ever been jealous of your friends",
      "Never have I ever regretted meeting you",
    ]
  },
  { 
    id: 6, 
    titleKey: 'twoTruthsOneLie', 
    descKey: 'twoTruthsOneLieDesc', 
    emoji: "🎲", 
    color: "#95E1D3",
    questions: [
      "Tell three statements about yourself",
      "Two must be true, one must be false",
      "Your partner has to guess which one is the lie",
      "Take turns playing",
      "Be creative with your statements!",
    ]
  },
  { 
    id: 7, 
    titleKey: 'storyBuilder', 
    descKey: 'storyBuilderDesc', 
    emoji: "📖", 
    color: "#F38181",
    questions: [
      "Start: Once upon a time, there was a couple...",
      "Take turns adding one sentence to the story",
      "Make it romantic, funny, or adventurous!",
      "See where your imagination takes you",
      "End with 'And they lived happily ever after'",
    ]
  },
  { 
    id: 8, 
    titleKey: 'memoryMatch', 
    descKey: 'memoryMatchDesc', 
    emoji: "🧠", 
    color: "#AA96DA",
    questions: [
      "What was I wearing on our first date?",
      "What was the first movie we watched together?",
      "What was the first gift you gave me?",
      "Where did we have our first kiss?",
      "What was the first song we danced to?",
    ]
  },
  { 
    id: 9, 
    titleKey: 'emojiCharades', 
    descKey: 'emojiCharadesDesc', 
    emoji: "🎬", 
    color: "#FCBAD3",
    questions: [
      "Act out: Our first date 🍽️💕",
      "Act out: A romantic movie scene 🎬❤️",
      "Act out: How we met 👫✨",
      "Act out: Our favorite activity together 🎉",
      "Act out: A funny moment we shared 😂",
    ]
  },
  { 
    id: 10, 
    titleKey: 'loveTrivia', 
    descKey: 'loveTriviaDesc', 
    emoji: "💝", 
    color: "#A8D8EA",
    questions: [
      "What's my favorite thing about you?",
      "What's our song?",
      "What's my love language?",
      "What's my idea of a perfect date?",
      "What's one thing I can't live without?",
    ]
  },
];

export default function GamesScreen() {
  const { t } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleGamePress = (game: Game) => {
    setSelectedGame(game);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (selectedGame && currentQuestionIndex < selectedGame.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCloseGame = () => {
    setSelectedGame(null);
    setCurrentQuestionIndex(0);
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

      {/* Game Modal */}
      <Modal
        visible={selectedGame !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseGame}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGame && (
              <React.Fragment>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalEmoji}>{selectedGame.emoji}</Text>
                    <Text style={styles.modalTitle}>{t[selectedGame.titleKey]}</Text>
                  </View>
                  <Pressable onPress={handleCloseGame} style={styles.closeButton}>
                    <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={32} />
                  </Pressable>
                </View>

                <View style={styles.questionContainer}>
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionNumber}>
                      {currentQuestionIndex + 1} / {selectedGame.questions.length}
                    </Text>
                  </View>
                  
                  <View style={styles.questionCard}>
                    <Text style={styles.questionText}>
                      {selectedGame.questions[currentQuestionIndex]}
                    </Text>
                  </View>

                  <View style={styles.navigationButtons}>
                    <Pressable 
                      style={[
                        styles.navButton, 
                        styles.prevButton,
                        currentQuestionIndex === 0 && styles.navButtonDisabled
                      ]}
                      onPress={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <IconSymbol 
                        name="chevron.left" 
                        color={currentQuestionIndex === 0 ? colors.textSecondary : colors.card} 
                        size={24} 
                      />
                      <Text style={[
                        styles.navButtonText,
                        currentQuestionIndex === 0 && styles.navButtonTextDisabled
                      ]}>
                        Previous
                      </Text>
                    </Pressable>

                    <Pressable 
                      style={[
                        styles.navButton, 
                        styles.nextButton,
                        currentQuestionIndex === selectedGame.questions.length - 1 && styles.navButtonDisabled
                      ]}
                      onPress={handleNextQuestion}
                      disabled={currentQuestionIndex === selectedGame.questions.length - 1}
                    >
                      <Text style={[
                        styles.navButtonText,
                        currentQuestionIndex === selectedGame.questions.length - 1 && styles.navButtonTextDisabled
                      ]}>
                        Next
                      </Text>
                      <IconSymbol 
                        name="chevron.right" 
                        color={currentQuestionIndex === selectedGame.questions.length - 1 ? colors.textSecondary : colors.card} 
                        size={24} 
                      />
                    </Pressable>
                  </View>

                  {currentQuestionIndex === selectedGame.questions.length - 1 && (
                    <Pressable style={styles.finishButton} onPress={handleCloseGame}>
                      <Text style={styles.finishButtonText}>Finish Game</Text>
                    </Pressable>
                  )}
                </View>

                <View style={styles.gameInstructions}>
                  <IconSymbol name="info.circle" color={colors.accent} size={20} />
                  <Text style={styles.instructionsText}>
                    Take turns answering or playing. Have fun and enjoy your time together! 💕
                  </Text>
                </View>
              </React.Fragment>
            )}
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: colors.highlight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  questionCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  questionText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '500',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  prevButton: {
    backgroundColor: colors.primary,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  navButtonDisabled: {
    backgroundColor: colors.highlight,
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.card,
  },
  navButtonTextDisabled: {
    color: colors.textSecondary,
  },
  finishButton: {
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.card,
  },
  gameInstructions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  instructionsText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});


import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfileScreen() {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = () => {
    Alert.alert(
      t.selectLanguage,
      '',
      [
        {
          text: 'English',
          onPress: () => setLanguage('en'),
        },
        {
          text: 'Español',
          onPress: () => setLanguage('es'),
        },
        {
          text: t.cancel,
          style: 'cancel',
        },
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
          <Text style={styles.headerTitle}>{t.about}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Image 
              source={require('@/assets/images/8be3dd88-2c62-4a8a-8b0c-3b497b23fb20.jpeg')}
              style={styles.coupleImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.cardTitle}>{t.appTitle}</Text>
          <Text style={styles.cardDescription}>
            {t.appDescription}
          </Text>
        </View>

        {/* Language Selector */}
        <Pressable style={styles.languageCard} onPress={handleLanguageChange}>
          <View style={styles.languageIcon}>
            <IconSymbol name="globe" color={colors.primary} size={24} />
          </View>
          <View style={styles.languageContent}>
            <Text style={styles.languageTitle}>{t.language}</Text>
            <Text style={styles.languageSubtext}>
              {language === 'en' ? 'English' : 'Español'}
            </Text>
          </View>
          <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
        </Pressable>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>{t.features}</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="heart.fill" color={colors.primary} size={24} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{t.trackYourLove}</Text>
              <Text style={styles.featureDescription}>
                {t.trackYourLoveDesc}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="calendar" color={colors.secondary} size={24} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{t.calendarNotes}</Text>
              <Text style={styles.featureDescription}>
                {t.calendarNotesDesc}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="gamecontroller.fill" color={colors.accent} size={24} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{t.coupleGamesFeature}</Text>
              <Text style={styles.featureDescription}>
                {t.coupleGamesDesc}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="star.fill" color={colors.accent} size={24} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{t.celebrateMilestones}</Text>
              <Text style={styles.featureDescription}>
                {t.celebrateMilestonesDesc}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="person.2.fill" color={colors.primary} size={24} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{t.personalizeNames}</Text>
              <Text style={styles.featureDescription}>
                {t.personalizeNamesDesc}
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <IconSymbol name="clock.fill" color={colors.secondary} size={24} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{t.cstTimezone}</Text>
              <Text style={styles.featureDescription}>
                {t.cstTimezoneDesc}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t.madeBy}</Text>
          <Text style={styles.versionText}>{t.version}</Text>
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
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 8px 24px rgba(233, 30, 99, 0.2)',
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 5,
  },
  coupleImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  languageCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  languageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  languageContent: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  languageSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  featuresSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  featureItem: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

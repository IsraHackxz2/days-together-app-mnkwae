
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/contexts/LanguageContext';

interface DayNote {
  date: string;
  note: string;
  emoji: string;
}

const EMOJIS = ["❤️", "💕", "💖", "💗", "💝", "💘", "😍", "🥰", "😘", "💑", "👫", "🌹", "🎉", "🎂", "🎁", "⭐", "✨", "🌟", "💫", "🔥"];

export default function CalendarScreen() {
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: DayNote }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('calendarNotes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.log('Error loading notes:', error);
    }
  };

  const saveNotes = async (newNotes: { [key: string]: DayNote }) => {
    try {
      await AsyncStorage.setItem('calendarNotes', JSON.stringify(newNotes));
    } catch (error) {
      console.log('Error saving notes:', error);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleDayPress = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    const dateKey = formatDateKey(date);
    const existingNote = notes[dateKey];
    setNoteText(existingNote?.note || "");
    setSelectedEmoji(existingNote?.emoji || "❤️");
    setModalVisible(true);
  };

  const handleSaveNote = () => {
    if (!selectedDate) return;

    const dateKey = formatDateKey(selectedDate);
    const newNotes = { ...notes };

    if (noteText.trim() === "" && selectedEmoji === "❤️") {
      delete newNotes[dateKey];
    } else {
      newNotes[dateKey] = {
        date: dateKey,
        note: noteText,
        emoji: selectedEmoji,
      };
    }

    setNotes(newNotes);
    saveNotes(newNotes);
    setModalVisible(false);
    setNoteText("");
    setSelectedEmoji("❤️");
  };

  const handleDeleteNote = () => {
    if (!selectedDate) return;

    Alert.alert(
      t.deleteNote,
      t.deleteNoteConfirm,
      [
        { text: t.cancel, style: "cancel" },
        {
          text: t.delete,
          style: "destructive",
          onPress: () => {
            const dateKey = formatDateKey(selectedDate);
            const newNotes = { ...notes };
            delete newNotes[dateKey];
            setNotes(newNotes);
            saveNotes(newNotes);
            setModalVisible(false);
            setNoteText("");
            setSelectedEmoji("❤️");
          },
        },
      ]
    );
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    if (language === 'es') {
      return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    }
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = getWeekDays();

    // Week day headers
    const headers = weekDays.map((day, index) => (
      <View key={`header-${index}`} style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>{day}</Text>
      </View>
    ));

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = formatDateKey(date);
      const dayNote = notes[dateKey];
      const isToday = 
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();

      days.push(
        <Pressable
          key={`day-${day}`}
          style={[styles.dayCell, isToday && styles.todayCell]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
          {dayNote && (
            <Text style={styles.dayEmoji}>{dayNote.emoji}</Text>
          )}
        </Pressable>
      );
    }

    return (
      <View style={styles.calendar}>
        <View style={styles.weekDaysRow}>{headers}</View>
        <View style={styles.daysGrid}>{days}</View>
      </View>
    );
  };

  const formatMonthYear = (date: Date) => {
    if (language === 'es') {
      return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatSelectedDate = (date: Date) => {
    if (language === 'es') {
      return date.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t.ourCalendar}</Text>
          <Text style={styles.headerSubtitle}>{t.markSpecialMoments}</Text>
        </View>

        <View style={styles.monthSelector}>
          <Pressable onPress={() => changeMonth(-1)} style={styles.monthButton}>
            <IconSymbol name="chevron.left" color={colors.primary} size={24} />
          </Pressable>
          <Text style={styles.monthText}>
            {formatMonthYear(currentDate)}
          </Text>
          <Pressable onPress={() => changeMonth(1)} style={styles.monthButton}>
            <IconSymbol name="chevron.right" color={colors.primary} size={24} />
          </Pressable>
        </View>

        {renderCalendar()}

        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>{t.howToUse}</Text>
          <Text style={styles.legendText}>{t.tapAnyDay}</Text>
          <Text style={styles.legendText}>{t.daysWithEmojis}</Text>
          <Text style={styles.legendText}>{t.todayHighlighted}</Text>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedDate && formatSelectedDate(selectedDate)}
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <IconSymbol name="xmark.circle.fill" color={colors.textSecondary} size={28} />
              </Pressable>
            </View>

            <Text style={styles.sectionLabel}>{t.chooseEmoji}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiScroll}>
              {EMOJIS.map((emoji, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.emojiButton,
                    selectedEmoji === emoji && styles.emojiButtonSelected,
                  ]}
                  onPress={() => setSelectedEmoji(emoji)}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.sectionLabel}>{t.addNote}</Text>
            <TextInput
              style={styles.noteInput}
              placeholder={t.writeSomethingSpecial}
              placeholderTextColor={colors.textSecondary}
              value={noteText}
              onChangeText={setNoteText}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <Pressable style={styles.saveButton} onPress={handleSaveNote}>
                <Text style={styles.saveButtonText}>{t.save}</Text>
              </Pressable>
              {notes[formatDateKey(selectedDate!)] && (
                <Pressable style={styles.deleteButton} onPress={handleDeleteNote}>
                  <Text style={styles.deleteButtonText}>{t.delete}</Text>
                </Pressable>
              )}
            </View>
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
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  monthButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  calendar: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  todayCell: {
    backgroundColor: colors.highlight,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  todayText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  dayEmoji: {
    fontSize: 16,
    marginTop: 2,
  },
  legendCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  legendText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  emojiScroll: {
    marginBottom: 24,
  },
  emojiButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emojiButtonSelected: {
    backgroundColor: colors.highlight,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  emojiText: {
    fontSize: 28,
  },
  noteInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  deleteButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

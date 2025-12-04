
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Platform,
  Pressable,
  Alert
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimeRemaining {
  days: number;
  hours: number;
}

export default function HomeScreen() {
  const { t } = useLanguage();
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [timeElapsed, setTimeElapsed] = useState<TimeRemaining>({ days: 0, hours: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update time every minute
  useEffect(() => {
    calculateTime();
    const interval = setInterval(() => {
      calculateTime();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [startDate]);

  // Save data whenever it changes
  useEffect(() => {
    saveData();
  }, [name1, name2, startDate]);

  const loadData = async () => {
    try {
      const savedName1 = await AsyncStorage.getItem('name1');
      const savedName2 = await AsyncStorage.getItem('name2');
      const savedDate = await AsyncStorage.getItem('startDate');
      
      if (savedName1) setName1(savedName1);
      if (savedName2) setName2(savedName2);
      if (savedDate) setStartDate(new Date(savedDate));
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name1', name1);
      await AsyncStorage.setItem('name2', name2);
      await AsyncStorage.setItem('startDate', startDate.toISOString());
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const calculateTime = () => {
    // Get current time in CST (UTC-6)
    const now = new Date();
    const cstOffset = -6 * 60; // CST is UTC-6
    const localOffset = now.getTimezoneOffset();
    const cstTime = new Date(now.getTime() + (localOffset + cstOffset) * 60000);
    
    // Calculate difference
    const diffMs = cstTime.getTime() - startDate.getTime();
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    setTimeElapsed({ days, hours });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Preserve the time when changing date
      const newDate = new Date(startDate);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setStartDate(newDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      // Preserve the date when changing time
      const newDate = new Date(startDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setStartDate(newDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateTime = (date: Date) => {
    return `${formatDate(date)} at ${formatTime(date)}`;
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        setName1("");
        setName2("");
        setStartDate(new Date());
        Alert.alert(t.reset, t.allDataCleared);
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="arrow.clockwise" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: t.daysTogether,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerRight: renderHeaderRight,
        }}
      />
      <ScrollView 
        style={[styles.container]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>{t.daysTogether}</Text>
          <View style={styles.namesContainer}>
            <Text style={styles.namesText}>
              {name1 || "Partner 1"} {name1 && name2 && "💕"} {name2 || "Partner 2"}
            </Text>
          </View>
        </View>

        {/* Time Counter Card */}
        <View style={styles.counterCard}>
          <View style={styles.heartIconContainer}>
            <Text style={styles.heartIcon}>❤️</Text>
          </View>
          
          {/* Days and Hours */}
          <View style={styles.timeRow}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeNumber}>{timeElapsed.days}</Text>
              <Text style={styles.timeLabel}>{t.days}</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeBlock}>
              <Text style={styles.timeNumber}>{timeElapsed.hours}</Text>
              <Text style={styles.timeLabel}>{t.hours}</Text>
            </View>
          </View>

          <Text style={styles.dateSubtext}>{t.since} {formatDateTime(startDate)}</Text>
          <Text style={styles.timezoneText}>{t.updatedInCST}</Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>{t.firstName}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.enterFirstName}
              placeholderTextColor={colors.textSecondary}
              value={name1}
              onChangeText={setName1}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>{t.secondName}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.enterSecondName}
              placeholderTextColor={colors.textSecondary}
              value={name2}
              onChangeText={setName2}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>{t.relationshipStartDate}</Text>
            <Pressable 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <IconSymbol name="calendar" color={colors.primary} size={20} />
              <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
            </Pressable>
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>{t.relationshipStartTime}</Text>
            <Pressable 
              style={styles.dateButton}
              onPress={() => setShowTimePicker(true)}
            >
              <IconSymbol name="clock" color={colors.primary} size={20} />
              <Text style={styles.dateButtonText}>{formatTime(startDate)}</Text>
            </Pressable>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={startDate}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
            />
          )}
        </View>

        {/* Milestones Section */}
        <View style={styles.milestonesSection}>
          <Text style={styles.milestonesTitle}>{t.upcomingMilestones}</Text>
          {renderMilestone(100, timeElapsed.days)}
          {renderMilestone(365, timeElapsed.days)}
          {renderMilestone(500, timeElapsed.days)}
          {renderMilestone(1000, timeElapsed.days)}
        </View>
      </ScrollView>
    </>
  );

  function renderMilestone(milestone: number, current: number) {
    if (current >= milestone) {
      return (
        <View key={milestone} style={styles.milestoneCard}>
          <View style={styles.milestoneIconCompleted}>
            <IconSymbol name="checkmark.circle.fill" color={colors.card} size={24} />
          </View>
          <View style={styles.milestoneContent}>
            <Text style={styles.milestoneText}>{milestone} {t.daysCount}</Text>
            <Text style={styles.milestoneSubtext}>{t.completed}</Text>
          </View>
        </View>
      );
    }

    const daysRemaining = milestone - current;
    return (
      <View key={milestone} style={styles.milestoneCard}>
        <View style={styles.milestoneIcon}>
          <IconSymbol name="heart.fill" color={colors.primary} size={24} />
        </View>
        <View style={styles.milestoneContent}>
          <Text style={styles.milestoneText}>{milestone} {t.daysCount}</Text>
          <Text style={styles.milestoneSubtext}>{daysRemaining} {t.daysToGo}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  namesContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    boxShadow: '0px 4px 12px rgba(233, 30, 99, 0.15)',
    elevation: 4,
  },
  namesText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  counterCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 30,
    boxShadow: '0px 8px 24px rgba(233, 30, 99, 0.2)',
    elevation: 8,
  },
  heartIconContainer: {
    marginBottom: 16,
  },
  heartIcon: {
    fontSize: 48,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeBlock: {
    alignItems: 'center',
    minWidth: 100,
  },
  timeNumber: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
  },
  timeSeparator: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.secondary,
    marginHorizontal: 16,
  },
  dateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  timezoneText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  inputSection: {
    marginBottom: 30,
  },
  inputCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: colors.text,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  milestonesSection: {
    marginBottom: 20,
  },
  milestonesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  milestoneCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  milestoneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  milestoneIconCompleted: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  milestoneSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  headerButtonContainer: {
    padding: 8,
  },
});

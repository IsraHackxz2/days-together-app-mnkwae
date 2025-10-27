
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

export default function HomeScreen() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [daysTogether, setDaysTogether] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Calculate days whenever the date changes
  useEffect(() => {
    calculateDays();
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

  const calculateDays = () => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        setName1("");
        setName2("");
        setStartDate(new Date());
        Alert.alert("Reset", "All data has been cleared!");
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
          title: "Days Together",
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
          <Text style={styles.headerTitle}>Days Together</Text>
          <View style={styles.namesContainer}>
            <Text style={styles.namesText}>
              {name1 || "Partner 1"} {name1 && name2 && "💕"} {name2 || "Partner 2"}
            </Text>
          </View>
        </View>

        {/* Days Counter Card */}
        <View style={styles.counterCard}>
          <View style={styles.heartIconContainer}>
            <Text style={styles.heartIcon}>❤️</Text>
          </View>
          <Text style={styles.daysNumber}>{daysTogether}</Text>
          <Text style={styles.daysLabel}>
            {daysTogether === 1 ? 'Day' : 'Days'} of Love
          </Text>
          <Text style={styles.dateSubtext}>Since {formatDate(startDate)}</Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              placeholderTextColor={colors.textSecondary}
              value={name1}
              onChangeText={setName1}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Second Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter second name"
              placeholderTextColor={colors.textSecondary}
              value={name2}
              onChangeText={setName2}
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Relationship Start Date</Text>
            <Pressable 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <IconSymbol name="calendar" color={colors.primary} size={20} />
              <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
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
        </View>

        {/* Milestones Section */}
        <View style={styles.milestonesSection}>
          <Text style={styles.milestonesTitle}>Upcoming Milestones</Text>
          {renderMilestone(100, daysTogether)}
          {renderMilestone(365, daysTogether)}
          {renderMilestone(500, daysTogether)}
          {renderMilestone(1000, daysTogether)}
        </View>
      </ScrollView>
    </>
  );

  function renderMilestone(milestone: number, current: number) {
    if (current >= milestone) {
      return (
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneIconCompleted}>
            <IconSymbol name="checkmark.circle.fill" color={colors.card} size={24} />
          </View>
          <View style={styles.milestoneContent}>
            <Text style={styles.milestoneText}>{milestone} Days</Text>
            <Text style={styles.milestoneSubtext}>Completed! 🎉</Text>
          </View>
        </View>
      );
    }

    const daysRemaining = milestone - current;
    return (
      <View style={styles.milestoneCard}>
        <View style={styles.milestoneIcon}>
          <IconSymbol name="heart.fill" color={colors.primary} size={24} />
        </View>
        <View style={styles.milestoneContent}>
          <Text style={styles.milestoneText}>{milestone} Days</Text>
          <Text style={styles.milestoneSubtext}>{daysRemaining} days to go</Text>
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
  daysNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  daysLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  dateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
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

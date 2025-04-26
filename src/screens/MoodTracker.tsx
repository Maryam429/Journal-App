//mood tracking screen
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
//define mood tracker
type MoodTrackerProps = NativeStackScreenProps<RootStackParamList, 'MoodTracker'>;
//recieves journal entries from navigation
//assigns specific counter for each mood and counts how many times each mood appears
//displays counter
const MoodTracker: React.FC<MoodTrackerProps> = ({ route }) => {
  const { entries } = route.params;

  const [moodData, setMoodData] = useState({
    happy: 0,
    angry: 0,
    sad: 0,
    tired: 0,
    neutral: 0,
  });

  useEffect(() => {
    let happy = 0;
    let angry = 0;
    let sad = 0;
    let tired = 0;
    let neutral = 0;
//loops through each entry 
    entries.forEach(entry => {
      switch (entry.mood) {
        case '🙂':
        case '😄': 
          happy += 1;
          break;
        case '😡':
          angry += 1;
          break;
        case '😢':
          sad += 1;
          break;
        case '😴':
          tired += 1;
          break;
        case '😐':
          neutral += 1;
          break;
        default:
          break;
      }
    });
//update mood data
    setMoodData({ happy, angry, sad, tired, neutral });
  }, [entries]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mood Summary</Text>

      <Text style={styles.moodText}>🙂 Happy: {moodData.happy}</Text>
      <Text style={styles.moodText}>😡 Angry: {moodData.angry}</Text>
      <Text style={styles.moodText}>😢 Sad: {moodData.sad}</Text>
      <Text style={styles.moodText}>😴 Tired: {moodData.tired}</Text>
      <Text style={styles.moodText}>😐 Neutral: {moodData.neutral}</Text>
    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#ADD8E6',
  padding: 20,
  justifyContent: 'center'
  },
  header: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#003366',
  marginBottom: 20,
  textAlign: 'center'
  },
  moodText: {
  fontSize: 20,
  marginBottom: 10,
  color: '#003366',
  textAlign: 'center'
  },
});
export default MoodTracker;

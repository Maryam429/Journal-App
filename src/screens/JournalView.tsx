//for users to view past journal entries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
//define journal view
type JournalViewProps = NativeStackScreenProps<RootStackParamList, 'JournalView'>;
//recieves journal entry data from navigation and displays on screen
const JournalView: React.FC<JournalViewProps> = ({ route }) => {
  const { title, text, mood, date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>

      <View style={styles.moodRow}>
        <Text style={styles.selectedMood}>{mood}</Text>
      </View>

      <Text style={styles.title}>{title || 'Untitled'}</Text>

      <Text style={styles.textContent}>
        {text || 'No content'}
      </Text>
    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ADD8E6' },
  date: {
    fontSize: 20,
    color: '#003366',
    marginBottom: 10,
    textAlign: 'left',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  selectedMood: {
    fontSize: 28,
    transform: [{ scale: 1.2 }],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#003366',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  textContent: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#003366',
  },
});

export default JournalView;

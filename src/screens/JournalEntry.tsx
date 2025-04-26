import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,Alert,TouchableOpacity,} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
//saving
import { auth, db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


//define journalEntry
type JournalEntryProps = NativeStackScreenProps<RootStackParamList, 'JournalEntry'>;

const JournalEntry: React.FC<JournalEntryProps> = ({ navigation }) => {
  //define user input
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [mood, setMood] = useState('🙂'); //default moods 

  const currentDate = new Date().toLocaleDateString(); //get current date


  const handleSave = async () => {
    //creating new entry
    const newEntry = {
      title: title || 'Untitled',
      text: text || 'No content',
      date: new Date().toLocaleDateString(),
      mood,
      createdAt: new Date(),
    };
    //save entry to firebase
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('User not authenticated');
      }
    await addDoc(collection(db, 'users', userId, 'journalEntries'), newEntry);
     //notif that entry has been saved 
    Alert.alert('Saved!', 'Your journal entry has been saved.');
    navigation.navigate('Profile');
    } catch (error) { //fail to save entry
      console.error('Error saving journal entry:', error);
      Alert.alert('Error', 'Failed to save your entry.');
    }
  };
//shows an array of mood emojis for user to select, updating the highlighted mood when selected
//creates entry spaces allowing user to write a title and entry below that
//creates a save button
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>
      <View style={styles.moodRow}>
        {['🙂', '😐', '😢', '😡', '😴', '😄'].map((m) => (
          <Text
            key={m}
            style={[styles.moodEmoji, mood === m && styles.selectedMood]}
            onPress={() => setMood(m)}
          >
          {m}
          </Text>
        ))}
      </View>

      <TextInput
        style={styles.titleInput}
        placeholder="New Entry Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Start writing here"
        placeholderTextColor="#aaa"
        multiline
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADD8E6',
  },
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
  moodEmoji: {
    fontSize: 28,
    marginHorizontal: 8,
    opacity: 0.5,
  },
  selectedMood: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#003366',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#003366',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default JournalEntry;

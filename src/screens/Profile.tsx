//profile screen
//displays navigations to chatbot, moodtracker, journal entry, and journal history screens
//logout option
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
//define profile
type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
//defines parameters for each journal entry 
type Entry = {
  id: string;
  title: string;
  text: string;
  mood: string;
  date: string;
};
//fetches users entry data from firebase 
//stores them into local state for navigation
const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const snapshot = await getDocs(collection(db, 'users', userId, 'journalEntries'));

        const fetchedEntries: Entry[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Entry, 'id'>),
        }));

        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []);
//render buttons and welcome message with user email displayes
  return (
    <View style={styles.container}>

      
      <View style={styles.header}>
        <Text style={styles.name}>
          {user?.displayName ? `Welcome, ${user.displayName}!` : 'Welcome,'}
        </Text>
        <Text style={styles.email}>
          {user?.email}
        </Text>
      </View>

      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('JournalEntry')}
      >
        <Text style={styles.buttonText}>Go to Journal Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('JournalHistory')}
      >
        <Text style={styles.buttonText}>Go to Journal History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MoodTracker', { entries })}
      >
        <Text style={styles.buttonText}>Go to Mood Tracker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chatbot')}
      >
        <Text style={styles.buttonText}>Go to Chatbot</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
  },
  email: {
    fontSize: 16,
    color: '#444',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#003366',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    margin: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  logoutButton: {
    marginTop: 30,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Profile;

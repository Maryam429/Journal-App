import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { auth, db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
//define Journal History
type JournalHistoryProps = NativeStackScreenProps<RootStackParamList, 'JournalHistory'>;
//defines parameters for each journal entry 
type Entry = {
  id: string;
  title: string;
  text: string;
  date: string;
  mood: string;
};

const JournalHistory: React.FC<JournalHistoryProps> = ({ navigation }) => {
  //create entries variable to store journal entries from firebase
  const [entries, setEntries] = useState<Entry[]>([]);
  //fetches all journal entries from user frome firebase
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          console.log('No user ID');
          return;
        }
        const entriesRef = collection(db, 'users', userId, 'journalEntries');
        const snapshot = await getDocs(entriesRef);
        const fetchedEntries: Entry[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Entry, 'id'>),
        }));
        setEntries(fetchedEntries);
      } catch (error) {
        console.error('Failed to load entries:', error);
      }
    };

    fetchEntries();
  }, []);
//deletes and refreshes entries 
  const handleDeleteEntry = async (entryId: string) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.log('No user ID');
        return;
      }
  
      await deleteDoc(doc(db, 'users', userId, 'journalEntries', entryId));
      console.log('Entry deleted');
  
      //Refresh entries after deleting
      const entriesRef = collection(db, 'users', userId, 'journalEntries');
      const snapshot = await getDocs(entriesRef);
      const fetchedEntries: Entry[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Entry, 'id'>),
      }));
      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };
  
//displays entries, allows you to navigate to them
//allows you to delete and entry
  const showEntry = ({ item }: { item: Entry }) => (
    <View style={styles.entryContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('JournalView', {
            title: item.title,
            text: item.text,
            mood: item.mood,
            date: item.date,
          })
        }
      >
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryDate}>{item.date}</Text>
      </TouchableOpacity>
  
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteEntry(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  
  
//render screen using flatlist, if no entries, display no current entries
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Previous Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={showEntry}
        ListEmptyComponent={<Text>No current journal entries.</Text>}
      />
    </View>
  );
};
//styling
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  entryContainer: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    //borderColor: '#0077B6'
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  entryTitle: { fontSize: 18, fontWeight: 'bold' },
  entryDate: { fontSize: 14, color: '#888' },
  deleteButton: {
    backgroundColor: '#003366',
    padding: 8,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  
});

export default JournalHistory;

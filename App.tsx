import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loginpage from './src/screens/Loginpage'; // Import Loginpage
import Profile from './src/screens/Profile'; // Import Profile
import JournalEntry from './src/screens/JournalEntry'; // Import JournalEntry
import JournalHistory from './src/screens/JournalHistory'; // Import JournalHistory
import MoodTracker from './src/screens/MoodTracker'; // Import MoodTracker
import Chatbot from './src/screens/Chatbot'; // Import Chatbot
import SignUp from './src/screens/SignUp'; // Import Chatbot
import JournalView from './src/screens/JournalView'; // Import JournalView
import Groq from 'groq-sdk';
//initialize screens; define parameters
export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  JournalEntry: undefined;
  JournalHistory: undefined;
  MoodTracker: { entries: { mood: string; text: string; title: string; date: string }[] };
  Chatbot: undefined;
  SignUp: undefined;
  JournalView: {title: string;text: string;mood: string;date: string;};
};
//create screens
const Stack = createStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen
          name="Login"
          component={Loginpage}
          //options={{ title: 'Login' }}
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen
          name="Profile"
          component={Profile}
          //options={{ title: 'Profile' }}
          options={{ title: 'Profile', headerLeft: () => null, headerShown: false }}
        />
        
        <Stack.Screen
          name="JournalEntry"
          component={JournalEntry}
          //options={{ title: 'Journal Entry' }}
          options={{ title: 'JournalEntry', headerLeft: () => null, }}
        />
        
        <Stack.Screen
          name="JournalHistory"
          component={JournalHistory}
          options={{ title: 'Journal History', headerShown: true }}
          //options={{ title: 'Previous Entries' }}
          //options={{ headerShown: false }} 
        />
        
        <Stack.Screen
          name="MoodTracker"
          component={MoodTracker}
          options={{ title: 'Mood Tracker'}}
        />
        
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'SignUp'}}
        />
         
        <Stack.Screen
          name="JournalView"
          component={JournalView}
          options={{ title: 'JournalView'}}
          //options={{ headerShown: false }} 
        />
        
        <Stack.Screen
          name="Chatbot"
          component={Chatbot}
          options={{ title: 'Chatbot'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

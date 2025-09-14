import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import SavedScreen from './screens/savedScreen';
import ComingSoonScreen from './screens/ComingSoonScreen';
import BottomNavigation from './components/BottomNavigation';

type TabType = 'Home' | 'Profile' | 'Saved';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Saved');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <ComingSoonScreen title="Home" />;
      case 'Profile':
        return <ComingSoonScreen title="Profile" />;
      case 'Saved':
        return <SavedScreen />;
      default:
        return <ComingSoonScreen title="Home" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

export default App;
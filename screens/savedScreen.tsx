import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import CollectionsScreen from './CollectionsScreen';
import OutfitsScreen from './OutfitsScreen';
import ItemsScreen from './ItemsScreen';
import { mockItems, mockOutfits, mockCollections } from '../data/mockData';

type TabType = 'Collections' | 'Outfits' | 'Items';

const SavedScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Collections');

  const tabs: TabType[] = ['Collections', 'Outfits', 'Items'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Collections':
        return <CollectionsScreen collections={mockCollections} />;
      case 'Outfits':
        return <OutfitsScreen outfits={mockOutfits} />;
      case 'Items':
        return <ItemsScreen items={mockItems} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved</Text>
      </View>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.spacer} />
      <View style={styles.content}>{renderContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    top: 20,
    fontWeight: '700',  
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#1F2937',
  },
  spacer: {
    height:8, 
    backgroundColor: '#FFFF', 
  },
  content: {
    flex: 1,
  },
});

export default SavedScreen;
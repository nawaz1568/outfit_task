import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

type TabType = 'Home' | 'Profile' | 'Saved';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const { width } = Dimensions.get('window');

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'Home', label: 'Home', icon: '🏠' },
    { key: 'Profile', label: 'Profile', icon: '👔' },
    { key: 'Saved', label: 'Saved', icon: '📱' },
  ];

  const TabIcon: React.FC<{ type: TabType; isActive: boolean }> = ({ type, isActive }) => {
    const getIcon = () => {
      switch (type) {
        case 'Home':
          return (
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <View style={[styles.homeIcon, isActive && styles.activeIcon]} />
            </View>
          );
        case 'Profile':
          return (
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <View style={[styles.outfitsIcon, isActive && styles.activeIcon]} />
            </View>
          );
        case 'Saved':
          return (
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <View style={[styles.itemsIcon, isActive && styles.activeIcon]} />
            </View>
          );
        default:
          return null;
      }
    };

    return getIcon();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.7}
          >
            <TabIcon type={tab.key} isActive={activeTab === tab.key} />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    paddingBottom: 20, 
  },
  tabContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeIconContainer: {
  },
  homeIcon: {
    width: 20,
    height: 18,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 3,
    position: 'relative',
  },
  outfitsIcon: {
    width: 18,
    height: 20,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 2,
  },
  itemsIcon: {
    width: 16,
    height: 20,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 3,
  },
activeIcon: {
  borderColor: '#800000',   
  backgroundColor: '#9f414fff', 
},

  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 2,
  },
  activeTabText: {
    color: '#1F2937',
    fontWeight: '600',
  },
});

export default BottomNavigation;     
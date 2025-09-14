import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface FilterBarProps {
  options: string[];
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selectedFilters,
  onFiltersChange,
}) => {
  const toggleFilter = (filter: string) => {
    const isSelected = selectedFilters.includes(filter);
    if (isSelected) {
      onFiltersChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFiltersChange([...selectedFilters, filter]);
    }
  };

  // Add some default filter options that match the design
  const defaultFilters = ['Add topic', 'Work', 'Leisure', 'Chic'];
  const allOptions = [...defaultFilters, ...options.filter(opt => !defaultFilters.includes(opt))];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {allOptions.map((option, index) => {
        const isSelected = selectedFilters && Array.isArray(selectedFilters) && selectedFilters.includes(option);
        return (
          <TouchableOpacity
            key={`${option}-${index}`}
            style={[
              styles.filterChip,
              isSelected && styles.selectedChip,
              option === 'Add topic' && styles.addTopicChip,
            ]}
            onPress={() => toggleFilter(option)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                isSelected && styles.selectedText,
                option === 'Add topic' && styles.addTopicText,
              ]}
            >
              {option === 'Add topic' ? '+ Add topic' : option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingRight: 16,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedChip: {
    backgroundColor: '#1F2937',
    borderColor: '#1F2937',
  },
  addTopicChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  addTopicText: {
    color: '#6B7280',
  },
});

export default FilterBar; 
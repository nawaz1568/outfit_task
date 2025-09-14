import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import FilterBar from '../components/FilterBar';
import { Outfit } from '../types';

interface OutfitsScreenProps {
  outfits: Outfit[];
}

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemSpacing = 12;
const horizontalPadding = 16;
const itemWidth = (width - horizontalPadding * 2 - itemSpacing * (numColumns - 1)) / numColumns;

const OutfitsScreen: React.FC<OutfitsScreenProps> = ({ outfits }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const filterOptions = useMemo(() => {
    const allTags = new Set<string>();
    outfits.forEach(outfit => {
      outfit.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  }, [outfits]);

  const filteredOutfits = useMemo(() => {
    if (!outfits || !Array.isArray(outfits)) return [];
    if (selectedFilters.length === 0) return outfits;
    return outfits.filter(outfit =>
      outfit.tags && Array.isArray(outfit.tags) &&
      selectedFilters.some(filter => outfit.tags.includes(filter))
    );
  }, [outfits, selectedFilters]);

  const renderOutfit = ({ item, index }: { item: Outfit; index: number }) => {
    const isEven = index % 2 === 0;
    
    return (
      <TouchableOpacity 
        style={[
          styles.outfitCard,
          { 
            width: itemWidth,
            marginRight: isEven ? itemSpacing : 0,
          }
        ]}
        activeOpacity={0.95}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.items.top.image }} 
            style={styles.outfitImage}
            resizeMode="cover"
          />
          <View style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Saved</Text>
          </View>
        </View>
        
        <View style={styles.outfitInfo}>
          <Text style={styles.outfitTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.occasionText}>
            {item.occasion}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FilterBar
        options={filterOptions}
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />

      <FlatList
        data={filteredOutfits}
        renderItem={renderOutfit}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: itemSpacing }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: horizontalPadding,
    paddingTop: 10,
  },
  listContainer: {
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  outfitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: itemSpacing,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: itemWidth * 1.3,
  },
  outfitImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  outfitInfo: {
    padding: 12,
  },
  outfitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  occasionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export default OutfitsScreen;
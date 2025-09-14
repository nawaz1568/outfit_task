import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import FilterBar from '../components/FilterBar';
import { Collection } from '../types';

interface CollectionsScreenProps {
  collections: Collection[];
}

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemSpacing = 12;
const horizontalPadding = 16;
const itemWidth = (width - horizontalPadding * 2 - itemSpacing * (numColumns - 1)) / numColumns;

const CollectionsScreen: React.FC<CollectionsScreenProps> = ({ collections }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const filterOptions = useMemo(() => {
    const allTags = new Set<string>();
    collections.forEach(collection => {
      collection.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  }, [collections]);

  const filteredCollections = useMemo(() => {
    if (!collections || !Array.isArray(collections)) return [];
    if (selectedFilters.length === 0) return collections;
    return collections.filter(collection =>
      collection.tags && Array.isArray(collection.tags) &&
      selectedFilters.some(filter => collection.tags.includes(filter))
    );
  }, [collections, selectedFilters]);

  const renderCollection = ({ item, index }: { item: Collection; index: number }) => {
    const isEven = index % 2 === 0;
    
    return (
      <TouchableOpacity 
        style={[
          styles.collectionCard,
          { 
            width: itemWidth,
            marginRight: isEven ? itemSpacing : 0,
          }
        ]}
        activeOpacity={0.95}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.coverImage }} 
            style={styles.collectionImage}
            resizeMode="cover"
          />
          <View style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Saved</Text>
          </View>
        </View>
        
        <View style={styles.collectionInfo}>
          <Text style={styles.collectionTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.itemCount}>
            {item.itemCount} items
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
        data={filteredCollections}
        renderItem={renderCollection}
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
  collectionCard: {
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
  collectionImage: {
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
  collectionInfo: {
    padding: 12,
  },
  collectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  itemCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default CollectionsScreen;
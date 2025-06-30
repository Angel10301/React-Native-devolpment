import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import * as FileSystem from 'expo-file-system'; // FileSystem for file handling
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for persistent storage

// BookShelf component serves as the initial landing screen for "BookShelf" tab.
const BookShelf = () => {
  const [pdfs, setPdfs] = useState([]);
  // useEffect hook to load PDFs from AsyncStorage or FileSystem on component mount
  useEffect(() => {
    const loadPdfs = async () => {
      const storedPdfs = await AsyncStorage.getItem('uploadedPdfs');
      if (storedPdfs) setPdfs(JSON.parse(storedPdfs));
      else {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory); // Read files from document directory
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        const pdfUris = pdfFiles.map(file => `${FileSystem.documentDirectory}${file}`);
        await AsyncStorage.setItem('uploadedPdfs', JSON.stringify(pdfUris));
        setPdfs(pdfUris);
      }
    };
    loadPdfs();
  }, []); 
  const renderItem = ({ item }) => ( // Render each PDF item in the FlatList
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.split('/').pop() || 'Untitled PDF'}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Bookify</Text>
      <Text style={styles.subtitle}>Your Bookified PDFs</Text>
      <FlatList
        data={pdfs}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ padding: 10 }}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No PDFs uploaded yet.</Text>}
      />
    </View>
  );
};
// StyleSheet for BookShelf component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  item: {
    width: '40%',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
  },
});

export default BookShelf;
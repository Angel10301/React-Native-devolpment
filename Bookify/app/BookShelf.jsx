import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import * as FileSystem from 'expo-file-system'; // FileSystem for file handling
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for persistent storage

// BookShelf component serves as the initial landing screen for "BookShelf" tab.
const BookShelf = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const loadPdfs = async () => {
      const storedPdfs = await AsyncStorage.getItem('uploadedPdfs');
      if (storedPdfs) setPdfs(JSON.parse(storedPdfs));
      else {
        const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        const pdfUris = pdfFiles.map(file => `${FileSystem.documentDirectory}${file}`);
        await AsyncStorage.setItem('uploadedPdfs', JSON.stringify(pdfUris));
        setPdfs(pdfUris);
      }
    };
    loadPdfs();
  }, []); 
  const renderItem = ({ item }) => (
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
        numColumns={3}
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
// StyleSheet for HomeScreen component
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
  },
});

export default BookShelf;
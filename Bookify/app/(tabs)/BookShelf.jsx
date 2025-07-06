import React, {useEffect, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet,ActivityIndicator} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useNavigation} from '@react-navigation/native'; 
import { checkFirstLaunch } from '../utils/firstLaunchCheck';


const BookShelf = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const navigation = useNavigation();


  // check if it's the first launch
  useEffect(() => {
    const init = async () => {
      const firstTime = await checkFirstLaunch();
      setIsFirstLaunch(firstTime);
    };
    init();
  }, []);


  //  if not the first L, Load PDF files
  useEffect(() => {
    if (isFirstLaunch === false) {
      const loadPdfFiles = async () => {
        try {
          const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
          const pdfs = await Promise.all(
            files
              .filter((file) => file.endsWith('.pdf'))
              .map(async (file) => {
                const info = await FileSystem.getInfoAsync('${FileSystem.documentDirectory}${file}');
                return {
                  name: file,
                  uri: info.uri,
                  size: (info.size / (1024 * 1024)).toFixed(2), // size in MB
                  modified: new Date(info.modificationTime * 1000).toLocaleDateString(),
                };
              })
          );
          setPdfFiles(pdfs);
        } catch (error) {
          console.error('Error loading PDF files:', error);
        } finally {
          setLoadingPDFfiles(false);
        }
      };
      loadPdfFiles();
  
    }
    }, [isFirstLaunch]);

    
  // Checking AsyncStorage for first launch
  if (isFirstLaunch === null) {
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large"/>
      </View>
    );
  }

    
  // First Time Launch Welcome Screen
  if (isFirstLaunch) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Bookify!</Text>
        <Text style={styles.subtitle}>Read a bookifed PDF</Text>
      </View>
    );
  }

  // PDF loading: Spinner
  if (loadingPDFs) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <text style={styles.subtitle}>Loading your PDFs...</text>
      </View>
    );
  }

  // Displaying PDF files
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('PDFViewerScreen', {uri: item.uri})}
    >
      <Text style={styles.bookTitle}>{item.name}</Text>
      <Text style={styles.meta}>{item.size} MB - Last modified: {item.modified}</Text>
    </TouchableOpacity>
  );

  // Show bookshelf
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookshelf</Text>
      <FlatList
        data={pdfFiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No PDF files uploaded yet.</Text> }
      />
    </View>
  );
};


// Styles for the BookShelf component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {  
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontsize : 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  bookItem: {
    backgroundColor: '#e4e4e4',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '000',
  },
  meta: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },

});

export default BookShelf;


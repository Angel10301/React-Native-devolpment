import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system'; // Importing FileSystem for file handling
import * as DocumentPicker from 'expo-document-picker'; // Importing DocumentPicker for file selection
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importing AsyncStorage for persistent storage


// PdfUpload component provides UI and logic for PDF upload functionality
const PdfUpload = () => {
  const [fileUri, setFileUri] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (result.assets && !result.canceled) {
        const uri = result.assets[0].uri;
        const newUri = `${FileSystem.documentDirectory}uploaded.pdf`;
        await FileSystem.copyAsync({ from: uri, to: newUri });
        setFileUri(newUri);
        const storedPdfs = await AsyncStorage.getItem('uploadedPdfs');
        const updatedPdfs = storedPdfs ? JSON.parse(storedPdfs) : [];
        updatedPdfs.push(newUri);
        await AsyncStorage.setItem('uploadedPdfs', JSON.stringify(updatedPdfs));
        Alert.alert('Success', 'PDF uploaded and stored!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload PDF');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={pickDocument} // Triggers PDF selection instead of alert
      >
        <Text style={styles.buttonText}>Select PDF to upload!</Text>
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet for PdfUpload component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default PdfUpload;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// HomeScreen component serves as the intital landing screen for "BookShelf" tab.
const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Bookify</Text>
    <Text style={styles.subtitle}>Read a bookified PDF</Text>
  </View>
);
// StyleSheet for HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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

export default HomeScreen;
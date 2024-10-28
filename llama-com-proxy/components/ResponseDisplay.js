// ResponseDisplay.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ResponseDisplay({ messages }) {
  return (
    <ScrollView style={styles.container}>
      {messages.map((msg, index) => (
        <Text key={index} style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
          {msg.content}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1ffd1',
    padding: 5,
    borderRadius: 5,
    marginVertical: 2,
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderRadius: 5,
    marginVertical: 2,
  },
});

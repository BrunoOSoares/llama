// App.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import InputPrompt from './components/InputPrompt';
import ResponseDisplay from './components/ResponseDisplay';
import { sendMessageToLLM } from './components/Api';

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (input) => {
    if (input.trim()) {
      const newMessage = { role: 'user', content: input };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      const response = await sendMessageToLLM(updatedMessages);
      if (response) {
        setMessages((prev) => [...prev, response]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ResponseDisplay messages={messages} />
      <InputPrompt onSend={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

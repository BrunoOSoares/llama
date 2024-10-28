import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function InputPrompt({ onSendPrompt }) {
  const [prompt, setPrompt] = useState('');
  const [networkStatus, setNetworkStatus] = useState('');

  useEffect(() => {
    async function checkNetworkStatus() {
      try {
        const status = await Network.getNetworkStateAsync();
        setNetworkStatus(status.isConnected ? 'Conectado' : 'Desconectado');
      } catch (error) {
        console.error('Erro ao verificar o status da rede:', error);
        setNetworkStatus('Erro ao verificar a rede');
      }
    }

    checkNetworkStatus();
  }, []);

  const handleSend = async () => {
    try {
      const response = await fetch('https://seu-proxy-url.com/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: prompt }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Erro ao enviar o prompt:', error);
    }
    onSendPrompt(prompt);
    setPrompt('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu prompt"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Enviar" onPress={handleSend} />
      <Text style={styles.networkStatus}>{networkStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  networkStatus: {
    marginTop: 10,
    color: 'red',
    fontSize: 14,
  },
});

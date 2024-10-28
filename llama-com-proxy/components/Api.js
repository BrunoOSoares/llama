// api.js
export async function sendMessageToLLM(messages) {
  const apiKey = 'Bearer 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'; // Substitua pela sua chave
  const url = 'https://api-inference.huggingface.co/models/Llama-3.1-8B';

  const userMessage = messages[messages.length - 1].content;

  const body = {
    inputs: userMessage,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data && data.length > 0 && data[0].generated_text) {
      return { role: 'assistant', content: data[0].generated_text };
    }
    return null;
  } catch (error) {
    console.error('Erro ao chamar API:', error);
    return null;
  }
}

const express = require('express');
const app = express();

app.use(express.json());

// ⚠️ QUESTA PARTE È ESSENZIALE ⚠️
app.post('/alexa', (req, res) => {  // <- DEVE ESSERE .post() NON .get()
  console.log('✅ Richiesta Alexa ricevuta!');
  
  res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Perfetto! Alexa è connessa al server. Funziona!"
      },
      shouldEndSession: false
    }
  });
});

// Health check (GET)
app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'Server Alexa pronto!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server avviato sulla porta ${PORT}`);
});

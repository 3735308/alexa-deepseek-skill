const express = require('express');
const app = express();

app.use(express.json());

// Endpoint Alexa
app.post('/alexa', (req, res) => {
  console.log('✅ Richiesta Alexa ricevuta!', JSON.stringify(req.body, null, 2));
  
  res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Ottimo! Connessione ad Alexa riuscita! Il server funziona correttamente su Render."
      },
      shouldEndSession: false
    }
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'Server Alexa pronto su Render!',
    timestamp: new Date().toISOString()
  });
});

// ⚠️ **IMPORTANTE: Configurazione porta per Render**
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server avviato sulla porta ${PORT} (host: 0.0.0.0)`);
});

const express = require('express');
const app = express();

app.use(express.json());

// Endpoint principale per Alexa
app.post('/alexa', (req, res) => {
  console.log('Richiesta ricevuta da Alexa:', JSON.stringify(req.body, null, 2));
  
  const { request } = req.body;
  
  // Gestione Launch Request
  if (request.type === 'LaunchRequest') {
    return res.json({
      version: "1.0",
      response: {
        outputSpeech: {
          type: "PlainText",
          text: "Ciao! Sono il tuo assistente DeepSeek su Render. Cosa vuoi sapere oggi?"
        },
        shouldEndSession: false
      }
    });
  }
  
  // Gestione Intent Request
  if (request.type === 'IntentRequest') {
    const intentName = request.intent.name;
    
    if (intentName === 'ChatIntent') {
      const userMessage = request.intent.slots.Message?.value || 'Ciao';
      
      // RISPOSTA PROVVISORIA - POI AGGIUNGEREMO DEEPSEEK
      const responseText = `Su Render funziona! Hai detto: "${userMessage}". Prossimo passo: integrare DeepSeek API!`;
      
      return res.json({
        version: "1.0",
        response: {
          outputSpeech: {
            type: "PlainText",
            text: responseText
          },
          shouldEndSession: false
        }
      });
    }
  }
  
  // Risposta di default
  res.json({
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Scusa, non ho capito. Puoi ripetere per favore?"
      },
      shouldEndSession: false
    }
  });
});

// Health check per Render
app.get('/', (req, res) => {
  res.send('Alexa DeepSeek Skill is running on Render!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Alexa running on port ${PORT}`);
});

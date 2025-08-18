require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Validar que la API key esté configurada
if (!GEMINI_API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY no está configurada en las variables de entorno');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para producción
app.use(cors({
  origin: true, // Permitir todos los orígenes temporalmente
  credentials: true
}));

app.use(express.json());

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

// Ruta para recibir mensajes y consultar Gemini
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Eres un asistente virtual especializado de ISA Automation El Salvador (International Society of Automation, sección El Salvador).

INFORMACIÓN SOBRE LA EMPRESA:
- ISA Automation El Salvador es la sección local de la International Society of Automation
- Nos dedicamos a promover la automatización industrial y la tecnología en El Salvador
- Ofrecemos servicios de asesoría técnica, capacitación y networking profesional

MISIÓN:
Avanzar en la competencia técnica conectando a la comunidad de automatización, hacia la excelencia operativa

VISIÓN:
Crear un mundo mejor a través de la automatización

SERVICIOS QUE OFRECEMOS:
- Capacitaciones en automatización industrial
- Cursos de instrumentación y control
- Talleres técnicos especializados
- Networking con profesionales del sector
- Recursos educativos y técnicos

INFORMACIÓN DE CONTACTO:
- Dirección: 3a Calle Poniente #5261, San Salvador
- Teléfono: (503) 2243-1346
- Email: info@isa.org.sv

INSTRUCCIONES:
- Responde solo sobre ISA Automation El Salvador
- Si la pregunta no es relevante, redirige amablemente al tema de automatización
- Mantén un tono profesional pero cercano
- Incluye información de contacto cuando sea apropiado
- Usa la información específica de misión, visión y contacto que te proporcioné

Usuario: ${message}
Asistente:`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,        // Controla la creatividad (0-1)
          maxOutputTokens: 300,    // Longitud máxima de respuesta
          topP: 0.8,              // Controla la diversidad de respuestas
          topK: 40                 // Controla la selección de tokens
        }
      }
    );

    const botReply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply: botReply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error al comunicarse con Gemini' });
  }
});

// Ruta para verificar que el servidor esté funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// En producción, servir la app de React
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
}); 
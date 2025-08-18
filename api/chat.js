const axios = require('axios');

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  try {
    // API key hardcodeada directamente
    const GEMINI_API_KEY = 'AIzaSyDu7LldkmBqqxMfToNEV_jOTclxFJHZfkA';
    
    console.log('Enviando mensaje a Gemini:', message);

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
          temperature: 0.3,
          maxOutputTokens: 300,
          topP: 0.8,
          topK: 40
        }
      }
    );

    const botReply = response.data.candidates[0].content.parts[0].text;
    console.log('Respuesta de Gemini:', botReply);
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error en API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al comunicarse con Gemini' });
  }
}; 
export default async function handler(req, res) {
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
    // API key de Gemini
    const GEMINI_API_KEY = 'AIzaSyCPwgmho1lHYCw43aIjEWh2JS4kqJ-ypww';
    
    console.log('Enviando mensaje a Gemini:', message);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Eres EinsteinISA, asistente virtual de ISA Automation El Salvador.

INFORMACIÓN CLAVE:
- EinsteinISA es la sección local de International Society of Automation
- Misión: Avanzar en la competencia técnica conectando a la comunidad de automatización
- Visión: Crear un mundo mejor a través de la automatización
- Contacto: 3a Calle Poniente #5261, San Salvador | (503) 2243-1346 | info@isa.org.sv

SERVICIOS:
- 6 programas específicos de formación
- 8 áreas principales en automatización
- Capacitaciones en PLC, HMI, Sensórica, Variadores, Servosistemas
- Certificaciones internacionales

INSTRUCCIONES:
- Responde en máximo 2-3 oraciones
- Sé directo y específico
- Mantén un tono profesional pero amigable
- Incluye información de contacto cuando sea apropiado

Usuario: ${message}
Asistente:`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 200,
            topP: 0.7,
            topK: 30
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.candidates[0].content.parts[0].text;
    console.log('Respuesta de Gemini:', botReply);
    res.json({ reply: botReply });
    
  } catch (error) {
    console.error('Error completo:', error);
    console.error('Error message:', error.message);
    
    // Respuesta de fallback
    const fallbackReply = 'Disculpa, estoy teniendo problemas para conectar con mi sistema de IA. Te puedo ayudar con información básica sobre EinsteinISA: somos la sección local de la International Society of Automation, dedicados a promover la automatización industrial en El Salvador. Puedes contactarnos al (503) 2243-1346 o info@isa.org.sv';
    
    res.status(500).json({ 
      error: 'Error al comunicarse con Gemini',
      details: error.message,
      fallback: fallbackReply
    });
  }
}
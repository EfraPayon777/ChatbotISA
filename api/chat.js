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

  try {
    console.log('Petición recibida:', req.body);
    
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // API key de Gemini hardcodeada
    const GEMINI_API_KEY = 'AIzaSyDu7LldkmBqqxMfToNEV_jOTclxFJHZfkA';
    
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
- Certificaciones internacionales reconocidas
- Eventos técnicos y conferencias
- Programas de membresía profesional

INFORMACIÓN DE CONTACTO:
- Dirección: 3a Calle Poniente #5261, San Salvador
- Teléfono: (503) 2243-1346
- Email: info@isa.org.sv

TECNOLOGÍAS QUE PROMOVEMOS:
- Sistemas de control industrial (DCS, PLC, SCADA)
- Instrumentación y medición de procesos
- Automatización de procesos industriales
- IoT industrial y Industria 4.0
- Control de calidad y seguridad industrial
- Eficiencia energética y sostenibilidad

INSTRUCCIONES:
- Responde SOLO sobre ISA Automation El Salvador y temas de automatización industrial
- Si la pregunta no es relevante, redirige amablemente al tema de automatización
- Mantén un tono profesional pero cercano
- Incluye información de contacto cuando sea apropiado
- Usa la información específica de misión, visión y contacto que te proporcioné
- Sé específico y detallado en tus respuestas
- Si te preguntan sobre tecnologías, menciona las que promovemos
- Si te preguntan sobre eventos, menciona que organizamos conferencias y workshops

Usuario: ${message}
Asistente:`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,        // Controla la creatividad (0-1)
            maxOutputTokens: 500,    // Longitud máxima de respuesta
            topP: 0.8,              // Controla la diversidad de respuestas
            topK: 40                 // Controla la selección de tokens
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
    
    // Respuesta de fallback si Gemini falla
    let fallbackReply = 'Disculpa, estoy teniendo problemas para conectar con mi sistema de IA. Te puedo ayudar con información básica sobre ISA Automation El Salvador: somos la sección local de la International Society of Automation, dedicados a promover la automatización industrial en El Salvador.';
    
    res.status(500).json({ 
      error: 'Error al comunicarse con Gemini',
      details: error.message,
      fallback: fallbackReply
    });
  }
} 
const axios = require('axios');

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
    // Primero, probar una respuesta simple
    console.log('Petición recibida:', req.body);
    
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Por ahora, devolver una respuesta simple para probar
    if (message.includes('ISA') || message.includes('isa')) {
      return res.json({ 
        reply: 'ISA Automation El Salvador es la sección local de la International Society of Automation. Nos dedicamos a promover la automatización industrial y la tecnología en El Salvador. Nuestra misión es avanzar en la competencia técnica conectando a la comunidad de automatización, hacia la excelencia operativa.'
      });
    }

    // Si no es sobre ISA, redirigir al tema
    return res.json({ 
      reply: 'Te ayudo con información sobre ISA Automation El Salvador. ¿Podrías reformular tu pregunta para que sea sobre automatización industrial o ISA?'
    });

  } catch (error) {
    console.error('Error completo:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error message:', error.message);
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message
    });
  }
} 
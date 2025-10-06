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

  // Permitir POST y GET (GET solo para pruebas)
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'API funcionando correctamente',
      method: 'GET',
      timestamp: new Date().toISOString()
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  try {
    console.log('Mensaje recibido:', message);
    
    // Respuesta simple sin IA por ahora
    const botReply = `Hola! Soy EinsteinISA, el asistente virtual de ISA Automation El Salvador. 
    
    Somos la sección local de la International Society of Automation en El Salvador.
    
    Nuestra misión es avanzar en la competencia técnica conectando a la comunidad de automatización.
    
    Para más información, contáctanos:
    📧 info@isa.org.sv
    📞 (503) 2243-1346
    📍 3a Calle Poniente #5261, San Salvador`;
    
    console.log('Respuesta enviada:', botReply);
    res.json({ reply: botReply });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
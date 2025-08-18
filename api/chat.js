export default function handler(req, res) {
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

    // Respuesta simple y directa
    let reply = '';
    
    if (message.toLowerCase().includes('isa')) {
      reply = 'ISA Automation El Salvador es la sección local de la International Society of Automation. Nos dedicamos a promover la automatización industrial y la tecnología en El Salvador. Nuestra misión es avanzar en la competencia técnica conectando a la comunidad de automatización, hacia la excelencia operativa.';
    } else if (message.toLowerCase().includes('misión') || message.toLowerCase().includes('vision')) {
      reply = 'MISIÓN: Avanzar en la competencia técnica conectando a la comunidad de automatización, hacia la excelencia operativa. VISIÓN: Crear un mundo mejor a través de la automatización.';
    } else if (message.toLowerCase().includes('contacto') || message.toLowerCase().includes('contactar')) {
      reply = 'Puedes contactarnos en: Dirección: 3a Calle Poniente #5261, San Salvador. Teléfono: (503) 2243-1346. Email: info@isa.org.sv';
    } else if (message.toLowerCase().includes('servicio') || message.toLowerCase().includes('capacitación')) {
      reply = 'Ofrecemos: Capacitaciones en automatización industrial, cursos de instrumentación y control, talleres técnicos especializados, networking con profesionales del sector, y recursos educativos.';
    } else {
      reply = 'Te ayudo con información sobre ISA Automation El Salvador. ¿Podrías reformular tu pregunta para que sea sobre automatización industrial o ISA?';
    }

    console.log('Enviando respuesta:', reply);
    return res.json({ reply: reply });

  } catch (error) {
    console.error('Error en API:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message
    });
  }
} 
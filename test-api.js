const axios = require('axios');

async function testAPI() {
  try {
    console.log('🧪 Probando API localmente...');
    
    const response = await axios.post('http://localhost:3000/api/chat', {
      message: '¿Qué es ISA Automation?'
    });
    
    console.log('✅ API funcionando correctamente');
    console.log('Respuesta:', response.data.reply);
  } catch (error) {
    console.error('❌ Error en la API:', error.message);
  }
}

testAPI(); 
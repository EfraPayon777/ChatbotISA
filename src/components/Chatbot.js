import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://chatbot-isa-kqhm.vercel.app';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente virtual de ISA Automation El Salvador. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Preguntas preestablecidas
  const presetQuestions = [
    { text: '¿Qué es ISA?', icon: '🏢' },
    { text: '¿Cuál es nuestra Misión y Visión?', icon: '🎯' },
    { text: '¿Cómo contactarnos?', icon: '📞' },
    { text: '¿Qué servicios ofrecen?', icon: '⚙️' },
    { text: '¿Tienen capacitaciones?', icon: '📚' }
  ];

  // Información de contacto
  const contactInfo = {
    address: '3a Calle Poniente #5261, San Salvador',
    phone: '(503) 2243-1346',
    email: 'info@isa.org.sv',
    mission: 'Avanzar en la competencia técnica conectando a la comunidad de automatización, hacia la excelencia operativa',
    vision: 'Crear un mundo mejor a través de la automatización'
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages([...messages, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const url = `${backendUrl}/api/chat`;
      console.log('Enviando petición a:', url);
      console.log('Mensaje:', userMsg);
      
      const res = await axios.post(url, { message: userMsg });
      console.log('Respuesta exitosa:', res.data);
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error('Error en la petición:', err);
      console.error('URL intentada:', `${backendUrl}/api/chat`);
      setMessages(prev => [...prev, { from: 'bot', text: 'Ocurrió un error al conectar con la IA.' }]);
    }
    setLoading(false);
  };

  const handlePresetQuestion = async (question) => {
    setMessages(prev => [...prev, { from: 'user', text: question }]);
    setLoading(true);

    try {
      const url = `${backendUrl}/api/chat`;
      console.log('Enviando pregunta preestablecida a:', url);
      console.log('Pregunta:', question);
      
      const res = await axios.post(url, { message: question });
      console.log('Respuesta exitosa:', res.data);
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      console.error('Error en pregunta preestablecida:', err);
      console.error('URL intentada:', `${backendUrl}/api/chat`);
      setMessages(prev => [...prev, { from: 'bot', text: 'Ocurrió un error al conectar con la IA.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '40px auto', 
      background: '#ffffff', 
      borderRadius: 20, 
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
      fontFamily: 'Segoe UI, Arial, sans-serif', 
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #005bea 0%, #007bff 100%)', 
        color: '#fff', 
        padding: '24px', 
        fontSize: '1.4rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        letterSpacing: 1 
      }}>
        ISA Automation El Salvador
      </div>

      {/* Contenido principal */}
      <div style={{ display: 'flex', height: '600px' }}>
        {/* Panel izquierdo - Preguntas preestablecidas */}
        <div style={{ 
          width: '300px', 
          background: '#f8fafc', 
          borderRight: '1px solid #e5e7eb',
          padding: '20px'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '1.1rem' }}>
            Preguntas frecuentes
          </h3>
          
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetQuestion(q.text)}
              style={{
                width: '100%',
                padding: '12px 16px',
                margin: '8px 0',
                background: '#fff',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.9rem',
                color: '#374151',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.background = '#fff'}
            >
              <span style={{ fontSize: '1.2rem' }}>{q.icon}</span>
              {q.text}
            </button>
          ))}

          {/* Información de contacto */}
          <div style={{ 
            marginTop: '30px', 
            padding: '16px', 
            background: '#fff', 
            borderRadius: '12px',
            border: '1px solid #d1d5db'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#374151' }}>📞 Contacto</h4>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.5 }}>
              <div><strong>📍</strong> {contactInfo.address}</div>
              <div><strong>📞</strong> {contactInfo.phone}</div>
              <div><strong>✉️</strong> {contactInfo.email}</div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Área de mensajes */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            background: '#fff',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '8px'
              }}>
                <div style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  fontSize: '0.95rem',
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                                     background: msg.from === 'user' ? '#005bea' : '#f3f4f6',
                   color: msg.from === 'user' ? '#fff' : '#374151',
                   borderBottomLeftRadius: msg.from === 'bot' ? '4px' : '18px',
                   borderBottomRightRadius: msg.from === 'user' ? '4px' : '18px',
                   boxShadow: msg.from === 'user' ? '0 2px 8px rgba(0, 91, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginBottom: '8px'
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '18px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}>
                  Escribiendo...
                </div>
              </div>
            )}
          </div>

          {/* Área de input */}
          <div style={{ 
            borderTop: '1px solid #e5e7eb', 
            background: '#fff', 
            padding: '20px'
          }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                                 onFocus={(e) => e.target.style.borderColor = '#005bea'}
                 onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <button 
                type="submit" 
                disabled={loading}
                                 style={{
                   background: 'linear-gradient(135deg, #005bea 0%, #007bff 100%)',
                   color: '#fff',
                   border: 'none',
                   borderRadius: '12px',
                   padding: '12px 24px',
                   fontSize: '0.95rem',
                   fontWeight: '600',
                   cursor: 'pointer',
                   transition: 'transform 0.2s',
                   minWidth: '80px'
                 }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

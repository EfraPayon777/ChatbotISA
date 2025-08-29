import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://chatbot-isa-kqhm.vercel.app';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy el asistente virtual de EinsteinISA. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Preguntas preestablecidas
  const presetQuestions = [
    { text: '¿Qué es EinsteinISA?', icon: '🏢' },
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
    
    // En móviles, cerrar sidebar después de hacer pregunta
    setShowSidebar(false);
  };

  // Detectar si es móvil
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh',
      background: '#ffffff', 
      fontFamily: 'Segoe UI, Arial, sans-serif', 
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #005bea 0%, #007bff 100%)', 
        color: '#fff', 
        padding: '16px 20px', 
        fontSize: '1.2rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        position: 'relative',
        flexShrink: 0
      }}>
        EinsteinISA
        
        {/* Botón de menú para móviles */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#fff'
          }}
        >
          ☰
        </button>
      </div>

      {/* Contenido principal */}
      <div style={{ 
        display: 'flex', 
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Panel izquierdo - Preguntas preestablecidas */}
        <div style={{ 
          width: isMobile ? '280px' : '300px', 
          background: '#f8fafc', 
          borderRight: '1px solid #e5e7eb',
          padding: '20px',
          overflowY: 'auto',
          position: isMobile ? 'absolute' : 'relative',
          left: isMobile ? (showSidebar ? '0' : '-100%') : '0',
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transition: 'left 0.3s ease',
          boxShadow: isMobile && showSidebar ? '2px 0 10px rgba(0,0,0,0.1)' : 'none'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            color: '#374151', 
            fontSize: '1.1rem' 
          }}>
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
            <h4 style={{ 
              margin: '0 0 12px 0', 
              color: '#374151',
              fontSize: '1rem'
            }}>📞 Contacto</h4>
            <div style={{ 
              fontSize: '0.85rem', 
              color: '#6b7280', 
              lineHeight: 1.5 
            }}>
              <div><strong>📍</strong> {contactInfo.address}</div>
              <div><strong>📞</strong> {contactInfo.phone}</div>
              <div><strong>✉️</strong> {contactInfo.email}</div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Chat */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minWidth: 0,
          background: '#fff'
        }}>
          {/* Área de mensajes */}
          <div style={{ 
            flex: 1, 
            padding: '20px', 
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
                  maxWidth: '85%',
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
            padding: '20px',
            flexShrink: 0
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

      {/* Overlay para móviles cuando sidebar está abierto */}
      {isMobile && showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999
          }}
        />
      )}
    </div>
  );
};

export default Chatbot;

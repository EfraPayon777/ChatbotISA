import React from 'react';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#101624',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Chatbot />
    </div>
  );
}

export default App;

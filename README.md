# Chatbot ISA Automation El Salvador

Un asistente virtual inteligente para ISA Automation El Salvador, construido con React y Node.js, que utiliza la API de Google Gemini para proporcionar respuestas contextuales sobre automatización industrial.

## Características

- 🤖 Chatbot inteligente con IA de Google Gemini
- 💬 Interfaz de chat moderna y responsiva
- 📱 Diseño adaptativo para dispositivos móviles
- 🔍 Preguntas preestablecidas para acceso rápido
- 📞 Información de contacto integrada
- 🎯 Respuestas especializadas en automatización industrial

## Tecnologías Utilizadas

- **Frontend**: React 19, CSS3
- **Backend**: Node.js, Express.js
- **IA**: Google Gemini API
- **Despliegue**: Vercel, Netlify, Render

## Instalación Local

### Prerrequisitos
- Node.js 18+ 
- npm

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/chatbot-isa.git
   cd chatbot-isa
   ```

2. **Instalar dependencias del frontend**
   ```bash
   npm install
   ```

3. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configurar variables de entorno**
   ```bash
   cp backend/env.example backend/.env
   # Edita backend/.env con tu API key de Gemini
   ```

5. **Ejecutar en desarrollo**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   npm start
   ```

## Despliegue

Para desplegar tu chatbot en la web de forma gratuita, consulta la [guía completa de despliegue](DEPLOYMENT.md).

### Opciones de Despliegue Gratuito

- **Vercel** (Recomendado) - Despliegue full-stack
- **Netlify** - Frontend estático
- **Render** - Backend y frontend separados

## Uso

1. Abre la aplicación en tu navegador
2. Selecciona una pregunta preestablecida o escribe tu consulta
3. El chatbot responderá con información especializada sobre ISA Automation
4. Consulta información de contacto y servicios disponibles

## Estructura del Proyecto

```
chatbot-isa/
├── src/                    # Código fuente de React
│   ├── components/         # Componentes de la aplicación
│   │   └── Chatbot.js     # Componente principal del chatbot
│   └── App.js             # Aplicación principal
├── backend/                # Servidor Node.js
│   ├── index.js           # Servidor Express
│   └── package.json       # Dependencias del backend
├── public/                 # Archivos estáticos
├── vercel.json            # Configuración de Vercel
└── DEPLOYMENT.md          # Guía de despliegue
```

## Configuración

### Variables de Entorno

- `GEMINI_API_KEY`: Tu clave de API de Google Gemini
- `NODE_ENV`: Entorno de ejecución (development/production)
- `PORT`: Puerto del servidor (por defecto: 5000)

### Personalización

- Modifica el prompt en `backend/index.js` para cambiar el comportamiento del chatbot
- Actualiza la información de contacto en `src/components/Chatbot.js`
- Personaliza el diseño CSS inline en el componente Chatbot

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## Contacto

ISA Automation El Salvador
- 📍 3a Calle Poniente #5261, San Salvador
- 📞 (503) 2243-1346
- ✉️ info@isa.org.sv

## Agradecimientos

- Google Gemini API por el servicio de IA
- React y Node.js por las tecnologías de desarrollo
- La comunidad de desarrolladores de código abierto

# Guía de Despliegue - Chatbot ISA Automation

## Opción 1: Despliegue en Vercel (Recomendado)

### Pasos:

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Regístrate con tu cuenta de GitHub

2. **Preparar el proyecto**
   ```bash
   # Construir la aplicación React
   npm run build
   
   # Instalar dependencias del backend
   cd backend
   npm install
   cd ..
   ```

3. **Configurar variables de entorno**
   - En Vercel, ve a tu proyecto → Settings → Environment Variables
   - Agrega:
     - `GEMINI_API_KEY`: Tu clave de API de Gemini
     - `NODE_ENV`: `production`

4. **Desplegar**
   - Conecta tu repositorio de GitHub a Vercel
   - Vercel detectará automáticamente la configuración
   - El despliegue se realizará automáticamente

## Opción 2: Despliegue en Netlify

### Pasos:

1. **Crear cuenta en Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Regístrate con tu cuenta de GitHub

2. **Preparar el proyecto**
   ```bash
   # Construir la aplicación React
   npm run build
   ```

3. **Configurar build**
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Configurar variables de entorno**
   - En Netlify, ve a Site settings → Environment variables
   - Agrega `REACT_APP_BACKEND_URL` con la URL de tu backend

5. **Desplegar backend por separado**
   - Usa Render, Railway o Heroku para el backend
   - Actualiza la variable `REACT_APP_BACKEND_URL` en Netlify

## Opción 3: Despliegue en Render (Backend + Frontend)

### Pasos:

1. **Crear cuenta en Render**
   - Ve a [render.com](https://render.com)
   - Regístrate con tu cuenta de GitHub

2. **Desplegar backend**
   - Crea un nuevo Web Service
   - Conecta tu repositorio
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Configurar variables de entorno**
   - `GEMINI_API_KEY`: Tu clave de API de Gemini
   - `NODE_ENV`: `production`

4. **Desplegar frontend**
   - Crea un nuevo Static Site
   - Conecta tu repositorio
   - Build Command: `npm run build`
   - Publish Directory: `build`

## Configuración de CORS

Actualiza el archivo `backend/index.js` con tus URLs reales:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio-real.vercel.app'] 
    : true,
  credentials: true
}));
```

## Verificación del Despliegue

1. **Backend**: Visita `/api/health` para verificar que funcione
2. **Frontend**: Verifica que el chatbot se cargue correctamente
3. **API**: Prueba enviar un mensaje al chatbot

## Notas Importantes

- **API Key**: Nunca expongas tu clave de Gemini en el código
- **CORS**: Configura correctamente los dominios permitidos
- **Variables de entorno**: Usa siempre variables de entorno para configuraciones sensibles
- **Monitoreo**: Verifica los logs de tu plataforma de despliegue

## Solución de Problemas

- **Error de CORS**: Verifica que las URLs estén correctamente configuradas
- **Error de API**: Verifica que la clave de Gemini sea válida
- **Error de build**: Verifica que todas las dependencias estén instaladas 
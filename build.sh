#!/bin/bash

echo "🚀 Iniciando proceso de build para despliegue..."

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

echo "📦 Instalando dependencias del frontend..."
npm install

echo "🔨 Construyendo aplicación React..."
npm run build

echo "📁 Instalando dependencias del backend..."
cd backend
npm install
cd ..

echo "✅ Build completado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Conecta tu repositorio a Vercel/Netlify/Render"
echo "3. Configura las variables de entorno"
echo "4. ¡Tu chatbot estará listo para usar!"
echo ""
echo "📖 Consulta DEPLOYMENT.md para instrucciones detalladas" 
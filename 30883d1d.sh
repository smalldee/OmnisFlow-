#!/bin/bash

echo "🚀 OmnisFlow - Spouštím kompletní projekt..."
echo "========================================="

# Zkontroluj, jestli je Python nainstalovaný
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 není nainstalovaný. Prosím nainstalujte Python 3.8+"
    exit 1
fi

# Zkontroluj, jestli je Node.js nainstalovaný
if ! command -v node &> /dev/null; then
    echo "❌ Node.js není nainstalovaný. Prosím nainstalujte Node.js 16+"
    exit 1
fi

echo "✅ Kontrola závislostí dokončena"
echo ""

# Spustit backend
echo "🐍 Spouštím Python backend..."
cd backend

# Vytvoř virtuální prostředí pokud neexistuje
if [ ! -d "venv" ]; then
    echo "📦 Vytvářím virtuální prostředí..."
    python3 -m venv venv
fi

# Aktivuj virtuální prostředí
source venv/bin/activate

# Nainstaluj dependencies
echo "📦 Instaluji Python závislosti..."
pip install -q -r requirements.txt

# Spustit Flask server na pozadí
echo "🔥 Spouštím Flask API server (port 8000)..."
python app.py &
BACKEND_PID=$!

cd ../frontend

# Nainstaluj Node.js dependencies
echo "📦 Instaluji Node.js závislosti..."
npm install --quiet

# Spustit Next.js development server
echo "🔥 Spouštím Next.js frontend (port 3000)..."
npm run start &
FRONTEND_PID=$!

echo ""
echo "🎉 OmnisFlow je spuštěn!"
echo "========================================="
echo "📊 Dashboard:           http://localhost:3000"
echo "💰 Consent-to-Earn:     http://localhost:3000/consent-to-earn"
echo "🔌 Backend API:         http://localhost:8000"
echo "🩺 Health Check:        http://localhost:8000/api/health"
echo ""
echo "Pro vypnutí stiskněte Ctrl+C"
echo ""

# Čekej na uživatelský vstup pro vypnutí
trap "echo '🛑 Vypínám servery...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM

# Udržuj script běžící
wait
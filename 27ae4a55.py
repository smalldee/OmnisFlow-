from flask import Flask, request, jsonify, cors
from flask_cors import CORS
from ai_sentinel import detect_real_positivity, analyze_facial_features
import json
import logging

app = Flask(__name__)
CORS(app)  # Povolí cross-origin requests z frontendu

# Nastavení logování
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mock databáze pro uživatelské earnings
user_earnings = {}

@app.route('/api/health', methods=['GET'])
def health_check():
    """Zdravotní kontrola API"""
    return jsonify({"status": "OK", "message": "OmnisFlow API běží"})

@app.route('/api/positivity', methods=['POST'])
def check_positivity():
    """Hlavní endpoint pro analýzu pozitivity a genuinnosti"""
    try:
        data = request.get_json()
        face_features = data.get('features', {})
        user_id = data.get('user_id', 'anonymous')
        
        # Analýza genuinnosti pomocí AI Sentinel
        genuineness = detect_real_positivity(face_features)
        detailed_analysis = analyze_facial_features(face_features)
        
        # Pokud je pozitivita genuinní, přidej odměnu
        reward = 0
        if genuineness:
            reward = 0.05  # 5 centů za genuinní pozitivní přínos
            if user_id not in user_earnings:
                user_earnings[user_id] = 0
            user_earnings[user_id] += reward
        
        logger.info(f"Analýza pro {user_id}: genuinní={genuineness}, odměna={reward}")
        
        return jsonify({
            "genuine": genuineness,
            "reward": reward,
            "total_earnings": user_earnings.get(user_id, 0),
            "analysis": detailed_analysis,
            "message": "Pozitivní přínos rozpoznán! 🎉" if genuineness else "Zkuste znovu s přirozenějším úsměvem"
        })
        
    except Exception as e:
        logger.error(f"Chyba při analýze: {str(e)}")
        return jsonify({"error": "Chyba při zpracování", "details": str(e)}), 500

@app.route('/api/earnings/<user_id>', methods=['GET'])
def get_user_earnings(user_id):
    """Získání celkových výdělků uživatele"""
    return jsonify({
        "user_id": user_id,
        "total_earnings": user_earnings.get(user_id, 0),
        "currency": "USDT"
    })

@app.route('/api/mesh/status', methods=['GET'])
def mesh_status():
    """Mock status mesh sítě"""
    return jsonify({
        "connected_nodes": 1247,
        "network_strength": "Strong",
        "your_contribution": "Active",
        "mesh_earnings": 0.23
    })

if __name__ == '__main__':
    print("🚀 Spouštím OmnisFlow Backend API...")
    print("📊 Dashboard: http://localhost:3000")
    print("🔗 API Health: http://localhost:8000/api/health")
    app.run(host='0.0.0.0', port=8000, debug=True)
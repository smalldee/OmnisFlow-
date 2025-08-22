import React, { useState, useEffect } from 'react';
import { Camera, Coins, Shield, Users, TrendingUp, AlertTriangle } from 'lucide-react';

interface EarningsData {
  genuine: boolean;
  reward: number;
  total_earnings: number;
  analysis: {
    confidence: number;
    emotion_type: string;
    authenticity_markers: string[];
    warnings: string[];
  };
  message: string;
}

export default function ConsentEarn() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [lastResult, setLastResult] = useState<EarningsData | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [userId] = useState('demo-user-' + Math.random().toString(36).substr(2, 9));

  // Mock generování facial features (v produkci by to bylo z kamery)
  const generateMockFeatures = () => {
    return {
      smile_strength: Math.random() * 0.8 + 0.2,
      eye_crinkles: Math.random() * 0.6 + 0.1,
      facial_symmetry: Math.random() * 0.6 + 0.3,
      micro_expressions: Math.random() > 0.5 ? ['happiness_onset', 'eye_engagement'] : [],
      duration: Math.random() * 4 + 1.5,
      timestamp: Date.now()
    };
  };

  const analyzePositivity = async () => {
    if (!consentGiven) {
      alert('Prosím, nejprve poskytněte souhlas se zpracováním dat.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const features = generateMockFeatures();
      
      const response = await fetch('http://localhost:8000/api/positivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          features,
          user_id: userId
        })
      });

      const data: EarningsData = await response.json();
      setLastResult(data);
      setEarnings(data.total_earnings);
      
    } catch (error) {
      console.error('Chyba při analýze:', error);
      alert('Chyba při spojení se serverem. Zkuste to znovu.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Consent & Earn 🎯
        </h1>
        <p className="text-gray-600">
          Vydělávejte tokeny za etické sdílení pozitivních emocí
        </p>
      </div>

      {/* GDPR Consent */}
      {!consentGiven && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Souhlas se zpracováním dat
              </h3>
              <p className="text-blue-700 mb-4">
                Kliknutím souhlasíte s anonymní analýzou vašich emocí pro výzkumné účely. 
                Vaše biometrická data nejsou ukládána a jsou okamžitě anonymizována.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setConsentGiven(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✅ Souhlasím
                </button>
                <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                  ❌ Odmítám
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Interface */}
      {consentGiven && (
        <>
          {/* Earnings Dashboard */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Coins className="text-green-600 mx-auto mb-2" size={32} />
              <h3 className="text-lg font-semibold text-green-800">Celkové výdělky</h3>
              <p className="text-2xl font-bold text-green-600">${earnings.toFixed(3)} USDT</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <TrendingUp className="text-purple-600 mx-auto mb-2" size={32} />
              <h3 className="text-lg font-semibold text-purple-800">Úspěšnost</h3>
              <p className="text-2xl font-bold text-purple-600">
                {lastResult ? (lastResult.genuine ? '✅ Pozitivní' : '⚠️ Zkuste znovu') : '--'}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Users className="text-blue-600 mx-auto mb-2" size={32} />
              <h3 className="text-lg font-semibold text-blue-800">AI Sentinel</h3>
              <p className="text-sm text-blue-600">Chrání proti falešné pozitivitě</p>
            </div>
          </div>

          {/* Camera Interface */}
          <div className="bg-white border rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Camera className="text-gray-500" size={48} />
              </div>
              <p className="text-gray-600 mb-4">
                Usmějte se přirozeně před kamerou pro analýzu AI sentinelu
              </p>
              <button
                onClick={analyzePositivity}
                disabled={isAnalyzing}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  isAnalyzing
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isAnalyzing ? '🔄 Analyzuji...' : '📸 Analyzovat pozitivitu'}
              </button>
            </div>
          </div>

          {/* Results */}
          {lastResult && (
            <div className="bg-white border rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Výsledek analýzy</h3>
              
              <div className={`p-4 rounded-lg mb-4 ${
                lastResult.genuine ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <p className={`font-semibold ${lastResult.genuine ? 'text-green-800' : 'text-yellow-800'}`}>
                  {lastResult.message}
                </p>
                {lastResult.reward > 0 && (
                  <p className="text-green-600 mt-2">
                    💰 Získali jste: +${lastResult.reward.toFixed(3)} USDT
                  </p>
                )}
              </div>

              {/* Detailed Analysis */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Authenticity Markers</h4>
                  {lastResult.analysis.authenticity_markers.length > 0 ? (
                    <ul className="text-sm text-green-600 space-y-1">
                      {lastResult.analysis.authenticity_markers.map((marker, idx) => (
                        <li key={idx}>✅ {marker}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Žádné markery autenticity nenalezeny</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Varování</h4>
                  {lastResult.analysis.warnings.length > 0 ? (
                    <ul className="text-sm text-yellow-600 space-y-1">
                      {lastResult.analysis.warnings.map((warning, idx) => (
                        <li key={idx}><AlertTriangle size={14} className="inline mr-1" />{warning}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-500">✅ Žádná varování</p>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Spolehlivost:</strong> {lastResult.analysis.confidence.toFixed(1)}% | 
                  <strong> Typ emoce:</strong> {lastResult.analysis.emotion_type}
                </p>
              </div>
            </div>
          )}

          {/* Ethics & Privacy */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🔐 Ochrana soukromí & Etika</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p>✅ Data nejsou ukládána na serveru</p>
                <p>✅ Okamžitá anonymizace</p>
                <p>✅ GDPR compliance</p>
              </div>
              <div>
                <p>✅ AI Sentinel chrání proti manipulaci</p>
                <p>✅ Transparentní algoritmus</p>
                <p>✅ Možnost kdykoli odvolat souhlas</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
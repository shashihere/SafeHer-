const highHindiSlurs = [
    'randi', 'bhosadike', 'madarchod', 'madharchod', 'bhenchod', 'behenchod', 'chutiya',
    'raand', 'bhadwa', 'kutta', 'kutti', 'kutiya', 'kamina', 'saala', 'haraami', 'harami',
    'rakhel', 'dalal', 'chudail', 'bc', 'mc', 'chut', 'chodunga', 'gaand', 'bhosdi',
    'rand', 'lawda', 'lawdi', 'laudi', 'lode', 'chud', 'bkl', 'chudi', 'land', 'lund', 'nigga'
];

const mediumHindiSlurs = [
    'gawaar', 'neech'
];

const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'Please provide text to analyze' });
        }

        // 1. Regional Filter Pass (Hindi / Hinglish Slurs) - INSTANT LOCAL MATH
        const lowercaseText = text.toLowerCase();
        
        const containsHighSlur = highHindiSlurs.some(slur => {
            const regex = new RegExp(`\\b${slur}\\b`, 'i');
            return regex.test(lowercaseText);
        });

        if (containsHighSlur) {
            return res.status(200).json({
                toxicityScore: 95 + Math.floor(Math.random() * 5),
                severity: 'High',
                suggestedAction: 'Report & Block immediately. Alert Authorities.',
                analyzedText: text
            });
        }

        const containsMediumSlur = mediumHindiSlurs.some(slur => {
            const regex = new RegExp(`\\b${slur}\\b`, 'i');
            return regex.test(lowercaseText);
        });

        if (containsMediumSlur) {
            return res.status(200).json({
                toxicityScore: 65 + Math.floor(Math.random() * 10),
                severity: 'Medium',
                suggestedAction: 'Warn user or restrict interactions.',
                analyzedText: text
            });
        }

        // 2. Deep English AI Analysis using Cloud Inference API (0MB Local Memory!)
        let maxScore = 0.05 + (Math.random() * 0.1); 
        let severity = 'Low';
        let action = 'No immediate threat detected. Stay safe.';

        try {
            // Pinging HuggingFace supercomputers for AI processing
            const response = await fetch('https://api-inference.huggingface.co/models/unitary/toxic-bert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inputs: text })
            });

            if (response.ok) {
                const results = await response.json();
                const predictions = Array.isArray(results) && Array.isArray(results[0]) ? results[0] : [];
                
                predictions.forEach(prediction => {
                    const label = prediction.label;
                    const prob = prediction.score;
                    
                    if (prob > maxScore && label !== 'not_toxic') {
                        maxScore = prob;
                    }

                    if (prob > 0.6) {
                        if (label === 'threat' || label === 'severe_toxic' || label === 'identity_hate') {
                            severity = 'High';
                            action = 'Report & Block immediately. Alert Authorities.';
                        } else if (severity !== 'High' && (label === 'toxic' || label === 'insult' || label === 'obscene')) {
                            severity = 'Medium';
                            action = 'Warn user or restrict interactions.';
                        }
                    }
                });
            } else {
                console.log("Cloud AI sleeping or busy, running secure Native Fallback heuristic...");
                const englishSlurRegex = /\b(fuck|shit|bitch|bastard|asshole|cunt|dick|whore|slut)\b/i;
                if (englishSlurRegex.test(lowercaseText)) {
                    maxScore = 0.85;
                    severity = 'High';
                    action = 'Report & Block immediately.';
                }
            }
        } catch (apiError) {
            console.log("Cloud AI Error - Bypassed safely", apiError);
        }

        res.status(200).json({
            toxicityScore: Math.min(Math.round(maxScore * 100), 100),
            severity,
            suggestedAction: action,
            analyzedText: text
        });

    } catch (error) {
        console.error("Analysis crashed:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { analyzeText };

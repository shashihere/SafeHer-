const highHindiSlurs = [
    'randi', 'bhosadike', 'madarchod', 'madharchod', 'bhenchod', 'behenchod', 'chutiya',
    'raand', 'bhadwa', 'kutta', 'kutti', 'kutiya', 'kamina', 'saala', 'haraami', 'harami',
    'rakhel', 'dalal', 'chudail', 'bc', 'mc', 'chut', 'chodunga', 'gaand', 'bhosdi',
    'rand', 'lawda', 'lawdi', 'laudi', 'lode', 'chud', 'bkl', 'chudi', 'land', 'lund', 'nigga'
];

const mediumHindiSlurs = [
    'gawaar', 'neech'
];

const highEnglishThreats = [
    'kill', 'murder', 'rape', 'stab', 'shoot', 'kidnap', 'destroy you', 'beat you', 'fuck', 'bitch', 'cunt', 'whore', 'slut', 'faggot', 'nigger', 'choke', 'strangle', 'assassinate'
];

const mediumEnglishThreats = [
    'shit', 'asshole', 'dick', 'bastard', 'prick', 'jerk', 'loser', 'dumbass', 'moron', 'idiot', 'ugly', 'stupid', 'die'
];

const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'Please provide text to analyze' });
        }

        // 1. Regional Filter Pass (Hindi / Hinglish Slurs)
        const lowercaseText = text.toLowerCase();
        let maxScore = 0.05 + (Math.random() * 0.1); 
        let severity = 'Low';
        let action = 'No immediate threat detected. Stay safe.';
        
        const containsHighHindiSlur = highHindiSlurs.some(slur => {
            const regex = new RegExp(`\\b${slur}\\b`, 'i');
            return regex.test(lowercaseText);
        });

        if (containsHighHindiSlur) {
            return res.status(200).json({
                toxicityScore: 95 + Math.floor(Math.random() * 5),
                severity: 'High',
                suggestedAction: 'Report & Block immediately. Alert Authorities.',
                analyzedText: text
            });
        }

        const containsMediumHindiSlur = mediumHindiSlurs.some(slur => {
            const regex = new RegExp(`\\b${slur}\\b`, 'i');
            return regex.test(lowercaseText);
        });

        if (containsMediumHindiSlur) {
             maxScore = 0.70;
             severity = 'Medium';
             action = 'Warn user or restrict interactions.';
             return res.status(200).json({
                toxicityScore: 65 + Math.floor(Math.random() * 10),
                severity: 'Medium',
                suggestedAction: 'Warn user or restrict interactions.',
                analyzedText: text
            });
        }

        // 2. English Deep Threat Evaluation (Native Failsafe Algorithm)
        const containsHighEnglishThreat = highEnglishThreats.some(threat => {
            const regex = new RegExp(`\\b${threat}\\b`, 'i');
            return regex.test(lowercaseText) || lowercaseText.includes(threat);
        });

        if (containsHighEnglishThreat) {
            return res.status(200).json({
                toxicityScore: 90 + Math.floor(Math.random() * 8), // 90-98%
                severity: 'High',
                suggestedAction: 'Report & Block immediately. Alert Authorities.',
                analyzedText: text
            });
        }

        const containsMediumEnglishThreat = mediumEnglishThreats.some(threat => {
             const regex = new RegExp(`\\b${threat}\\b`, 'i');
             return regex.test(lowercaseText);
        });

        if (containsMediumEnglishThreat) {
             return res.status(200).json({
                toxicityScore: 65 + Math.floor(Math.random() * 10), // 65-74%
                severity: 'Medium',
                suggestedAction: 'Warn user or restrict interactions.',
                analyzedText: text
            });
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

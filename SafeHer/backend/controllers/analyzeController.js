const analyzeText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'Please provide text to analyze' });
        }

        // --- IMPROVED MOCK AI IMPLEMENTATION ---
        
        // Comprehensive lists of toxic words
        const highToxicWords = [
            'kill', 'die', 'murder', 'rape', 'bitch', 'slut', 'whore', 'threat', 'assassinate', 
            'destroy you', 'kms', 'kys', 'suicide', 'stab', 'strangle'
        ];
        
        const mediumToxicWords = [
            'stupid', 'idiot', 'ugly', 'dumb', 'hate', 'moron', 'loser', 'pathetic', 'trash',
            'scum', 'worthless', 'disgusting', 'freak', 'annoying'
        ];

        let score = 0.1; // Default low score
        let severity = 'Low';
        let action = 'Ignore';

        // Check using word boundaries \b to avoid false positives (e.g. 'ass' in 'class')
        // Using RegExp with 'i' flag for case-insensitve matching
        const checkMatch = (phraseList) => {
            return phraseList.some(phrase => {
                const regex = new RegExp(`\\b${phrase}\\b`, 'i');
                return regex.test(text);
            });
        };

        const hasHigh = checkMatch(highToxicWords);
        const hasMedium = checkMatch(mediumToxicWords);

        // Calculate severity based on findings
        if (hasHigh) {
            score = 0.85 + (Math.random() * 0.1); // 0.85 - 0.95
            severity = 'High';
            action = 'Report & Block immediately. Alert Authorities.';
        } else if (hasMedium) {
            score = 0.4 + (Math.random() * 0.3); // 0.40 - 0.70
            severity = 'Medium';
            action = 'Warn user or restrict interactions.';
        } else {
            score = 0.05 + (Math.random() * 0.1); // 0.05 - 0.15
            severity = 'Low';
            action = 'No immediate threat detected. Stay safe.';
        }

        res.status(200).json({
            toxicityScore: Math.round(score * 100), // percentage
            severity,
            suggestedAction: action,
            analyzedText: text
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { analyzeText };

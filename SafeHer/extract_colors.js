const https = require('https');

https.get('https://www.imsafe.app/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        // Find all hex codes
        const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
        const matches = data.match(hexRegex) || [];
        
        // Count frequencies
        const counts = {};
        matches.forEach(hex => {
            hex = hex.toLowerCase();
            counts[hex] = (counts[hex] || 0) + 1;
        });

        // Sort by frequency
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);
        console.log("Top Hex Colors used on imsafe.app:");
        sorted.forEach(([hex, count]) => console.log(`${hex}: ${count} times`));

        // Find font families
        const fontRegex = /font-family:\s*([^;]+)/gi;
        const fonts = [...data.matchAll(fontRegex)].map(m => m[1]);
        const uniqueFonts = [...new Set(fonts)];
        console.log("\nFonts used:");
        console.log(uniqueFonts.slice(0, 5).join('\n'));
    });
}).on('error', (err) => {
    console.error("Error fetching:", err);
});

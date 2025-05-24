// services/horoscopeService.js
const openai = require('../config/openai');
const prompts = require('../utils/prompts');

async function getHoroscope(sign) {
    const prompt = prompts.profilePrompt(sign);

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        });

        console.log('🔮 Horóscopo generado:', completion.choices[0].message.content.trim());

        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('❌ Error generando horóscopo:', error);
        return '⚠️ Lo siento, hubo un problema al generar tu horóscopo. Inténtalo más tarde.';
    }
}

module.exports = { getHoroscope };

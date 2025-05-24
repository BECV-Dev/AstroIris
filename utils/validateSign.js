// utils/validateSign.js
const validSigns = [
    'aries', 'tauro', 'géminis', 'cáncer', 'leo', 'virgo',
    'libra', 'escorpio', 'sagitario', 'capricornio', 'acuario', 'piscis'
];

function validateSign(sign) {
    return validSigns.includes(sign.normalize("NFD").replace(/[\u0300-\u036f]/g, ''));
}

module.exports = { validateSign };

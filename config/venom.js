const venom = require('venom-bot');
const path = require('path');

function createBot(messageHandler) {
    const tokenPath = path.resolve('./tokens');
    console.log('📁 TOKEN PATH:', tokenPath);

    venom
        .create({
            session: 'horoscopo-session',
            headless: true,
            logQR: true,
            folderNameToken: '.',
            mkdirFolderToken: './tokens',
            browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
            disableWelcome: true,
            multidevice: true
        })
        .then((client) => {
            console.log('🤖 Bot iniciado con éxito.');
            client.onMessage((message) => {
                messageHandler(client, message);
            });
        })
        .catch((error) => {
            console.error('❌ Error al iniciar el bot:', error);
        });
}

module.exports = { createBot };

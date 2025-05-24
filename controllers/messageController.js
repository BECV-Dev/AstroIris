// controllers/messageController.js
const { getUserByPhoneService, getOrCreateUserService, saveOrUpdateUserService } = require('../services/userService.js');
const { getHoroscope } = require('../services/horoscopeService');
const { saveMessageService, getMessagesByUserIdService } = require('../services/messageService');
const { replyFirstContact, replySaludo, replyRepeatedHolas } = require('../utils/customMessages');
const { analyzeUserMessage } = require('../services/intentionMsgService.js');
const { validateSign } = require('../utils/validateSign');

async function handleMessage(client, message) {
    if (!message.body || message.isGroupMsg || !message.from)
        return;

    const msg = message.body.trim();
    const msgLower = msg.toLowerCase();
    const phone = message.from;

    try {
        // // 1. Obtener o crear el usuario
        // const user = await getOrCreateUserService(phone);
        // if (!user)
        //     return;

        // // Intención del mensaje


        // // 2. Saludo inicial
        // if (msgLower === 'hola' || msgLower === 'hi') {
        //     //Obtener el registro del usuario
        //     const user = await getUserByPhoneService(phone);
        //     const existsMessage = await getMessagesByUserIdService(user.id);
        //     if (existsMessage.length > 0) {
        //         saveMessageService(phone, 'user', msgLower);
        //         const strReplyRepeatedHolas = replyRepeatedHolas[Math.floor(Math.random() * replyRepeatedHolas.length)];
        //         saveMessageService(phone, 'user', strReplyRepeatedHolas);
        //         await client.sendText(phone, strReplyRepeatedHolas);
        //     }
        //     else {
        //         await saveMessageService(phone, 'user', msgLower);
        //         const strSaludo = replySaludo[Math.floor(Math.random() * replySaludo.length)];
        //         await client.sendText(phone, strSaludo);
        //         await saveMessageService(phone, 'bot', strSaludo);
        //     }
        //     return;
        // }
        // else {
        //     await saveMessageService(phone, 'user', msg);
        // }

        // // 3. Si envía su signo
        // if (validateSign(msgLower)) {
        //     await saveOrUpdateUserService(phone, msgLower);
        //     const horoscope = await getHoroscope(msgLower);
        //     const respuesta = `🔮 Guardé tu signo como *${msgLower}*.\n\n${horoscope}`;
        //     await client.sendText(phone, respuesta);
        //     await saveMessageService(phone, 'bot', respuesta);
        //     return;
        // }

        // // 4. Verificar si ya tiene signo guardado
        const userData = await getUserByPhoneService(phone);
        const userSign = userData?.sign;

        // if (!userSign) {
        //     const aviso = '📌 Antes de continuar, dime tu signo zodiacal para darte tu horóscopo.';
        //     await client.sendText(phone, aviso);
        //     await saveMessageService(phone, 'bot', aviso);
        //     return;
        // }

        // 5. Procesar intención con IA y responder
        // const response = await analyzeUserMessage(msg, userSign);
        const response = await analyzeUserMessage(msg, userSign);
        await client.sendText(phone, response);
        await saveMessageService(phone, 'bot', response);

    } catch (error) {
        console.error('❌ Error al manejar el mensaje:', error);
        const fallback = '⚠️ Ocurrió un error al procesar tu mensaje. Inténtalo de nuevo más tarde.';
        await client.sendText(phone, fallback);
        await saveMessageService(phone, 'bot', fallback);
    }
}

module.exports = { handleMessage };


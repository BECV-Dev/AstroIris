// services/messageService.js
const { saveMessageRepository, getMessagesByUserIdRepository } = require('../repositories/messageRepository');

async function saveMessageService(phone, sender, content) {
    try {

        const verifySaveMessage = saveMessageRepository(phone, sender, content);

        if (!verifySaveMessage) {
            console.error('❌ No se pudo guardar el mensaje: usuario no encontrado.');
            return;
        }

    } catch (error) {
        console.error('❌ Error en saveMessageService:', error);
    }
}

async function getMessagesByUserIdService(userId) {
    try {

        const userIdMessage = await getMessagesByUserIdRepository(userId);
        if (!userIdMessage) {
            console.error('❌ No se pudo obtener los mensajes: usuario no encontrado.');
            return;
        }

        return userIdMessage;

    } catch (error) {
        console.error('❌ Error en getMessagesByUserIdService:', error);
        return [];
    }
}

module.exports = {
    saveMessageService,
    getMessagesByUserIdService
};

// repositories/messageRepository.js
const { supabase } = require('../config/supabase');
const { getUserByPhoneService } = require('../services/userService');

async function saveMessageRepository(phone, sender, content) {
    try {
        const user = await getUserByPhoneService(phone);
        if (!user) {
            console.error('❌ No se pudo guardar mensaje: usuario no encontrado.');
            return;
        }

        const { error } = await supabase
            .from('messages')
            .insert({
                user_id: user.id,
                sender,
                content
            });

        if (error) {
            console.error(`❌ Error guardando mensaje (${sender}):`, error);
        }

        console.log(`💬 Mensaje guardado (${sender}):`, content);
        return true;
    } catch (error) {
        console.error('❌ Error en saveMessageService:', error);
    }
}

async function getMessagesByUserIdRepository(userId) {
    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('❌ Error obteniendo mensajes:', error);
            return [];
        }

        return data;
    } catch (error) {

    }
}

module.exports = {
    saveMessageRepository,
    getMessagesByUserIdRepository
};

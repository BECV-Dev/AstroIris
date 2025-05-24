// repositories/userRepository.js
const { supabase } = require('../config/supabase');

/**
 * Obtiene o crea un usuario en la base de datos.
 */
async function getOrCreateUserRepository(phone) {
    // console.log('📞 phone recibido en getOrCreateUserRepository:', phone, typeof phone);
    // console.log('🧪 Tipo de supabase:', typeof supabase);
    // console.log('🧪 supabase:', supabase);
    try {
        const { data: existingUser, error: selectError } = await supabase
            .from('users')
            .select('id')
            .eq('phone_number', phone)
            .single();

        if (selectError && selectError.code !== 'PGRST116') {
            console.error('❌ Error buscando usuario:', selectError);
            return null;
        }
        // Si el usuario ya existe, lo retornamos
        if (existingUser)
            return existingUser;
        // Si no existe, lo creamos
        const { data: insertedUsers, error: insertError } = await supabase
            .from('users')
            .insert({ phone_number: phone })
            .select('id');

        if (insertError || !insertedUsers || insertedUsers.length === 0) {
            console.error('❌ Error creando usuario o no retornó datos:', insertError);
            return null;
        }

        console.log('📞 Usuario creado:', insertedUsers[0]);

        return insertedUsers[0];

    } catch (error) {
        console.error('❌ Error en getOrCreateUserRepository:', error);
        return null;
    }
}

/**
 * Actualiza el signo de un usuario o lo crea si no existe.
 */
async function saveOrUpdateUserRepository(phone, sign) {
    try {
        const user = await getOrCreateUserRepository(phone);
        if (!user) return null;

        const { data, error } = await supabase
            .from('users')
            .update({ sign })
            .eq('id', user.id)
            .select('*')
            .single();

        if (error) {
            console.error('❌ Error actualizando signo del usuario:', error);
            return null;
        }

        console.log('📞 Usuario actualizado:', data);

        return data;
    } catch (error) {
        console.error('❌ Error en saveOrUpdateUser:', error);
        return null;
    }
}

/**
 * Solo obtiene el usuario (sin crear).
 */
async function getUserByPhoneRepository(phone) {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('phone_number', phone)
            .single();

        if (error) {
            // No mostramos errores si solo no se encontró
            if (error.code !== 'PGRST116') {
                console.error('❌ Error obteniendo usuario:', error);
            }
            return null;
        }

        console.log('📞 Usuario encontrado:', data);

        return data;
    } catch (error) {
        console.error('❌ Error en getUserByPhone:', error);
        return null;
    }
}

module.exports = {
    getOrCreateUserRepository,
    saveOrUpdateUserRepository,
    getUserByPhoneRepository
};

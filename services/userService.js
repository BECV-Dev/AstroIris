// services/userService.js
const { getOrCreateUserRepository, saveOrUpdateUserRepository, getUserByPhoneRepository, } = require('../repositories/userRepository');

async function getOrCreateUserService(phone) {
    try {

        const getUser = await getOrCreateUserRepository(phone);
        if (!getUser) {
            console.error('❌ No se pudo obtener o crear el usuario.');
            return null;
        }

        return getUser;

    } catch (error) {
        console.error('❌ Error en getOrCreateUserService:', error);
        return null;
    }
}

/**
 * Actualiza el signo de un usuario o lo crea si no existe.
 */
async function saveOrUpdateUserService(phone, sign) {
    try {

        const saveUser = await saveOrUpdateUserRepository(phone, sign);
        if (!saveUser) {
            console.error('❌ No se pudo guardar o actualizar el usuario.');
            return null;
        }

    } catch (error) {
        console.error('❌ Error en saveOrUpdateUserService:', error);
        return null;
    }
}

/**
 * Solo obtiene el usuario (sin crear).
 */
async function getUserByPhoneService(phone) {

    try {
        const getUserByPhone = await getUserByPhoneRepository(phone);
        if (!getUserByPhone) {
            console.error('❌ No se pudo obtener el usuario.');
            return null;
        }

        return getUserByPhone;

    } catch (error) {
        console.error('❌ Error en getUserByPhoneService:', error);
        return null;
    }
}

module.exports = {
    getUserByPhoneService,
    getOrCreateUserService,
    saveOrUpdateUserService
};

require('dotenv').config();
const { createBot } = require('./config/venom');
const { handleMessage } = require('./controllers/messageController');
// const setupCron = require('./cron/sendDailyHoroscopes');

createBot(handleMessage); // inicia el bot
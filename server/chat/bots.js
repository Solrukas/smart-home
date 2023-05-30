const { token, chatld } = require('./telegram.json');
const TelegramBot = require('node-telegram-bot-api');

const check = require('./check');
const item_id = check.checkId;

const bot = new TelegramBot(token, { polling: true });

function start() {
    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '===명령어 사용법===\n/help : commands\n/items : item list\n/run <item_id> : item on/off');
    });

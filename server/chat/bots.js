const { token, chatId } = require('./telegram.json');
const TelegramBot = require('node-telegram-bot-api');
const request = require('axios');

const check = require('./check');
const { response } = require('express');
const item_id = check.checkId;

const bot = new TelegramBot(token, { polling: true });

function start() {
    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '===명령어 사용법===\n/help : commands\n/items : item list\n/run <item_id> : item on/off');
    });

    bot.onText(/\/items/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '===Item List===\n' + item_id.map((item, index) => `${index + 1}. id:${item.id} / name:${item.name}`).join('\n'));
    });

    bot.onText(/\/run (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        run_id = item_id.filter(item => item.id == match[1])[0].name;
        request.get(`https://api.solrukas.me/api/${run_id}`);
        bot.sendMessage(chatId, `${run_id} 기기가 실행되었습니다.`);
    });
}

module.exports = {
    start: start,
};

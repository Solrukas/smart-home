const { token, chatld } = require('./telegram.json');
const TelegramBot = require('node-telegram-bot-api');

const check = require('./check');
const item_id = check.checkId;

const bot = new TelegramBot(token, { polling: true });

/**
 * Telegram Bot for 2048 Game Web App — Чистая версия
 */

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); 

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;

// Валидация
if (!TELEGRAM_BOT_TOKEN) {
    console.error('❌ Ошибка: TELEGRAM_TOKEN отсутствует в .env');
    process.exit(1);
}
if (!GAME_URL) {
    console.error('❌ Ошибка: GAME_URL отсутствует в .env');
    process.exit(1);
}

// Инициализация бота
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Кнопки
const webAppButton = {
    text: '🎮 Играть в 2048',
    web_app: { url: GAME_URL }
};

const webVersionButton = {
    text: '🌐 Веб-версия',
    url: 'https://raezualways.github.io/2048/'
};

// ==================== КОМАНДА /start ====================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const text = `
🌟 <b>2048 Duel Edition</b>

Добро пожаловать! Готовы побить рекорд?

👇 Нажмите кнопку ниже чтобы начать играть
`;

    bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton]
            ]
        }
    });
});

// ==================== КОМАНДА /play ====================
bot.onText(/\/play/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "🎮 Запускаем игру...", {
        reply_markup: {
            inline_keyboard: [[webAppButton]]
        }
    });
});

// ==================== КОМАНДА /help ====================
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const text = `
📋 <b>Доступные команды:</b>

🎮 <b>/start</b> — Главное меню + кнопка игры
🎮 <b>/play</b> — Быстрый запуск игры
🌐 <b>/web</b> — Открыть веб-версию
ℹ️ <b>/about</b> — Информация о боте

/help — Показать этот список
`;

    bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton]
            ]
        }
    });
});

// ==================== КОМАНДА /web ====================
bot.onText(/\/web/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "🌐 Открыть полную версию игры:", {
        reply_markup: {
            inline_keyboard: [[webVersionButton]]
        }
    });
});

// ==================== КОМАНДА /about ====================
bot.onText(/\/about/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `
<b>2048 Duel Edition</b>

Классическая игра 2048 как Telegram Web App.

• Быстрые свайпы
• Сохранение рекордов в браузере
• Играй прямо в чате

Разработано с ❤️ для Telegram
`, { parse_mode: 'HTML' });
});

// Обработка ошибок
bot.on('polling_error', (error) => {
    console.error('Polling Error:', error.message);
});

console.log('🚀 Бот 2048 запущен успешно!');
console.log(`🎮 GAME_URL: ${GAME_URL}`);

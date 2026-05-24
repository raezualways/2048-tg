/**
 * Telegram Bot for 2048 Game Web App — Чистая стильная версия
 */

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); 

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;

// Валидация конфигурации
if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.includes('вставь_сюда') || TELEGRAM_BOT_TOKEN === 'your_bot_token_here') {
    console.error('❌ Ошибка: Токен бота отсутствует!');
    process.exit(1);
}

if (!GAME_URL || GAME_URL.includes('вставь_сюда')) {
    console.error('❌ Ошибка: GAME_URL отсутствует!');
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
    text: '🌐 Открыть веб-версию',
    url: 'https://raezualways.github.io/2048/'
};

// ==================== КОМАНДА /start ====================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const welcomeMessage = `
🌟 <b>2048 DUEL EDITION</b> 🌟

🎮 Классическая игра <b>2048</b> теперь прямо в Telegram!

🔥 Объединяй одинаковые плитки
🏆 Достигай новых рекордов
⚡ Играй в любое время

👇 Выбери, как хочешь играть:
`;

    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton]
            ]
        }
    }).catch(err => console.error('Ошибка /start:', err.message));
});

// ==================== КОМАНДА /help ====================
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📖 <b>Как играть в 2048</b>

🎯 <b>Цель игры:</b>
Собери плитку с числом <b>2048</b> и больше!

🕹️ <b>Управление:</b>
• Свайп влево ←   Свайп вправо →
• Свайп вверх ↑    Свайп вниз ↓

🏆 <b>Советы для высоких рекордов:</b>
• Держи самую большую плитку в одном углу
• Планируй ходы на несколько шагов вперёд
• Не позволяй полю полностью заполниться

🌐 <b>Полная веб-версия:</b>
https://raezualways.github.io/2048/

✨ <b>Команды:</b>
/start — Запустить игру
/help  — Показать помощь
`;

    bot.sendMessage(chatId, helpMessage, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton]
            ]
        }
    }).catch(err => console.error('Ошибка /help:', err.message));
});

// Обработка ошибок
bot.on('polling_error', (error) => {
    console.error('❌ Polling Error:', error.message || error);
});

console.log('🚀 Бот 2048 Duel Edition успешно запущен!');
console.log(`🎮 Web App: ${GAME_URL}`);

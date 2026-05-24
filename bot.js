/**
 * Telegram Bot for 2048 Game Web App
 */

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); 

// Поддержка разных названий переменных
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;

// Валидация конфигурации
if (!TELEGRAM_BOT_TOKEN || TELEGRAM_BOT_TOKEN.includes('вставь_сюда') || TELEGRAM_BOT_TOKEN === 'your_bot_token_here') {
    console.error('❌ Ошибка: Токен бота отсутствует или содержит заглушку!');
    console.error('Укажите TELEGRAM_TOKEN в файле .env');
    process.exit(1);
}

if (!GAME_URL || GAME_URL.includes('вставь_сюда') || GAME_URL.includes('your-game-url')) {
    console.error('❌ Ошибка: GAME_URL отсутствует или содержит заглушку!');
    console.error('Укажите ссылку на игру в .env');
    process.exit(1);
}

if (!GAME_URL.startsWith('https://')) {
    console.warn('⚠️ ВНИМАНИЕ: GAME_URL должен начинаться с https://');
}

// Инициализация бота
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Кнопка запуска Web App
const webAppButton = {
    text: '🎮 Играть в 2048',
    web_app: { url: GAME_URL }
};

// Кнопка веб-версии
const webVersionButton = {
    text: '🌐 Открыть веб-версию',
    url: 'https://raezualways.github.io/2048/'
};

// ==================== КОМАНДА /start ====================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const welcomeMessage = `
🌟 <b>Добро пожаловать в 2048 Duel Edition!</b> 🌟

🎮 Классическая игра <b>2048</b> теперь прямо в Telegram!

🔥 Собирай одинаковые плитки и достигни <b>2048</b>!
🏆 Соревнуйся с друзьями и ставь рекорды.

👇 Нажми кнопку ниже, чтобы начать играть:
    `;

    bot.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton]
            ]
        }
    }).catch(error => {
        console.error('❌ Ошибка /start:', error.message);
    });
});

// ==================== КОМАНДА /help ====================
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📖 <b>Как играть в 2048 Duel</b>

🎯 <b>Цель:</b>
Двигай плитки, чтобы получить число <b>2048</b>!

🕹️ <b>Управление:</b>
• Свайп влево, вправо, вверх, вниз
• Одинаковые плитки объединяются
• После каждого хода появляется новая плитка

🏆 <b>Полезные советы:</b>
• Старайся держать большую плитку в углу
• Планируй ходы заранее
• Не давай полю полностью заполниться

🌐 <b>Также можешь играть в полной веб-версии:</b>
https://raezualways.github.io/2048/

✨ <b>Команды:</b>
/start — Запустить игру
/help — Показать помощь
    `;

    bot.sendMessage(chatId, helpMessage, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton]
            ]
        }
    }).catch(error => {
        console.error('❌ Ошибка /help:', error.message);
    });
});

// Перехват ошибок
bot.on('polling_error', (error) => {
    console.error('❌ Поллинг-ошибка:', error.message || error);
});

console.log('🚀 Бот 2048 успешно запущен!');
console.log(`🎮 GAME_URL: ${GAME_URL}`);

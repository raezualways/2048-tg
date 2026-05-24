/**
 * 🎮 2048 Duel Edition Telegram Bot
 * 💎 Stylish & Modern Telegram Web App Bot
 *
 * Features:
 * - Beautiful emoji formatting
 * - Professional button design
 * - Engaging user experience
 * - Error handling with style
 */

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// 🎨 Color Codes for Console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
    fg: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        crimson: '\x1b[38m'
    },
    bg: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',
        crimson: '\x1b[48m'
    }
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;

// 🔍 Validation with Style
if (!TELEGRAM_BOT_TOKEN) {
    console.error(`${colors.fg.red}❌ Ошибка: TELEGRAM_TOKEN отсутствует в .env${colors.reset}`);
    process.exit(1);
}
if (!GAME_URL) {
    console.error(`${colors.fg.red}❌ Ошибка: GAME_URL отсутствует в .env${colors.reset}`);
    process.exit(1);
}

// 🚀 Initialize Bot
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// 🎨 Stylish Buttons
const webAppButton = {
    text: '🎮 ИГРАТЬ В 2048',
    web_app: { url: https://raezualways.github.io/2048/ }
};

const webVersionButton = {
    text: '🌐 ВЕБ-ВЕРСИЯ',
    url: 'https://raezualways.github.io/2048/'
};

const supportButton = {
    text: '❤️ ПОДДЕРЖКА',
    url: 'https://t.me/your_support_chat'
};

const rateButton = {
    text: '⭐ ОЦЕНИТЬ БОТА',
    url: 'https://t.me/store/product/your_bot'
};

// ==================== КОМАНДА /start ====================
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'Игрок';

    const text = `
🎮 <b>Добро пожаловать в 2048 Duel Edition, ${firstName}!</b> 🎮

💎 <b>Классическая игра 2048</b> теперь в Telegram с уникальными фишками:
✨ <b>Хардкорные вызовы</b>
✨ <b>Ежедневные испытания</b>
✨ <b>Таблица лидеров</b>
✨ <b>Достижения и награды</b>

👇 <b>Нажмите кнопку ниже, чтобы начать играть прямо в Telegram!</b> 👇
`;

    bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [webAppButton],
                [webVersionButton, supportButton],
                [rateButton]
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

/**
 * Telegram Bot for 2048 Game Web App — Стильная версия
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
╔════════════════════════════════════╗
║                                    ║
║        🌟  2048 DUEL EDITION  🌟   ║
║                                    ║
╚════════════════════════════════════╝

🎮 <b>Классика 2048 теперь в Telegram!</b>

🔥 Объединяй плитки и достигай <b>2048</b>
🏆 Соревнуйся с друзьями
⚡ Молниеносные свайпы

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
    }).catch(error => {
        console.error('❌ Ошибка при отправке /start:', error.message);
    });
});

// ==================== КОМАНДА /help ====================
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
╔════════════════════════════════════╗
║             📖 КАК ИГРАТЬ          ║
╚════════════════════════════════════╝

🎯 <b>Цель игры:</b>
Достичь плитки <b>2048</b> и выше!

🕹️ <b>Управление:</b>
• Свайп влево ←
• Свайп вправо →
• Свайп вверх ↑
• Свайп вниз ↓

🏆 <b>Про-советы:</b>
• Держи самую большую плитку в углу
• Планируй на 2–3 хода вперёд
• Не заполняй поле полностью

🌐 <b>Полная веб-версия:</b>
https://raezualways.github.io/2048/

✨ <b>Команды бота:</b>
/start — Начать игру
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
    }).catch(error => {
        console.error('❌ Ошибка при отправке /help:', error.message);
    });
});

// Глобальная обработка ошибок
bot.on('polling_error', (error) => {
    console.error('❌ Polling Error:', error.message || error);
});

bot.on('error', (error) => {
    console.error('❌ Бот ошибка:', error.message || error);
});

console.log('🚀 Бот 2048 Duel Edition успешно запущен!');
console.log(`🎮 Web App URL: ${GAME_URL}`);
console.log('🌐 Веб-версия: https://raezualways.github.io/2048/');

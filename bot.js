/**
 * Telegram Bot for 2048 Game Web App — Стильная версия
 */

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); 

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;

// Валидация
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
╔══════════════════════════════════╗
║                                  ║
║     🌟  2048 DUEL EDITION  🌟    ║
║                                  ║
╚══════════════════════════════════╝

🎮 <b>Классическая 2048 теперь в Telegram!</b>

🔥 Объединяй плитки • Достигай 2048
🏆 Соревнуйся с друзьями
⚡ Играй одним пальцем

👇 Выбери режим игры:
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
╔══════════════════════════════════╗
║           📖 КАК ИГРАТЬ          ║
╚══════════════════════════════════╝

🎯 <b>Цель:</b> Достичь плитки <b>2048</b>

🕹️ <b>Управление:</b>
• Свайп влево, вправо, вверх, вниз

🏆 <b>Советы мастеров:</b>
• Держи большую плитку в одном углу
• Планируй ходы на несколько шагов вперёд
• Старайся не заполнять всё поле

🌐 <b>Веб-версия:</b>
https://raezualways.github.io/2048/

✨ <b>Команды:</b>
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
    }).catch(err => console.error('Ошибка /help:', err.message));
});

// Обработка ошибок
bot.on('polling_error', (error) => {
    console.error('❌ Polling Error:', error.message || error);
});

console.log('🚀 Бот 2048 Duel Edition запущен!');
console.log(`🎮 GAME_URL: ${GAME_URL}`);

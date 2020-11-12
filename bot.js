const io = require('./sockets.js')();
const TG = require('telegram-bot-api')

const BOT_TOKEN = '1431230134:AAEJ2q2xi52hnJUGgPzzkMG_m-tInkHUpZY'

const api = new TG({
    token: BOT_TOKEN
})

let Messages = {
    start: '/start',
    lock: 'Закрыть защёлку',
    unlock: 'Открыть защёлку'
}

api.setMessageProvider(new TG.GetUpdateMessageProvider())
api.start()
    .then(() => {
        console.log('API is started')
    })
    .catch(console.err)

api.on('update', (update) => {
    const chat_id = update.message.chat.id

    switch(update.message.text) {
        case Messages.start:
            sendConfirmation(api, chat_id, true);
            break;
        case Messages.unlock:
            io.emit('event', 'Защёлка открыта');
            sendConfirmation(api, chat_id);
            break;
        case Messages.lock:
            io.emit('event', 'Защёлка закрыта');
            sendConfirmation(api, chat_id);
            break;
    }
})

let keyboard = {
    keyboard: [
        [Messages.unlock, Messages.lock]
    ],
    resize_keyboard: true
};

function sendConfirmation(api, chat_id, isFirstTime) {
    let message = {
        chat_id: chat_id,
        reply_markup: JSON.stringify(keyboard)
    };

    if(!isFirstTime) message.text = 'Действие выполнено';

    api.sendMessage(message);
}
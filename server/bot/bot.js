const {Telegraf} = require("telegraf");
require("dotenv").config();
const {BOT_TOKEN, WEB_APP,WEB_APP_PROFILE} = process.env
const User = require('../models/user.model')
const {message} = require("telegraf/filters");
const bot = new Telegraf(`${BOT_TOKEN}`)

const webAppUrl = `${WEB_APP}`;

bot.command('start', async (ctx) => {
    try {
        const chat_id = ctx?.chat?.id;
        const first_name = ctx?.chat?.first_name;
        const username = ctx?.chat?.username;

        const findUser = await User?.findOne({chat_id})

        if(findUser){
            if(findUser?.fullName && findUser?.phone){
                ctx.deleteMessage().catch((e) => console.log(e));
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});
                const {message_id} = await ctx.replyWithHTML('Приветствуем! выберите пункт меню 👇🏼', {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: 'Кабинет 😎', web_app: {url: WEB_APP_PROFILE}},{text: 'Обучение 📚', web_app: {url: WEB_APP}}],
                            [{text: 'Конкурсы 🏆', callback_data: 'concurs'},{text: 'Помощь❓', callback_data: 'concurs'}]
                        ]
                    }
                });
                await User.updateOne({chat_id}, {message_id})
            } else if(findUser?.action !== 'testModale' && !findUser?.fullName && !findUser?.phone){
                ctx.deleteMessage().catch((e) => console.log(e));
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});
                const {message_id} = await ctx.replyWithHTML('<b>Поздравляем с завершением курса!</b>\n\nВы узнали много нового об инвестициях и готовы сделать следующий шаг. Для того чтобы наши специалисты могли помочь вам с персональным сопровождением и консультациями, пожалуйста, оставьте свои контактные данные. Наш менеджер свяжется с вами для дальнейших шагов.\n\n<b>Пожалуйста, укажите ваше ФИО</b>', {});
                await User.updateOne({chat_id}, {message_id})
            } else {
                ctx.deleteMessage().catch((e) => console.log(e));
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});
                const {message_id} = await ctx.replyWithHTML('Приветствуем! Для прохождения вводного теста нажмите, пожалуйста, на кнопку 👇🏼', {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: 'Начать тест', web_app: {url: webAppUrl}}]
                        ]
                    }
                });
                await User.updateOne({chat_id}, {message_id})
            }
        } else{
            ctx.deleteMessage().catch((e) => console.log(e));
            const {message_id} = await ctx.replyWithHTML('Приветствуем! Для прохождения вводного теста нажмите, пожалуйста, на кнопку 👇🏼', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'Начать тест', web_app: {url: webAppUrl}}]
                    ]
                }
            });
            await User.create({chat_id, first_name, username, message_id, action: 'testModale'})
        }


    } catch (e) {
        console.error(e)
    }
});

bot.on(message, async ctx => {
    try {
        const chat_id = ctx?.chat?.id;
        const user_message = ctx?.message?.text

        const findUser = await User?.findOne({chat_id})
        const regex = /^[\p{L}\p{M}]+(?:[\s][\p{L}\p{M}]+)*$/u;

        if(findUser?.action === 'reg_fullName'){
            if(regex.test(user_message)){
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});

                await User.updateOne({chat_id}, {fullName:user_message, action:'reg_phone'})
                const {message_id} = await ctx.replyWithHTML('Поделитесь номером телефона 👇🏼', {
                    reply_markup: {
                        keyboard: [
                            [{
                                text: 'Отправить мой номер телефона',
                                request_contact: true
                            }]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
                await User.updateOne({chat_id}, {message_id})
            } else {
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});

                const {message_id} = await ctx.replyWithHTML('Введено не коректный ФИО, укажите ваше ФИО')
                await User.updateOne({chat_id}, {message_id})
            }

            ctx.deleteMessage().catch((e) => console.log(e));
        } else if(findUser?.action === 'reg_phone'){
            const phone = ctx?.update?.message?.contact?.phone_number
            if(phone){
                ctx.deleteMessage().catch((e) => console.log(e));
                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});
                await User.updateOne({chat_id}, {phone, action:''})
                const {message_id} = await ctx.replyWithHTML('Выберите пункт меню 👇🏼', {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: 'Кабинет 😎', web_app: {url: WEB_APP_PROFILE}},{text: 'Обучение 📚', web_app: {url: WEB_APP}}],
                            [{text: 'Конкурсы 🏆', callback_data: 'concurs'},{text: 'Помощь❓', callback_data: 'concurs'}]
                        ]
                    }
                });
                await User.updateOne({chat_id}, {message_id})
            } else{
                ctx.deleteMessage().catch((e) => console.log(e));

                if(findUser?.message_id)
                    ctx.deleteMessage(findUser?.message_id).catch((e) => {});

                const {message_id} = await ctx.replyWithHTML('Поделитесь номером телефона 👇🏼', {
                    reply_markup: {
                        keyboard: [
                            [{
                                text: 'Отправить мой номер телефона',
                                request_contact: true
                            }]
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true
                    }
                });
                await User.updateOne({chat_id}, {message_id})
            }
        } else {
            ctx.deleteMessage().catch((e) => console.log(e));
        }


    } catch (e){
        console.error(e)
    }
})

module.exports.bot = bot
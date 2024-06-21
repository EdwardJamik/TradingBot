const User = require("../models/user.model");
const {bot} = require("../bot/bot");
const axios = require("axios");

module.exports.getRegUser = async (req, res, next) => {
    try {
        const { chat_id } = req.body;

        const findUser = await User.findOne({chat_id})

        const {message_id} = await bot.telegram.sendMessage(chat_id,'<b>Поздравляем с завершением курса!</b>\n\nВы узнали много нового об инвестициях и готовы сделать следующий шаг. Для того чтобы наши специалисты могли помочь вам с персональным сопровождением и консультациями, пожалуйста, оставьте свои контактные данные. Наш менеджер свяжется с вами для дальнейших шагов.\n\n<b>Пожалуйста, укажите ваше ФИО</b>', {parse_mode:'HTML'})
        await bot.telegram.deleteMessage(chat_id, findUser?.message_id)
        await User.updateOne({chat_id}, {message_id, action: 'reg_fullName'})

        return res.json(true);

    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false, error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong` });
    }
};

module.exports.getSuccessModule = async (req, res, next) => {
    try {
        const { chat_id } = req.body;

        const findUser = await User.findOne({chat_id})

        if(findUser?.phone){
            return res.json(true);
        } else{
            return res.json(false);
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false, error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong` });
    }
};

module.exports.getUserData = async (req, res, next) => {
    try {
        const { chat_id } = req.body;

        const findUser = await User.findOne({chat_id})

        if(findUser) {
            const file_path = await getBase64UserPhoto(chat_id,bot)

            return res.json({fullName: findUser?.fullName,photo:file_path});

        }

        return res.json(true);

        async function getBase64UserPhoto(chat_id, bot) {
            try {
                const userPhoto = await bot.telegram.getUserProfilePhotos(chat_id);
                if (!userPhoto || userPhoto.total_count === 0) {
                    return null;
                    throw new Error('User has no profile photos.');
                }

                const file_id = userPhoto.photos[0][0].file_id;
                const filePath = await bot.telegram.getFileLink(file_id);

                const response = await axios.get(filePath.href, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, 'binary');

                const base64Photo = buffer.toString('base64');

                return base64Photo;
            } catch (error) {
                console.error('Error fetching user photo:', error);
                throw error;
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false, error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong` });
    }
};

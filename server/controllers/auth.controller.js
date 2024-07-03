const User = require("../models/user.model");
const listModule = require('../models/modules.model')
const Lesson = require('../models/lesson.model')
const finishedModule = require('../models/lessonFinished.model')
const {bot} = require("../bot/bot");
const axios = require("axios");


module.exports.getModuleList = async (req, res, next) => {
    try {
        const {chat_id} = req.body;

        const findUser = await User.findOne({chat_id})

        if(findUser){
            let userModule = [], next = false, i = 0

            // const {message_id} = await bot.telegram.sendMessage(chat_id, '<b>Поздравляем с завершением курса!</b>\n\nВы узнали много нового об инвестициях и готовы сделать следующий шаг. Для того чтобы наши специалисты могли помочь вам с персональным сопровождением и консультациями, пожалуйста, оставьте свои контактные данные. Наш менеджер свяжется с вами для дальнейших шагов.\n\n<b>Пожалуйста, укажите ваше ФИО</b>', {parse_mode: 'HTML'})
            // await bot.telegram.deleteMessage(chat_id, findUser?.message_id)
            // await User.updateOne({chat_id}, {message_id, action: 'reg_fullName'})
            const modules = await listModule.find({})

            for (const currentModule of modules) {
                const finishedModules = await finishedModule.countDocuments({chat_id, module_id: currentModule?._id})

                if (!next && finishedModules === parseInt(currentModule?.lesson_count) || i === 0) {
                    userModule.push({...currentModule?._doc, open: true})
                    next = finishedModules === parseInt(currentModule?.lesson_count)
                } else {
                    userModule.push({...currentModule?._doc, open: next})
                    next = finishedModules === parseInt(currentModule?.lesson_count);
                }
                i++
            }

            console.log(userModule)

            return res.json(userModule);
        } else {
            return res.json(false);
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong`
        });
    }
};

module.exports.getLessonList = async (req, res, next) => {
    try {
        const {chat_id, module_id} = req.body;

        const findUser = await User.findOne({chat_id})

        if(findUser){
            let lessonsList = {module:{},lesson:[]}, next = false, i = 0

            const modules = await listModule.findOne({_id:module_id})
            const finishedModules = await finishedModule.countDocuments({chat_id, module_id: module_id})
            const lessons = await Lesson.find({module_id:module_id})

            lessonsList = {...lessonsList, module:{...modules?._doc}}

            let foundFirstNotFinished = false;

            for (const currentLesson of lessons) {
                let lessonList = lessonsList?.lesson || [];

                let open;
                if (!foundFirstNotFinished && finishedModules < currentLesson?.lesson_index) {
                    open = true;
                    foundFirstNotFinished = true;
                } else {
                    open = finishedModules >= currentLesson?.lesson_index;
                }

                lessonList.push({...currentLesson?._doc, open: open, success: finishedModules >= currentLesson?.lesson_index});
                lessonsList = {...lessonsList, lesson: lessonList};
            }


            console.log(lessonsList)
            return res.json(lessonsList);
        } else {
            return res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong`
        });
    }
};

module.exports.getLessonContent = async (req, res, next) => {
    try {
        const {chat_id, lesson_id} = req.body;

        const findUser = await User.findOne({chat_id})

        if(findUser){

            const lesson = await Lesson.findOne({_id:lesson_id})
            const module = await listModule.findOne({_id: lesson?.module_id})
            const answer = await finishedModule.findOne({lesson_id,chat_id})

            return res.json({lesson,module,answer});
        } else {
            return res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong`
        });
    }
};

module.exports.setAnswer = async (req, res, next) => {
    try {
        const {chat_id, module_id, lesson_id, answer} = req.body;

        const findUser = await User.findOne({chat_id})

        if(findUser){

            const lesson = await finishedModule.findOne({lesson_id,module_id,chat_id})

            if(lesson){
                await finishedModule.updateOne({lesson_id,module_id,chat_id},{answer_index:answer})
                return res.json(true);
            } else {
                await finishedModule.insertMany({lesson_id,module_id,chat_id,answer_index:answer})
                return res.json(true);
            }

        } else {
            return res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: `[${new Date().toLocaleTimeString('uk-UA')}] Something went wrong`
        });
    }
};

module.exports.getRegUser = async (req, res, next) => {
    try {
        const { chat_id } = req.body;

        const findUser = await User.findOne({chat_id})

        if(!findUser?.phone) {
            const {message_id} = await bot.telegram.sendMessage(chat_id, '<b>Поздравляем с завершением курса!</b>\n\nВы узнали много нового об инвестициях и готовы сделать следующий шаг. Для того чтобы наши специалисты могли помочь вам с персональным сопровождением и консультациями, пожалуйста, оставьте свои контактные данные. Наш менеджер свяжется с вами для дальнейших шагов.\n\n<b>Пожалуйста, укажите ваше ФИО</b>', {parse_mode: 'HTML'})
            await bot.telegram.deleteMessage(chat_id, findUser?.message_id)
            await User.updateOne({chat_id}, {message_id, action: 'reg_fullName'})
        }

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

const mongoose = require("mongoose");
const {bot} = require("./bot/bot")
const app = require("./server.js");
require("dotenv").config();

const { MONGO_URL, BOT_PORT, PORT } = process.env
const listen_port = PORT || 6000;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB is connected successfully')
    app.listen(listen_port, () => console.log(`Server running on PORT : ${listen_port}`))
    bot.launch(BOT_PORT, () => {
        console.log(`Telegram bot is running on port ${BOT_PORT}`);
    })

}).catch(err => console.error(err))


const mongoose = require("mongoose");

const lessonFinishedSchema = new mongoose.Schema({
    module_id: {
        type: String
    },
    lesson_id: {
        type: String,
        default: null
    },
    chat_id: {
        type: String,
        default: null
    },
    answer_index: {
        type: String,
        default: null
    },
    updatedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
    },
},{ timestamps: true })

module.exports = mongoose.model("LessonFinished", lessonFinishedSchema);
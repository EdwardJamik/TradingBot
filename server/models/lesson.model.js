const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    module_id: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    lesson_time: {
        type: String,
        default: null
    },
    lesson_index: {
        type: String,
        default: null
    },
    question: {
        type: String,
        default: null
    },
    answer: {
        type: Array,
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

module.exports = mongoose.model("Lessons", lessonSchema);
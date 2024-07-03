const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content:{
        type: String,
        default:null
    },
    image:{
        type: String,
        default:null
    },
    lesson_count:{
        type: String,
        default:null
    },
    updatedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
    },
},{ timestamps: true })

module.exports = mongoose.model("Module", moduleSchema);
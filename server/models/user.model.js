const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    chat_id: {
        type: String,
        unique:true
    },
    first_name:{
        type: String,
        default:null
    },
    username:{
        type: String,
        default:null
    },
    action:{
        type: String,
        default:null
    },
    message_id:{
        type: String,
        default:null
    },
    fullName:{
        type: String,
        default:null
    },
    ban: {
        type: Boolean,
        default:false
    },
    language: {
        type: String,
        default:'en'
    },
    phone: {
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

module.exports = mongoose.model("Users", userSchema);
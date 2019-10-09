const mongoose = require("mongoose")
const express = require("express")
const Schema = mongoose.Schema;

const NewCategory = {
    name: {
        type:String,
        required: true
    },
    desc : {
        type:String,
        required:true
    },
    dateRegister : {
        type:Date,
        default : Date.now()
    }
}


mongoose.model("category" , NewCategory)
const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Client = {

    name : {
        type: String,
        required : true
    },
    otherName : {
        type: String,
        required : true
    },
    cpfClient : {
        type : String,
        required : true
    },
    telephoneClient : {
        type : String,
        required : true,
    },
    emailClient : {
        type : String,
        required : true
    },
    adressClient : {
        type : String,
        required : true
    }
}



mongoose.model("client" , Client)

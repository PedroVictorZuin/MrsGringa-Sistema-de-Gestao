const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Client = {
    name = {
        required : true,
        type : String,
    },

    lastName = {
        required : true,
        type : String,
    },
    numberTelefon = {
        required : true,
        type : String,
    },
    cpf = {
        required : true,
        type : String,
    },
    adress = {
        required : true,
        type : String,
    },
    points = {
        type: Number,
        required : true,
    },
    dateRegister : {
        type: Date.now()
    }

}

mongoose.model("client" , Client)

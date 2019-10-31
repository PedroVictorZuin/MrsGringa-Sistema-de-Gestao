const mongoose = require("mongoose")
const express = require("express")
const Schema = mongoose.Schema;

const SaidaDeProdutoRelatorio = {
    referencia : {
        type : String,
        required : true
    },
    motivo : {
        type: String,
        required : true
    },
    desc : {
        type: String,
        required : true
    },
    quantidadeRetirada : {
        type : Number,
        required: true
    },
    obs : {
        type : String,
        required : true
    },
    dataSaida : {
        type : Date,
        default : Date.now()
    }


}




mongoose.model("saidadeprodutorelatorio" , SaidaDeProdutoRelatorio )
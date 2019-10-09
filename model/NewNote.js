const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;


const Note = {

numeroNota: {
    require : true,
    type:String
},

quantidadeDeItens : {
    require: true,
    type:Number
},

nomeFornecedor : {
    require : true,
    type : String
}


}


mongoose.model("note" , Note)




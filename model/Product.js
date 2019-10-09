const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewProduct = {
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    reference : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    category : {
        type: Schema.Types.ObjectId,
        ref: "category",
        required : true
    },
    buyValue : {
        type : Number,
        required : true 
    },
    sellValue : {
        type : Number,
        required : true
    }

}



mongoose.model("product" , NewProduct)
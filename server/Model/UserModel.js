const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:[{ 
        addressType:{
            type:String,
            trim:true
        },
        streetAddress:{
            type:String,
            trim:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        postCode:{
            type:String,
            required:true
        },
        primary:{
            type:String,
            required:true
        }
    }]
},{timestamps:true})

const user = mongoose.model('User',userSchema)

module.exports = user
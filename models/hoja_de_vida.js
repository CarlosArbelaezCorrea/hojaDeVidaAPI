const mongoose = require('mongoose')

const hojaDeVidaSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    document_id:{
        type:Number,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    other_studies_1:String,
    other_studies_2:String,
    other_studies_3:String,

    work_experience:{
        type:String,
        required:true
    },
    work_reference_1:{
        type:String,
        required:true
    },
    work_reference_2:{
        type:String,
        required:true
    },
    work_reference_3:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required: true
    },
    is_active: {
        type:Boolean,
        default:true
    }

})

const hojaDeVida = mongoose.model('hojaDeVida', hojaDeVidaSchema)

module.exports = {
    hojaDeVida
}
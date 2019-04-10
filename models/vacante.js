const mongoose = require('mongoose')

const vacanteSchema = new mongoose.Schema ({
    vacant_name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    previous_experience:{
        type:String,
        required:true
    },
    years_of_experience:{
        type:Number,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    contact_email:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    contact_phone:{
        type:Number,
        required:true
    }   
})

const Vacante = mongoose.model('Vacante', vacanteSchema)

module.exports = {
    Vacante
}
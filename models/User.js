const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_FACTOR = 10

const userSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    last_name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_active:{
        type:Boolean,
        default:true
    },
    hoja_de_vida:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'hojaDeVida',
            require:true
        }
    ],
    vacante:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'vacante',
            require:true
        }
    ]
},{timestamps:true})

userSchema.pre('save', function(next) {        //antes de guardar el userSchema vamos a hacer algo
    let user = this                             //el usuario va a ser el que se este guardadno en el momento, osea, userSchema
    if(!user.isModified('password')) {return next()}  // si el password no se ha modificado continue
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {       //si se modifico el usuario bycript va a recibir el numero de vueltas y va a recibir unos parametros
        if (err) return next(err)
        
        bcrypt.hash(user.password, salt, function (err, hash) { //coge la contrasena del usuario y da las vueltas definidas
            if(err) {return next(err)}
        
            user.password = hash
        next()
        })
    })
})

//Metodo para comparar las contrasenas
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}
const mongoose = require('mongoose')
const DB_URL = "mongodb+srv://carlos:1976@cluster0-kudby.mongodb.net/proyecto?retryWrites=true"

const {hojaDeVida} = require("./hoja_de_vida")
const {Vacante} = require("./vacante")
const {User} = require("./User")

const dbConnection = mongoose.connect(DB_URL, {useNewUrlParser:true}, (err) => {
    !err
        ?console.log('DB conection success')
        :console.log(err)
})

module.exports = {
    hojaDeVida,
    Vacante,
    User,
    dbConnection
};

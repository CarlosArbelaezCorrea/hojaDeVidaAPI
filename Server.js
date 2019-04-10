const express = require('express')

const { hojaDeVida, Vacante, User, dbConnection} = require('./models')

const app = express()

const PORT = 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send({message:"Server on"})
})

//------HOJA DE VIDA CRUD-------
app.post('/api/create/hojaDeVida', (req, res) => {
    const {name, last_name, email, document_id, profession, other_studies_1, 
        other_studies_2, other_studies_3, work_experience, work_reference_1, 
        work_reference_2, work_reference_3, phone_number, user_id} = req.body
    const newhojaDeVida = hojaDeVida({
        name,
        last_name,
        email,
        document_id,
        profession,
        other_studies_1,
        other_studies_2,
        other_studies_3,
        work_experience,
        work_reference_1,
        work_reference_2,
        work_reference_3,
        phone_number,
        user_id
    })
    newhojaDeVida.save((err, hojaDeVida) => {
        !err
            ?res.status(200).send(hojaDeVida)
            :res.status(409).send(err)
    })
})

app.get('/api/get/hojaDeVida', (req, res) => {
    hojaDeVida.find().exec()
        .then((hojaDeVida) => {
            res.status(200).send(hojaDeVida)
        }).catch((err) => {
            res.status(404).send(err)
        });
})

app.get('/api/get/hojaDeVida/:hojaDeVidaId', (req, res) => {
    const {hojaDeVidaId} = req.params
    hojaDeVida.findById(hojaDeVidaId).exec()
        .then((hojaDeVida) => {
            res.status(200).send(hojaDeVida)
        }).catch((err) => {
            res.status(404).send
        });
})

app.put('/api/update/hojaDeVida/:hojaDeVidaId', (req, res) => {
    const {hojaDeVidaId} = req.params
    hojaDeVida.findByIdAndUpdate(hojaDeVidaId, {$set:req.body}, {new:true}).exec()
    .then((hojaDeVida) => {
        res.status(200).send(hojaDeVida)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

app.delete('/api/delete/hojaDeVida/:hojaDeVidaId', (req, res) => {
    const {hojaDeVidaId} = req.params
    hojaDeVida.findOneAndDelete(hojaDeVidaId).exec()
    .then((hojaDeVida) => {
        res.status(200).send(`La hoja de vida ${hojaDeVidaId} ha sido borrada`)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

//------VACANTES CRUD-------

app.post('/api/create/vacante', (req, res) => {
    const {vacant_name, company, previous_experience, years_of_experience, salary, contact_email, contact_phone, user_id}=req.body
    const newVacante = Vacante ({
        vacant_name,
        company,
        previous_experience,
        years_of_experience,
        salary,
        contact_email,
        contact_phone,
        user_id
    })
    newVacante.save((err, vacante) => {
        !err
            ?res.status(200).send(vacante)
            :res.status(409).send(err)
    });
})

app.get('/api/get/vacante', (req, res) => {
    Vacante.find().exec()
    .then((vacante) => {
        res.status(200).send(vacante)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

app.get('/api/get/vacante/:vacanteid', (req, res) => {
    const {vacanteid} = req.params
    Vacante.findById(vacanteid).exec()
    .then((vacante) => {
        res.status(200).send(vacante)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

app.delete('/api/delete/vacante/:vacanteid', (req, res) => {
    const {vacanteid} = req.params
    Vacante.findOneAndDelete(vacanteid, {$set:{is_active:false}}).exec()
    .then((vacante) => {
        res.status(200).send(`La vacante ${vacanteid} ha sido borrada`)
    }).catch((err) => {
        res.status(409).send(err)
    });
})

//------USER CRUD-------
app.post('/api/create/user' ,(req, res) => {
    const {name, last_name, email, password} = req.body
    const newUser = User ({
        name,
        last_name,
        email,
        password
    })
    newUser.save((err, user) => {
        !err
            ?res.status(200).send(user)
            :res.status(409).send(err)
    })
})

app.delete('/api/delete/user/:userid', (req, res) => {
    const {userid} = req.params
    User.findOneAndDelete(userid, {$set:{is_active:false}}).exec()
    .then((user) => {
        res.status(200).send(`El usuario ${userid} ha sido borrado`)
    }).catch((err) => {
        res.status(409).send(err)
    });
})

app.post('/api/login/user', (req, res) => {
    const {email, password} = req.body
    User.findOne({email:email}).exec()
    .then((user) => {
        user.comparePassword(password, (err, isMatch) => {
            !err
                ?res.send(isMatch)
                :res.send(err)
        })
    }).catch((err) => {
        res.send(err)
    });
})

app.get('/api/hojaDeVida/users', (req, res) => {
    User.find().populate('hojaDeVida').exec()
    .then((users) => {
        res.status(200).send(users)
    }).catch((err) => {
        res.status(404).send(err)
    });
})

app.get('/api/vacante/users', (req, res) => {
    User.find().populate('vacante').exec()
    .then((users) => {
        res.status(200).send(users)
    }).catch((err) => {
        res.status(404).send(err)
    });
})


//------CONNECTION------//


dbConnection         // es una promesa, que tiene que estar conectada a una base de datos para recibir consultas
    .then((response) => {
        console.log(response);
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(error)
    })
    
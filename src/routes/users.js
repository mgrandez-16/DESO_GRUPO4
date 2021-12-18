const express = require('express');
const router = express.Router();
  
const User = require('../model/User');

router.get('/',(req, res) => {
    res.render('index');
});

router.get('/registrar',(req, res) => {
    const errors = [];
    res.render('register', {errors});
});

router.post('/register',(req, res) => {
    const {first_name, last_name, email, telephone, user_sponsor, username,password, confirm_password} = req.body;
    const errors = [];

    if (!username){
        errors.push({text: 'Porfavor escribe un usuario'});
    }

    if(!password){
        errors.push({text: 'Porfavor escribe una contraseña'});
    }

    if(!email){
        errors.push({text: 'Porfavor escribe un correo'});
    }

    if(password != confirm_password){
        errors.push({text: 'Contraseña no coincide'});
    }

    if(password < 7){
        errors.push({text: 'Contraseña tiene que ser mayor de 7 caracteres'});
    }

    if(errors.length > 0){
        res.render('register', {errors});
    }else{
        const newUser = new User({first_name, last_name, email, telephone, user_sponsor, username, password});
        newUser.save();
        res.redirect('/');
    }
});

router.post('/authenticate',(req, res) => {
    const {username,password} = req.body;

    User.findOne({username}, (err, user) => {
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR USUARIO');
        }else if (!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR');
                }else if (result){
                    res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE');
                }else{
                    res.status(500).send('USUARIO Y/O CONTRASEÑA NO EXISTE');
                }
            });
        }
    })
});


module.exports = router;
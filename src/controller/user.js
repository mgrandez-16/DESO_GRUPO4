const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const saltRounds = 10;

const userSchemma = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
  
});

userSchemma.pre('save', function(next){
    if (this.isNew || this.isModified('password')){
        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

userSchemma.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password,this.password,function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });
}

module.exports = mongoose.model('Users', userSchemma);
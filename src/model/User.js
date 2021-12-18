const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchemma = new mongoose.Schema({
    first_name: { type: String, require: true},
    last_name: { type: String, require: true},
    email: { type: String, require: true},
    telephone: { type: String, require: true},
    user_sponsor: { type: String, "default": "batto"},
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    date: {type: Date, default: Date.now}
}); 

UserSchemma.pre('save', function(next){
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

UserSchemma.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password,this.password,function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });
}



module.exports = mongoose.model('Users', UserSchemma);
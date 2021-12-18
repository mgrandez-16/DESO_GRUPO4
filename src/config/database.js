const mongoose = require('mongoose');

const mongo_uri = "mongodb://localhost/dbredafiliados";

mongoose.connect(mongo_uri)
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
const mongoose = require('mongoose');

const URI = 'mongodb+srv://CamiloArrieta26:Mariabelen19@arrieta26.hfp72.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
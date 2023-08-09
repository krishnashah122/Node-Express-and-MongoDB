// require the mongoose library
const mongoose = require('mongoose');

// connecting to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

// db access the connection (to check if it is successful)
const db = mongoose.connection;

// if any error occur while connecting to the database db
db.on('error', console.error.bind(console, 'error connecting to db'));

// if the database has been connected successfully then print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
});
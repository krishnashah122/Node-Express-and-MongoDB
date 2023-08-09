const mongoose = require('mongoose');

// creating the database schema
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

// to name the collection in the database and to define the collection by the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
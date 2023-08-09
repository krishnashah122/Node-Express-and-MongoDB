const express = require('express');
const path = require('path'); // path module provides a way of working with directories and file paths
const port = 3000;

const db = require('./config/mongoose');
// require the schema to use it
const Contact = require('./models/contact');
const { count, log } = require('console');

const app = express();

// an app has multiple properties and app.set("property", "value") is used to add properties and sets its value
app.set('view engine', 'ejs'); // it tells express that we will use  EJS as view engine
app.set('views', path.join(__dirname, 'views')); // path.join() joins all its arguments to form a single path


// Middleware : It takes the request object before it reaches to the controller (route) and perform specific task with the data. It also takes the response object and perform some tasks and then return it to the destination. It holds has a middleware function which specifies the task that need to be performed on the data. The function app.use() indicates a middleware.

// Custom Middleware : This middleware function has three parameters i.e. req, res and next ('next' passes on whatever changes have been made and call the next middleware and if there is no any middleware then it reaches to the controller).

// built-in middlewares
app.use(express.urlencoded()); // parser middleware
app.use(express.static('assests')); // to serve the static files such as images, css and javascript

// custom middleware
// app.use(function(req, res, next){
//     console.log("Custom Middleware");
//     next();
// });



app.get('/', function(req, res){

    // fetch the data from the database
    // find() is used to select documents on the basis of given filter
    Contact.find({})
    // if data has been successfully fetched from the database
    .then((contacts) => {
        // res.render() is used to render a view and sends the rendered HTML string to the client
        return res.render('home', {
            title: "Contact List", // keeping dynamic title of the page
            contact_list: contacts
        });
    })
    // if error occur while fetching the data from the database
    .catch((err) => {
        console.log('Error in fetching contacts from db');
        return;
    });

});


app.get('/practice', function(req, res){

    return res.render('practice', {
        title: "Practicing EJS"
    })

});


app.post('/create-contact', function(req, res){

    // creating an instance of Contact schema and saving it into the database
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    // if error does not occur while creating a contact
    .then(() => {
        console.log('If no error');
        res.redirect('back');
    })
    // if error occur while creating a contact
    .catch((err) => {
        console.log('error in creating a contact!');
        return;
    });

});


// for deleting the contact
app.get('/delete-contact/', function(req, res){

    // get the id of contact that you want to delete from query in the url
    let id = req.query.id; // query params

    // find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id)
    // if successfully search the database without any error
    .then(() => {
        return res.redirect('back'); // redirects to the previous page
    })
    // if error occurs while searching in the database
    .catch((err) => {
        console.log("error in deleting an object from the database");
        return;
    })

});

// listen app at given port
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
});
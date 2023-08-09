// Creating express server

const express = require("express");

const app = express();

// When a GET request is made then it executes app.get("url", function(req, res){})
// "/" means route location of the website i.e. homepage of website.
app.get("/", function(req, res){
    // This callback function will be executed when GET request is made for "url".

    // send() is used to send responses
    res.send("<h1>This is Home Page.</h1>");
});

// When a GET request is made from "/contact" route
app.get("/contact", function(req, res){
    res.send("<h1>This is Contact Page.</h1>");
})

// When a GET request is made from "/about" route
app.get("/about", function(req, res){
    res.send("<h1>This is About Page.</h1>");
})

app.listen(3000, function(){
    console.log("The server has started on port 3000.");
});

// npm i body-parser
const express = require('express');//emport express module
const fs=require('fs');
const app=express();//make a app from express
const path=require('path');
const bodyparser=require('body-parser');
const port=8000;
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc:String
  });

var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS RELATED STUFF
app.use('/static',express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG RELATED STUFF
app.set('view engine', 'pug') // set template engine as pug
app.set('views',path.join(__dirname,'views'));// set the view directory


// ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug');
 })
 app.post('/contact',(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("<h2>This item has been saved to data base</h2>")
    }).catch(()=>{
        res.status(400).send("Item was not saved to data base")
    })
//    res.status(200).render('contact.pug');
})

//START THE SERVER 
app.listen(port,()=>{
    console.log(`serving is running on port ${port}`);
})
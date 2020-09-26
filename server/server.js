const express = require('express')
const parser = require('body-parser')
const request = require('request');
const Url = require('./models/url');
const  cors = require('cors');

var connection, nbrUrls

// create mongo client object
const mongoose = require('mongoose');

// setting app express 
var app = express()

// to support URL-encoded bodies 
app.use(express.urlencoded());

// applying a json parser 
app.use(parser.json())

// middleware for cross origin
app.use(cors());

// connection to the database
mongoose.connect('mongodb+srv://lyes1994:lyes1994@cluster0.o93oo.mongodb.net/url-shortener?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB réussie !')
    Url.find()
        .then(urls => {nbrUrls = urls.length})
        .catch((err) => {throw err})
    }).catch(() => console.log('Connexion à MongoDB échouée !'));


// making a default way
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// starting a server on port 8000
app.listen(8000, ()=> {
    console.log("server listening on port 8000")
})

// recieving url shortening requests
app.post('/getUrl',(req,res) => {
    console.log("request recieved")
    request.post({url:'https://goolnk.com/api/v1/shorten', form: {url: req.body.url}}, 
        function(err,httpResponse,body){
             if(err) throw err
             const url = new Url({long_url: req.body.url , short_url : JSON.parse(body).result_url, conversion_date: new Date()})
             url.save()
                .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
                .catch(error => res.status(400).json({ error }));
             nbrUrls++;
             res.send({
                 nbr: nbrUrls,
                 url_result:  JSON.parse(body).result_url
             })
    })
})


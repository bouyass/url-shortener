const express = require('express')
const parser = require('body-parser')
// setting app express 
var app = express()


// applying a json parser 
app.use(parser.json())

// making a default way
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// starting a server on port 8000
app.listen(8000, ()=> {
    console.log("server listening on port 8000")
})

app.get('/getUrl',(req,res) => {
    
})


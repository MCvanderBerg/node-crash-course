const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');

const app = express()
mongoose.connect('mongodb+srv://ChristiaanVanDerBerg:Noeline101@mycluster.nhdujgl.mongodb.net/')
    .then(() => {
        app.listen(3000)
        console.log('Connect to mongoDB')
    })
    .catch((err)=>{
        console.log('Could not connect to the database')
    })


app.get('/', (req, res) =>{
    res.redirect('/blogs')
})

app.get('/blogs', (req, res)=> {
    res.render('blogs/index');
})
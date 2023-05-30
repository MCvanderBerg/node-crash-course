const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const Blog = require('./models/blog')

const app = express();
mongoose.connect('mongodb+srv://ChristiaanVanDerBerg:Noeline101@mycluster.nhdujgl.mongodb.net/')
    .then(() => {
        app.listen(3000)
        console.log('Connect to mongoDB')
    })
    .catch((err)=>{
        console.log('Could not connect to the database')
    })

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.redirect('/blogs')
})

app.get('/blogs', (req, res)=> {
    Blog.find()
        .then((result) => {
            res.render('blogs/index', { title: 'Blogs', blogs: result });
        })
})

app.use((req, res) => {
    res.status(404)
       .render('404', { title: '404' })
})
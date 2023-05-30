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

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) =>{
    res.redirect('/blogs')
       .then((result) => {
            console.log('blogs should be showing')
       })
       .catch((err) => {
            console.log(err)
       })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

app.get('/blogs', (req, res)=> {
    Blog.find()
        .then((result) => {
            res.render('blogs/index', { title: 'Blogs', blogs: result });
        })
        .catch(err => console.log(err))
})
app.post('/blogs', (req, res) => {
    new Blog(req.body)
        .save()
        .then(() => {
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
})
app.get('/blogs/create', (req, res) => {
    res.render('blogs/create', { title: 'Create blog' })
})
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(result => {
            res.render('blogs/details', { title: result.title, blog: result })
        })
        .catch(err => console.log(err))
})


app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
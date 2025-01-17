const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const blogRouter = require('./routes/blogRoutes');


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

app.use('/blogs', blogRouter)

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
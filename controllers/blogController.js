const Blog = require('../models/blog');

const blog_index = (req, res)=> {
    Blog.find()
        .then((result) => {
            res.render('blogs/index', { title: 'Blogs', blogs: result });
        })
        .catch(err => console.log(err))
}

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json({ redirect: '/blogs' })    
        })
        .catch(err => console.log(err))
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create blog' })
}

const blog_create_post = (req, res) => {
    new Blog(req.body)
        .save()
        .then(() => {
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
}

const blog_get_id = (req, res) => {
    Blog.findById(req.params.id)
        .then(result => {
            res.render('blogs/details', { title: result.title, blog: result })
        })
        .catch(err => console.log(err))
}

module.exports = { 
    blog_delete,
    blog_create_get,
    blog_create_post,
    blog_get_id,
    blog_index,
}
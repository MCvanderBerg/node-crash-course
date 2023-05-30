const express = require('express');
const {
    blog_delete,
    blog_create_get,
    blog_create_post,
    blog_get_id,
    blog_index
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', blog_index);
router.post('/', blog_create_post);
router.get('/create', blog_create_get);
router.delete('/:id', blog_delete);
router.get('/:id', blog_get_id);


module.exports = router;
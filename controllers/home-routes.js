const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');


// main page (homepage)
router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'article',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData => {
        const blogs = dbBlogData.map(blog => blog.get({plain: true}));
        res.render('homepage', { blogs });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// login screen
router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;
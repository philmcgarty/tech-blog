const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');


// main page (homepage)
router.get('/', (req, res) => {
    console.log(req.session);
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
        res.render('homepage', { 
            blogs,
            loggedIn: req.session.loggedIn
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// login screen
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});

// signup screen
router.get('/sign-up', (req, res) => {
  if(req.session.loggedIn){
      res.redirect('/');
      return;
  }
  res.render('sign-up');
});

// new blog screen
router.get('/new-blog', (req, res) => {
  if(req.session.loggedIn){
      res.render('new-blog');
      return;
  }
  res.render('login');
});

router.get('/blog/:id', (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'article',
        'title',
        'created_at',
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
        if (!dbBlogData) {
          res.status(404).json({ message: 'No blog found with this id' });
          return;
        }
  
        // serialize the data
        const blog = dbBlogData.get({ plain: true });
  
        // pass data to template
        res.render('single-blog', { 
            blog,
            loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;
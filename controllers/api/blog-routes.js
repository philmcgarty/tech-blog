const router = require('express').Router();
const { User, Blog } = require('../../models');
const sequelize = require('../../config/connection');


// get all blogs
router.get('/', (req, res)=>{
    Blog.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'article',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// add a blog
router.post('/', (req, res)=>{
    Blog.create({
        title: req.body.title,
        article: req.body.article,
        user_id: req.body.user_id
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
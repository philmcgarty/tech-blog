const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');


// get all
router.get('/', (req, res)=>{
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

// get 1 user
router.get('/:id', (req, res)=>{
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
              model: Blog,
              attributes: ['id', 'title', 'article', 'created_at']
            },
            // include the Comment model here:
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'created_at'],
              include: {
                model: Blog,
                attributes: ['title']
              }
            },
            // {
            //   model: Blog,
            //   attributes: ['title'],
            // //   through: Vote,
            // //   as: 'voted_posts'
            // }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create new user
router.post('/', (req, res)=>{
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// user login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
          username: req.body.username
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }
        // Verify user for login
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }          
        res.json({ user: dbUserData, message: 'Login successful!' });
      });
})

// delete user
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
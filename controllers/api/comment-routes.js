const router = require('express').Router();
const { Comment } = require('../../models');
//const withAuth = require('../utils/auth'); - had issues, so not using for now

// find all comments
router.get('/', (req, res) => {
    Comment.findAll({
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new comment
router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        blog_id: req.body.blog_id,
        // use the id from the session
        user_id: req.session.user_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

//   delete a comment - not implemented yet
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('./../../middleware/auth');

const PostModel = require('./../../models/Post');
const UserModel = require('./../../models/User');
const ProfileModel = require('./../../models/Profile');

// @route   POST api/posts
// @desc    Create new Post
// @access  public
router.post(
  '/',
  [
    auth,
    [
      check('title', 'The post title is required.').not().isEmpty(),
      check('text', 'The post content is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const userId = req.user.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await UserModel.findById(userId).select('-password');
      if (!user) return res.status(404).json({ msg: 'User not found.' });

      const newPost = new PostModel({
        title: req.body.title,
        text: req.body.text,
        avatar: user.avatar,
        user: userId,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:post_id
// @desc    Get single post
// @access  private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found.' });

    res.json(post);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError')
      return res.status(400).json({ msg: 'Post not found.' });

    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete single post
// @access  private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found.' });

    // Check if the user is the right one
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed.' });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError')
      return res.status(400).json({ msg: 'Post not found.' });

    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  private
router.put('/like/:post_id', [auth, [check()]], async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.post_id);
    const userId = req.body.user;

    if (!post) return res.status(404).json({ msg: 'Post not found.' });

    const alreadyLiked = post.likes.find((like) => like.user === userId);
    if (alreadyLiked)
      return res.status(400).json({ msg: 'You already liked this post!' });

    post.likes.push({ user: userId });

    post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError')
      return res.status(400).json({ msg: 'Post not found.' });

    res.status(500).send('Server error');
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  private
router.post(
  '/comment/:post_id',
  [auth, [check('text', 'The post content is required.').not().isEmpty()]],
  async (req, res) => {
    const userId = req.user.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await UserModel.findById(userId).select('-password');
      const post = await PostModel.findById(req.params.post_id);

      if (!user) return res.status(404).json({ msg: 'User not found.' });

      const newComment = {
        text: req.body.text,
        avatar: user.avatar,
        user: userId,
      };

      post.comments.push(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete a comment
// @access  private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const post = await PostModel.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not found.' });

    // Check if the user is the right one
    if (post.user.toString() !== userId)
      return res.status(401).json({ msg: 'User not authorized' });

    const existingComment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!existingComment)
      return res.status(404).json({ msg: 'Comment not found' });

    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );

    await post.save();

    res.json({ msg: 'Comment was removed.' });
  } catch (err) {
    console.error(err);
    if (err.name === 'CastError')
      return res.status(400).json({ msg: 'Post not found.' });

    res.status(500).send('Server error');
  }
});

module.exports = router;

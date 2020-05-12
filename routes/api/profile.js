const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

const auth = require('../../middleware/auth');
const verifyProps = require('./../../middleware/verifyProps');

const ProfileModel = require('../../models/Profile');
const UserModel = require('../../models/User');

// @route   GET api/profile/me
// @desc    Test route
// @access  public
router.get('/me', [auth], async (req, res) => {
  const userId = req.user.id;

  try {
    const profile = await ProfileModel.findOne({
      user: userId,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user.',
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create/update a user profile
// @access  Private
router.post(
  '/',
  [
    verifyProps(ProfileModel),
    auth,
    [
      check('status', 'Status is required!').not().isEmpty(),
      check('skills', 'Skills is required!').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const userId = req.user.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const fieldKeys = Object.keys(req.body);
    const managedFields = {};
    for (field of fieldKeys) {
      const value = req.body[field];
      if (field === 'skills')
        managedFields[field] = value.split(',').map((skill) => skill.trim());
      else if (value) managedFields[field] = value;
    }
    managedFields.user = userId;

    try {
      // Update in case profile exists
      let profile = await ProfileModel.findOne({ user: req.user.id });
      if (profile) {
        profile = await ProfileModel.findOneAndUpdate(
          { user: userId },
          { $set: managedFields },
          { new: true }
        );

        return res.json(profile);
      } else {
        profile = new ProfileModel(managedFields);
        await profile.save();
        res.json(profile);
      }
    } catch (err) {
      res.status(500).send('Server error.');
    }
    // const { company, links, status, location, bio, description, }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate('user', [
      'name',
      'avatar',
    ]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by uid
// @access  Public
router.get('/users/:user_id', async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).send({ msg: 'Theres no profile for this user.' });

    res.json(profile);
  } catch (err) {
    if (err.name === 'CastError')
      return res.status(400).send({ msg: 'Theres no profile for this user.' });

    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   DELETE api/profile/user/:user_id
// @desc    Delete profile by uid
// @access  Public
router.delete('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    // @todo - users posts
    // Remove profile
    await ProfileModel.findOneAndRemove({
      user: id,
    });

    await UserModel.findOneAndRemove({
      _id: id,
    });

    res.json({ msg: 'User deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   PUT api/profile/experience
// @desc    Update profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const userId = req.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await ProfileModel.findOne({ user: userId });
      if (!profile) {
        return res.status(400).send('Could not find profile.');
      }

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete from profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await ProfileModel.findOne({ user: userId });
    if (!profile) {
      return res.status(400).send('Could not find profile.');
    }

    profile.experience = profile.experience.filter(
      (exp) => exp.id !== req.params.exp_id
    );

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   PUT api/profile/education
// @desc    Update profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'fieldOfStudy date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const userId = req.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await ProfileModel.findOne({ user: userId });
      if (!profile) {
        return res.status(400).send('Could not find profile.');
      }

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete from profile education
// @access  Private
router.delete('/education/:education_id', auth, async (req, res) => {
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await ProfileModel.findOne({ user: userId });
    if (!profile) {
      return res.status(400).send('Could not find profile.');
    }

    profile.education = profile.education.filter(
      (exp) => exp.id !== req.params.education_id
    );

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repositories from github
// @access  Public

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos`,
      params: {
        client_id: config.get('githubClientId'),
        client_secret: config.get('githubSecret'),
        per_page: 5,
        sort: 'created:asc',
      },
    };

    const { data } = await axios.get(options.uri, { params: options.params });
    res.send(data);
  } catch (err) {
    if (err.response.status === 404)
      res.status(404).json({ msg: 'No github profile found! ' });
    else res.status(500).send('Server error');
  }
});

module.exports = router;

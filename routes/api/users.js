const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const UserModel = require('./../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid mail').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exists
      let user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists.'
            }
          ]
        });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        // Size
        s: '200',
        // Rating
        r: 'pg',
        // Default
        d: 'mm'
      });

      // Create new User instance for saving to Mongo
      user = new UserModel({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save to Mongo
      await user.save();

      // Json Webtoken
      const payload = {
        user: {
          // _id in Mongo - Mongoose abstraction
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }

    // Return jsonwebtoken

    return;
  }
);

module.exports = router;

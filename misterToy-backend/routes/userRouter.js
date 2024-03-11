const express = require('express');
const router = express.Router();

const User = require('../user.js');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    if (req.body.password === user.password) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'Password does not match' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.body.cart);
    user.cart = req.body.cart
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
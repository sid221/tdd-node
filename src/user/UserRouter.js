const express = require('express');
const bcrypt = require('bcrypt');

const User = require('./User');

const router = express.Router();

router.post('/api/v1/users', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({ username, email, password: hashedPassword });
    return res.status(200).send({ message: 'User created' });
  } catch (error) {
    console.log('error => ', error);
    return res.status(500).send({ error: 'something went wrong!' });
  }
});

module.exports = router;

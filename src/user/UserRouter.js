const express = require('express');
const UserService = require('./UserService');

const router = express.Router();

router.post('/api/v1/users', async (req, res) => {
  try {
    UserService.save(req.body);
    return res.status(200).send({ message: 'User created' });
  } catch (error) {
    console.log('error => ', error);
    return res.status(500).send({ error: 'something went wrong!' });
  }
});

module.exports = router;

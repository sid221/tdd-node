const bcrypt = require('bcrypt');
const User = require('./User');

const save = async (body) => {
  const { username, password, email } = body;

  const hashedPassword = await bcrypt.hash(password, 8);
  const userRes = await User.create({
    username,
    email,
    password: hashedPassword,
  });
};

module.exports = { save };

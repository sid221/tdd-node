const app = require('./src/app');
const sequelize = require('./src/config/database');

sequelize.sync();

app.get('/', (req, res) => {
  return res.send('Server is UP..');
});

app.listen(process.env.PORT || 3100, (err) => {
  if (!err) {
    console.log('Server is running.');
  } else {
    console.log('Server err', err);
  }
});

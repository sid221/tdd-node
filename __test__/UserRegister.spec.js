const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(() => sequelize.sync());

beforeEach(() => User.destroy({ truncate: true }));

describe('User Registration', () => {
  const postUser = () => {
    return request(app).post('/api/v1/users').send({
      username: 'user',
      email: 'user@mail.com',
      password: 'P4ssword',
    });
  };
  it('returns 200 OK when user register is valid', (done) => {
    postUser().then((res) => {
      expect(res.status).toBe(200);
      done();
    });
    // .expect(200, done);
  });

  it('returns success message when user register is valid', (done) => {
    postUser().then((res) => {
      expect(res.body.message).toBe('User created');
      done();
    });
    // .expect(200, done);
  });

  it('saves user to db', (done) => {
    postUser().then(() => {
      // NOTE: Query the user table
      User.findAll().then((userList) => {
        expect(userList.length).toBe(1);
        done();
      });
    });
  });

  it('saves username and email to db', (done) => {
    postUser().then(() => {
      User.findAll().then((userList) => {
        const user = userList[0];
        expect(user.username).toBe('user');
        expect(user.email).toBe('user@mail.com');
        done();
      });
    });
  });

  it('saves hash password to db', (done) => {
    postUser().then(() => {
      User.findAll().then((userList) => {
        const user = userList[0];
        expect(user.password).not.toBe('P4ssword');
        done();
      });
    });
  });
});

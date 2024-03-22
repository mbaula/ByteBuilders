import expressJwt from 'express-jwt';
import config from '../config/config.js';

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

export { requireSignin };
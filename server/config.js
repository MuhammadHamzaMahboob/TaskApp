import { randomBytes } from 'crypto';

// Generate a secure random string for the secret key
const generateSecretKey = () => {
  return randomBytes(32).toString('hex');
};

// Export the secret key using ES6 syntax
const secretKey = generateSecretKey();
export default secretKey;

// config.js
export const refreshTokenSecret = secretKey;
export const accessTokenExpiresIn = '1h'; // Access token expires in 1 hour
export const refreshTokenExpiresIn = '7d'; // Refresh token expires in 7 days
=======


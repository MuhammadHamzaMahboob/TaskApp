import { randomBytes } from 'crypto';

// Generate a secure random string for the secret key
const generateSecretKey = () => {
  return randomBytes(32).toString('hex');
};

// Export the secret key using ES6 syntax
const secretKey = generateSecretKey();
export default secretKey;

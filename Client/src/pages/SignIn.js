import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import signin from '../api/user/SignIn';
import { validateEmail, validatePassword } from '../services/validation';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errorsObj = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) {
      errorsObj.email = emailError;
    }

    if (passwordError) {
      errorsObj.password = passwordError;
    }

    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await signin(email, password);
        const userGroup = result.data.user.group;
        if (result.status === 200) {
          navigate('/home', {
            state: {
              group: userGroup
            }
          });
        }
      } catch (err) {
        window.alert('Incorrect Credentials');
      }
    }
  };

  return (
    <div className="container men">
      <h2>Sign In</h2>
      <form>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Sign In</button>
      </form>
      <div className="signup-link">
        <p>Create new account</p>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default SignIn;

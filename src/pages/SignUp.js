import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Signup from '../api/user/SignUp';
import './SignIn.css';
import { validateName, validateEmail, validatePassword, validateGroup } from '../services/validation';

export const Group = {
  A: 'A',
  B: 'B',
  C: 'C',
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState(Group.A);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errorsObj = {};

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const groupError = validateGroup(group);

    if (nameError) {
      errorsObj.name = nameError;
    }

    if (emailError) {
      errorsObj.email = emailError;
    }

    if (passwordError) {
      errorsObj.password = passwordError;
    }

    if (groupError) {
      errorsObj.group = groupError;
    }

    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await Signup(name, email, password, group);
        if (result.status === 201) {
          navigate('/signin', { replace: true });
        }
      } catch (err) {
        console.log('Signup error:', err);
      }
    }
  };

  return (
    <div className="container men">
      <h2>Sign Up</h2>
      <form>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
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
        <div className="input-group">
          <label htmlFor="group">Select Group:</label>
          <select
            id="group"
            onChange={(e) => setGroup(e.target.value)}
            defaultValue=""          >
            <option>
              Select me
            </option>
            {Object.values(Group).map((groupValue) => (
              <option key={groupValue} value={groupValue}>
                {groupValue}
              </option>
            ))}
          </select>
          {errors.group && <span className="error-message">{errors.group}</span>}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Sign Up</button>
      </form>
      <div className="signup-link">
        <p>If already Have a account?</p>
        <Link to="/signin">SignIn</Link>
      </div>
    </div>
  );
};

export default SignUp;

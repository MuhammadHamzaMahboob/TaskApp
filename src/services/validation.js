import { Group } from "../pages/SignUp";

export const validateName = (name) => {
  return name.trim() ? null : 'Name is required';
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Invalid email format';
  }
  return null;
};

export const validatePassword = (password) => {
  return password.trim().length >= 6
    ? null
    : 'Password must be at least 6 characters';
};

export const validateGroup = (group) => {
  const validGroups = Object.values(Group);
  return validGroups.includes(group) ? null : 'Invalid group selection';
};

// src/store/auth/authActions.ts

import { AppDispatch } from '../store';
import { setAuth, logout } from './authSlice';
import { User } from '../../types';

// Set Auth
export const authenticateUser = (user: User, token: string) => (dispatch: AppDispatch) => {
  dispatch(setAuth({ user, token }));
};

// Logout
export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};


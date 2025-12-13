import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api, handleError } from '../api';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const isAuthenticated = !!user?._id;

  const register = async (form) => {
    try {
      await api.post('/register', form);
      toast.success('Registered. Please verify your email.');
      navigate('/login');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const login = async (form) => {
    try {
      await api.post('/login', form);
      await fetchUser();
      toast.success('Logged in');
      navigate('/');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const logout = async () => {
    try {
      await api.get('/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get('/user');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const checkSession = async () => {
    try {
      const res = await api.get('/login-status');
      if (res.data) {
        await fetchUser();
      } else {
        setLoadingUser(false);
      }
    } catch {
      setUser(null);
      setLoadingUser(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await api.post('/forgot-password', { email });
      toast.success('Reset email sent');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await api.post(`/reset-password/${token}`, { password });
      toast.success('Password reset');
      navigate('/login');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const verifyEmail = async (token) => {
    try {
      await api.post(`/verify-user/${token}`);
      toast.success('Email verified');
      await fetchUser();
      navigate('/');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loadingUser,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


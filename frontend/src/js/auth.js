'use strict';

// Imports:
import axios from 'axios';
import * as config from './config';

export const state = {
  currentUser: '',
};

export const login = async function (body) {
  try {
    const { data } = await axios.post(
      `${config.BACK_END}${config.API_USER}/login`,
      body,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    throw err;
  }
};

export const register = async function (body) {
  try {
    const res = await axios.post(
      `${config.BACK_END}${config.API_USER}/register`,
      body
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const logout = async function () {
  try {
    const res = await axios.post(
      `${config.BACK_END}${config.API_USER}/logout`,
      {},
      { withCredentials: true }
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const forgot = async function (body) {
  try {
    const res = await axios.post(
      `${config.BACK_END}${config.API_USER}/forgotPassword`,
      body
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const reset = async function (token, body) {
  try {
    const res = await axios.post(
      `${config.BACK_END}${config.API_USER}/resetPassword/${token}`,
      body
    );
    return res;
  } catch (err) {
    throw err;
  }
};

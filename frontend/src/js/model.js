'use strict';

// Imports:
import axios from 'axios';
import * as config from './config';

// State:
export const state = {
  products: '',
  query: { q: '', sort: '', min: '', max: '', cat: '' },
  product: '',
  isFirst: true,
};

// Handle search query:
const turnQuery = function (query) {
  const queryObj = {};

  if (query.q) queryObj.q = query.q;
  if (query.cat) queryObj.cat = query.cat;
  if (query.sort) queryObj.sort = query.sort;
  if (query.min) queryObj.price = { gte: Number(query.min) };
  if (query.max) queryObj.price = { lte: Number(query.max) };

  return queryObj;
};

// Get all products from API:
export const getProducts = async function () {
  try {
    const options = {
      params: turnQuery(state.query),
      withCredentials: true,
    };

    const { data } = await axios.get(config.API_URL_PRODUCT, options);

    if (state.isFirst) state.products = data.products.sort((a, b) => a.id - b.id);
    state.isFirst = false;

    return data.products;
  } catch (err) {
    throw err;
  }
};

export const getProductById = async function (id) {
  try {
    const { data } = await axios.get(`${config.API_URL_PRODUCT}/${id}`, {
      withCredentials: true,
    });
    return data.product;
  } catch (err) {
    throw err;
  }
};

export const postProduct = async function (body) {
  try {
    const { data } = await axios.post(config.API_URL_PRODUCT, body, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const patchProductById = async function (id, body) {
  try {
    const { data } = await axios.patch(`${config.API_URL_PRODUCT}/${id}`, body, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteProductById = async function (id) {
  try {
    await axios.delete(`${config.API_URL_PRODUCT}/${id}`, {
      withCredentials: true,
    });
  } catch (err) {
    throw err;
  }
};

export const postProductFeedback = async function (body) {
  try {
    const res = await axios.post(config.API_URL_FEEDBACK, body, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

'use strict';

export const API_URL_PRODUCT = 'http://localhost:8000/api/v1/products';
export const API_URL_USER = 'http://localhost:8000/api/v1/users';
export const API_URL_FEEDBACK = 'http://localhost:8000/api/v1/feedbacks';
export const PRICE_FORMAT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
export const CAPITALIZE = (str) => str[0].toUpperCase() + str.slice(1);

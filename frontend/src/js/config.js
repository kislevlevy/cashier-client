'use strict';

export const BACK_END = 'https://cashier-client.onrender.com';
export const API_PRODUCT = '/api/v1/products';
export const API_USER = '/api/v1/users';
export const API_FEEDBACK = '/api/v1/feedbacks';

export const PRICE_FORMAT = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
export const CAPITALIZE = (str) => str[0].toUpperCase() + str.slice(1);

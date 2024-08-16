// Imports:
const mongoose = require('mongoose');

// Database connect:
//prettier-ignore
module.exports = async function () {
  try {
    const url = process.env.DB_LINK
    .replace("<PASS>", process.env.DB_PASS)
    .replace("<USER>", process.env.DB_USER);

    await mongoose.connect(url);
  } catch (err) {
    throw err;
  }
};

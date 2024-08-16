// Imports:
const dotenv = require('dotenv');

const connectDB = require('./utils/connectDB');

dotenv.config({ path: './config.env' });
const app = require('./app');

// App listen:
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(
    `The server is running!\nhttp://${process.env.IP}:${process.env.PORT}`
  );
});

connectDB()
  .then(() => console.log('DB connection was successful!'))
  .catch((err) => console.log(err));

// Imports:
const dotenv = require('dotenv');

const connectDB = require('./utils/connectDB');

dotenv.config();
const app = require('./app');

// App listen:
app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`Server is running!- ${process.env.IP}:${process.env.PORT}`);
  console.log(`Backend- ${process.env.BACK_END}`);
  console.log(`Frontend- ${process.env.FRONT_END}`);
});

connectDB()
  .then(() => console.log('DB connection was successful!'))
  .catch((err) => console.log(err));

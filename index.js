const app = require('./app');
const connectwithDb = require('./config/db');
const cloudinary = require('cloudinary');

require('dotenv').config();  // to read from .env file

// connect with database
connectwithDb();

// cloudinary config is done here
cloudinary.config({
    cloud_name: 'dcvg489de',
    api_key: '715248416955388',
    api_secret: 'lrocUs0DObO_3R99YLZrC0DwasA' 
});


app.listen(process.env.PORT, () => {
    console.log(`server is runnig at port : ${process.env.PORT}`);
});
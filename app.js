const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

require('dotenv').config();



const app = express();

// for swagger documentation
 const swaggerUi = require('swagger-ui-express');
 const YAML = require('yamljs');
 const swaggerDocument = YAML.load("./swagger.yaml");
 app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// temp check for photo upload
app.set('view engine','ejs');


//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// morgan middleware
app.use(morgan('tiny'));

// file and cookies middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/"
})); 



// import all routes here
const home = require('./routes/home');
const user = require('./routes/user');
const product = require('./routes/product');
const payment = require('./routes/payment');
const order = require('./routes/order');

// router middleware
app.use("/api/v1",home);
app.use("/api/v1",user);
app.use("/api/v1",product);
app.use("/api/v1",payment);
app.use("/api/v1",order);






// exporting the app
module.exports = app;
// external import 
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const morgan = require('morgan')


// internal import  
const {notFoundHandlar, errorHandlar} = require('./middlewares/common/errorHandlar');
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')


const app = express();


// mongodb connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
.then(() => console.log(`Server connect sucessfully 🚀🚀`))
.catch((err) => console.log(err) )


const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser(process.env.COOKIE_SECRICT_STRING));
app.use(express.static(path.join(__dirname, 'public/uploads/')));


// router handlar
app.use('/user', userRoute);
app.use('/product', productRoute);


// not found handlar
app.use(notFoundHandlar);


// error handlar
app.use(errorHandlar);


app.listen(PORT, () => {
    console.log(`Server lising PORT is ${PORT}`)
})


const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const { connect } = require('http2');




dotenv.config({path:'config.env'});
const PORT =process.env.PORT || 8080

// log request
app.use(morgan('tiny'));
// MongoDB conn
connectDB();
// Parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));
// Set view engine
app.set("view engine","ejs");
// Load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))
// Load Router
app.use('/', require('./server/routes/router.js'))


// Get single user details
app.get('/view-user', (req,res) =>{
    res.render('user_details');
})


 


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
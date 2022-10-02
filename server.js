const express = require('express');
const dotenv = require('dotenv');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config({path:'config.env'});
const PORT =process.env.PORT || 8080

// log request
app.use(morgan('tiny'));
// Parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));
// Set view engine
app.set("view engine","ejs");
// Load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))




app.get('/', (req,res)=>{
   res.render('index');
})


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
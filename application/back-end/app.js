var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser')


//mvc routers
const newListingRouter = require('./routes/newlistingrouter');
const serachListingRouter = require('./routes/listingsearchrouter');


app.use('/newlisting',newListingRouter);
app.use('/search',serachListingRouter);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());



app.listen(5000);
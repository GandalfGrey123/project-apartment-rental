var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var models = require('./models');


//mvc routers
const newListingRouter = require('./routes/newlistingrouter');
const serachListingRouter = require('./routes/listingsearchrouter');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());



app.use('/newlisting',newListingRouter);
app.use('/search',serachListingRouter);
app.use('/',serachListingRouter);



app.listen(5000);
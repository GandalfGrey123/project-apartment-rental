var express = require('express');
var app = express();

const listingRouter = require('./routes/listingrouter');

app.use('/newlisting',listingRouter);

app.listen(5000);
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var models = require('./models');

//mvc routers
const listingRouter = require('./routes/listing-router');

const configureServer = () => {

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors());

    app.use('/listings', listingRouter);
    
    app.listen(5000, '127.0.0.1', () => {
        console.log('Server is started on 127.0.0.1:5000');
    });
}

models.sequelize.sync().then(() => {
    configureServer();
})
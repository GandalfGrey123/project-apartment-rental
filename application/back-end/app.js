var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var models = require('./models');

//mvc routers
const listingRouter = require('./routes/listing-router');
const chatRouter = require('./routes/chat-router');

const configureServer = () => {

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cors());

    app.use('/listings', listingRouter);
    app.use('/messages', chatRouter);
    
    app.listen(5000, '127.0.0.1', () => {
        console.log('Server is started on 127.0.0.1:5000');
    });
}

models.sequelize.sync().then(() => {
    configureServer();
})
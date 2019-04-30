var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var models = require('./models');

const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;


//mvc routers
const listingRouter = require('./routes/listing-router');
const userRouter = requrie('./routes/user-router');

//passport authentication and sessions
app.use(session({
	secret: '10101', 
	resave: false , 
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


const configureServer = () => {

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(cors());

    app.use('/listings', listingRouter);
    app.use('/users', userRouter);
    
    app.listen(5000, '127.0.0.1', () => {
        console.log('Server is started on 127.0.0.1:5000');
    });
}

models.sequelize.sync().then(() => {
    configureServer();
})
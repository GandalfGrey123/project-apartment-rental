import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  AppBar, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';

import { 
  Menu as MenuIcon,
  Info as InfoIcon
} from '@material-ui/icons';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import AboutPage from './modules/about/about-page';
import HomePage from './modules/homepage/home-page';
import NewListing from './modules/listing/new-listing';
import LoginForm from './modules/Login/LoginForm';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const express = require('express');

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
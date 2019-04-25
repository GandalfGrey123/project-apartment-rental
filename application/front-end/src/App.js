import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainBar from './modules/mainbar/main-bar';

import AboutPage from './modules/about/about-page';
import HomePage from './modules/homepage/home-page';
import NewListing from './modules/listing/new-listing';
import ContactPage from './modules/contact/contact-page';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {

    const { classes} = this.props;    
  
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <MainBar />  

          <div className={classes.content} >
            <Switch>
              <Route path={'/about'} component={AboutPage} />
              <Route path={'/new'} component={NewListing} />
              <Route path={'/inbox'} component={ContactPage} />
              <Route path={'/'} component={HomePage} />
            </Switch>
          </div>  

        </div>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);

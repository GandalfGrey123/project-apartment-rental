import React, { Component } from 'react';
import {
  Drawer, withStyles, CssBaseline,
  TextField, InputAdornment,
  Grid, Paper, Toolbar,
  Hidden, IconButton
} from '@material-ui/core';

import {
  Search as SearchIcon,
  ViewListOutlined as ViewListIcon,
  ViewColumnOutlined as ViewColumnIcon,
  Menu as MenuIcon
} from '@material-ui/icons';
import ListingCard from './component/listing-card';

import styles from './styles/home-page';

import _ from 'lodash';
import { getListings } from '../../api/listings.actions';
import DrawerItems from './component/drawer-items';

const FormRow = ({ listings, columnView = true }) => {
  return (
    <React.Fragment>
      {
        listings.map((value, index) => (
          <Grid
            item
            lg={columnView ? 4 : 11}
            md={6}
            sm={12}
            style={{ width: '100%' }}
            key={`grid-index-${index}`}
          >
            <ListingCard
              listing={value}
            />
          </Grid>
        ))
      }
    </React.Fragment>
  );
}

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      mobileOpen: false,
      columnView: true
    };
    this.getListings = this.getListings.bind(this);
  }

  componentWillMount() {
    this.getListings();
  }

  getListings = (payload = {}) => {
    let selectedTypes = payload.types || [];
    let params = {};
    if (!_.isEmpty(selectedTypes)) {
      params = new URLSearchParams();
      selectedTypes.forEach((value) => params.append("type", value));
    }
    getListings(params, (data) => {
      this.setState({ listings: data || [] })
    })
  }

  displayListings = (listings, columnView) => {
    let rows = [];
    for (let i = 0; i < listings.length; i += 3) {
      rows.push(
        <Grid
          container
          key={`grid-container-${i + 1}`}
        >
          <FormRow
            listings={listings.slice(i, i + 3)}
            props={this.props}
            columnView={columnView}
          />
        </Grid>
      );
    }
    return rows;
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const classes = this.props.classes;
    const { types, listings, columnView } = this.state;

    return (
      <Paper className={classes.main} elevation={1}>
        <Grid container style={{ width: '100%' }} >
          <Grid item lg={3} md={3} sm={3} >
            <CssBaseline />

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerMobilePaper,
                }}
              >
                <DrawerItems
                  onDrawerSelectionChange={(payload) => {
                    this.getListings(payload);
                  }}
                />
              </Drawer>
            </Hidden>

            <Hidden xsDown implementation="css">
              <Drawer
                className={classes.drawer}
                variant='permanent'
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
                open
              >
                <DrawerItems
                  onDrawerSelectionChange={(payload) => {
                    this.getListings(payload);
                  }}
                />
              </Drawer>
            </Hidden>
          </Grid>

          <Grid item lg={9} md={9} sm={9} >
            <Grid item lg={11}>
              <Toolbar className={classes.searchSection}>
                <TextField
                  label="Listing Search"
                  className={classes.searchTextField}
                  name="listingSearch"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <IconButton
                  aria-label="Grid-View"
                  className={classes.iconButton}
                  onClick={() => this.setState({ columnView: !columnView })}
                >
                  {columnView ?
                    <ViewColumnIcon fontSize="large" /> :
                    <ViewListIcon fontSize="large" />
                  }
                </IconButton>
              </Toolbar>
            </Grid>
            {this.displayListings(listings, columnView)}
          </Grid>
        </Grid>
      </Paper>

    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
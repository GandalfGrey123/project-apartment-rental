import React, { Component } from 'react';
import {
  Drawer, withStyles, CssBaseline,
  Divider, Checkbox, Button,
  List, ListItem, ListItemText, ListSubheader, 
  TextField, InputAdornment,
  Grid,Paper,
  Hidden,IconButton
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ListingCard from './component/listing-card';

import styles from './styles/home-page';

import _ from 'lodash';
import { getHouseTypes, getListings } from '../../api/listings.actions';
import { Link, Route  } from 'react-router-dom';

const FormRow = ({ listings, props }) => {
  return (
    <React.Fragment>
      {
        listings.map((value) => (
          <Grid item xs={4}>
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
      types: ['All'], // All by default, other types will come from DB.
      selectedTypes: [], // Empty means all
      mobileOpen: false,
    };
    this.isChecked = this.isChecked.bind(this);
    this.getListings = this.getListings.bind(this);
    this.getHousingTypes = this.getHousingTypes.bind(this);
    this.selectHousingType = this.selectHousingType.bind(this);
  }

  componentWillMount() {
    this.getHousingTypes();
    this.getListings();
  }

  getListings = () => {
    const { selectedTypes } = this.state;
    let params = {};
    if(!_.isEmpty(selectedTypes)){
      params = new URLSearchParams();
      selectedTypes.forEach((value) => params.append("type", value));
    }
    getListings(params, (data) => {
      this.setState({ listings: data || [] })
    })
  }

  getHousingTypes = () => {
    let { types } = this.state;
    getHouseTypes((data) => {
      types = types.concat(
        data.map((value) => _.capitalize(value.type))
      );
      this.setState({ types: types })
    })
  }

  selectHousingType = type => event => {
    if (type === 'All') {
      this.setState({ selectedTypes: [] });
    } else {
      let { selectedTypes } = this.state;
      if (event.target.checked) selectedTypes.push(type);
      else _.remove(selectedTypes, (i) => i === type);
      this.setState({ selectedTypes: selectedTypes });
    }
  };

  isChecked = (text) => {
    return (text === 'All' && _.isEmpty(this.state.selectedTypes))
      || this.state.selectedTypes.includes(text);
  }

  displayListings = (listings) => {
    let rows = [];
    for(let i = 0; i < listings.length; i += 3){
      rows.push(
        <Grid container spacing={8}>
          <FormRow
            listings={listings.slice(i, i + 3)}
            props={this.props}
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
    const { types, listings } = this.state;

    return (
      <Paper className={classes.main} elevation={1}>                
        <Grid container spacing={8}>
             <Grid item xs={3}>
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
                      container={this.props.container}
                      variant="temporary"                      
                      open={this.state.mobileOpen}
                      onClose={this.handleDrawerToggle}
                      classes={{
                        paper: classes.drawerMobilePaper,
                      }}
                    >
                        <List subheader={<ListSubheader> Housing Types</ListSubheader>} className={classes.subList}>
                          {types.map((text, index) => (
                            <ListItem button key={`item-${index}`}>
                              <Checkbox
                                checked={this.isChecked(text)}
                                onChange={this.selectHousingType(text)}
                              />
                              <ListItemText primary={text} />
                            </ListItem>
                          ))}
                          </List>
                        <Button color="primary" onClick={() => { this.getListings(); }}>
                          Update
                        </Button>
                        <Divider />                    
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
                      <List subheader={<ListSubheader> Housing Types</ListSubheader>} className={classes.subList}>
                        {types.map((text, index) => (
                          <ListItem button key={`item-${index}`}>
                            <Checkbox
                              checked={this.isChecked(text)}
                              onChange={this.selectHousingType(text)}
                            />
                            <ListItemText primary={text} />
                          </ListItem>
                        ))}
                      </List>
                      <Button color="primary" onClick={() => { this.getListings(); }}>
                        Update
                      </Button>
                      <Divider />
                   </Drawer>
                </Hidden>
              </Grid>

              <Grid item xs={9}>  
                  <Grid item xs={11}>
                    <Paper className={classes.searchSection}>
                        <TextField
                           label="Listing Search"
                           className={classes.searchTextField}
                           name="listingSearch"                                                
                            InputProps={{
                             startAdornment: (
                                <InputAdornment position="start"> 
                                    <SearchIcon /> 
                                </InputAdornment>
                             ),
                           }}
                         />
                    </Paper>                
                  </Grid>           
                              
                  <Grid item xs={12}>                  
                     {this.displayListings(listings)}                  
                  </Grid> 
               </Grid>
          </Grid>      
      </Paper>

    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
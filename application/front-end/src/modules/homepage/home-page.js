import React, { Component } from 'react';
import axios from 'axios';
import {
  Drawer, withStyles, CssBaseline,
  Divider, Checkbox, Button,
  List, ListItem, ListItemText, ListSubheader,
  Grid,
} from '@material-ui/core';
import ListingCard from './component/listing-card';
import styles from './styles/home-page';
import _ from 'lodash';

const FormRow = ({ listings, props }) => {
  const { classes } = props;
  return (
    <React.Fragment>
      {
        listings.map((value, index) => (
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
      selectedTypes: [] // Empty means all
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
    axios.get('http://localhost:5000/listings', {
      params: params
    }).then(res => {
      const listings = res.data;
      this.setState({ listings: listings || [] })
    });
  }

  getHousingTypes = () => {
    let { types } = this.state;
    axios.get('http://localhost:5000/listings/types')
      .then((res) => {
        types = types.concat(
          res.data.map((value) => _.capitalize(value.type))
        );
        this.setState({ types: types })
      });
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
    for(let i = 0; i < listings.length/3; i += 3){
      rows.push(
        <Grid container item xs={12} spacing={24}>
          <FormRow
            listings={listings.slice(i, i + 3)}
            props={this.props}
          />
        </Grid>
      );
    }
    return rows;
  } 

  render() {

    const classes = this.props.classes;
    const { types, listings } = this.state;

    return (
      <div className={classes.root}>
          <Grid container spacing={8}>
             <Grid item  xs={3}>
                 <CssBaseline />      
                 <Drawer
                   className={classes.drawer}
                   variant='permanent'
                   classes={{ paper: classes.drawerPaper }}
                   anchor="left"
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
              </Grid>

            <Grid item xs={9}>
               {this.displayListings(listings)}
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HomePage);
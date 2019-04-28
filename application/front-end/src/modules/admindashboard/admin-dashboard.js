import React, { Component } from 'react';
import {
   withStyles, CssBaseline,
   Grid,
} from '@material-ui/core';
import ListingCard from './component/listing-card';
import styles from './styles/admin-dashboard';
import _ from 'lodash';
import { getHouseTypes, getListings } from '../../api/listings.actions';

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

class AdminDashboard extends Component {

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
                <!--deleted drawers-->
              </Grid>

            <Grid item xs={9}>
               {this.displayListings(listings)}
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AdminDashboard);
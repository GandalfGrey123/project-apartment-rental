import React, { Component } from 'react';
import {
  Drawer, withStyles, CssBaseline,
  Divider, Checkbox, Button,
  List, ListItem, ListItemText, ListSubheader,
  Grid,
} from '@material-ui/core';
import ListingCard from './component/listing-card';

import _ from 'lodash';
import { getHouseTypes, getListings } from '../../api/listings.actions';
//adding google maps
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

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

class Maps extends Component {

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

//for maps
 state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };


  render() {

    const classes = this.props.classes;
    const { types, listings } = this.state;

const mapStyles = {
  width: '100%',
  height: '100%'
};


    return (
      <div className={classes.root}>

      < Map
	google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 37.7212,
	 lng: -122.476844

	 //lat: -1.2884,
         //lng: 36.8233
        }}
      >
	<Marker
          onClick={this.onMarkerClick}
          name={'San Francisco State University'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
   	<div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCiI9shqkKiKx8rs57v02JoWtKfP2aSyHk'
})(MapContainer);


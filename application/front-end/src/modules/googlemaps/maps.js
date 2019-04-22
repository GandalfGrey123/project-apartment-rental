import React, { Component } from 'react';

//adding google maps
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class Maps extends Component {

  constructor(props) {
    super(props);
    this.state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  }
   //binding to event handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  
  }

    onMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
	}

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

  	onMapClick = (props) => {
	    if (this.state.showingInfoWindow) {
	        this.setState({
		    showingInfoWindow: false,
		    activeMarker: null
		    });
	    }
  	}

//for maps
 
  render() {

    const { classes } = this.props;

	const mapStyles = {
	  width: '100%',
	  height: '100%'
	};


    return (
      //<div className={classes.root}>

      < Map
        google={this.props.google}
        onClick ={this.onMapClick}
        zoom={14}
        style={mapStyles}
        initialCenter={{lat: 37.7212,
         lng: -122.476844}}
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
      </Map>
      //</div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCiI9shqkKiKx8rs57v02JoWtKfP2aSyHk'
})(Maps);


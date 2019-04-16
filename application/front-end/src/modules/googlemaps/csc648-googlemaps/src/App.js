import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
 state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  render() {
    return (
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
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyCiI9shqkKiKx8rs57v02JoWtKfP2aSyHk'
})(MapContainer);



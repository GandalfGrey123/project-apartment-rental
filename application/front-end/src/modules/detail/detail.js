import React, { Component } from 'react';
import "./css/detail.css"
import image1 from './img/room3.jpg';
import image2 from './img/room2.jpg';
import image3 from './img/room.jpg';





class Detail extends Component {


  render() {
    return(

      <div className="container">
      <a target="_blank" href={image1}>
      <img src={image1} width="630" height="466" />
      </a>
      <a target="_blank" href={image2}>
      <img src={image2} width="630" height="466" />
      </a>
      <a target="_blank" href={image3}>
      <img src={image3} width="630" height="466" />
      </a>
      <h2>1111 mission blvd, Daly City, CA9xxxx</h2>

      <h2>2 bed 2 bath  $2800/mo</h2>

      <a href= "http://localhost:3000/maps">Map View</a>
      <p>*   Great for city commuters</p>
      <p>*   Close to all amenities and SFSU</p>
      <p>*   Designated parking spot. Lots of street Parkings</p>
      <button type="button">Favorite</button>
      &nbsp;
      <button type="button">Contact Landlord</button>
      </div>
    )
  }
}


export default Detail;

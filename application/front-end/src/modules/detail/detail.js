import React, { Component } from 'react';
import image1 from './img/room3.jpg';
import image2 from './img/room2.jpg';
import image3 from './img/room.jpg';


import {
    withStyles,TextField,
    Paper, Typography,
    Toolbar, AppBar,
    Grid, Button,
    CardActions, Card,
    CardContent, List, ListItem, ListItemText,
    Divider,
} from '@material-ui/core'


class Detail extends Component {




render() {
  return(

   <div className="container">
   <img src={image1} width="504" height="336" />
   <img src={image2} width="504" height="336" />
   <img src={image3} width="504" height="336" />
   <h2>1111 mission blvd,Daly City, CA9xxxx</h2>

<h2>2 bed 2 bath  $2800/mo</h2>

<a href= "http://localhost:3000/maps">Map View</a>
<p>*   Great for city commuters</p>
<p>*   Close to all amenities and SFSU</p>
<p>*   Designated parking spot. Lots of street Parkings</p>
<button type="button">Favorite</button>
<button type="button">Contact Landlord</button>
      </div>
 )
}
}
export default Detail;

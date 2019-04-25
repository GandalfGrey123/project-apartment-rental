import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {
  AppBar, Toolbar, Typography,
  IconButton,
} from '@material-ui/core';

import {  
  Info as InfoIcon
} from '@material-ui/icons';

import { Link, withRouter} from 'react-router-dom';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};




class MainBar extends Component{

  renderAppOptions(props){

    //add a hamburger menu to inbox view AppBar  
    if(props.location.pathname == '/inbox'){
      return(
        <Typography variant="h6" color="inherit" className={this.props.classes.grow} component={Link} to={'/'} >
            Inbox Menu
        </Typography>
      );
    }
     else{
      return(
         <React.Fragment>
          <IconButton 
              className={props.classes.menuButton} 
              color="inherit"
              aria-label="Menu"
              component={Link}
              to={'/about'}
           >
             <InfoIcon />
          </IconButton>
          
          <Typography variant="h6" color="inherit" className={this.props.classes.grow} component={Link} to={'/'} >
              SFSU - CSC 648 Team #9 Project
          </Typography>
        </React.Fragment>
      );                        
    }
  }


  render(){

    const { classes} = this.props;

    return(        
    <div>
    <AppBar position="static">
      <Toolbar>


       {this.renderAppOptions(this.props)}
       
       <Button 
         variant="contained" 
         color="primary"
         component={Link}
         to={'/new'}
        >                
            New Listing
          <AddIcon />
        </Button>
       </Toolbar>
     </AppBar>
     </div>
    );
  }

}



export default withRouter((withStyles(styles)(MainBar)))



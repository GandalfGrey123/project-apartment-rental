import React, { Component } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles/home-page';

import Drawer from '@material-ui/core/Drawer';

import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';


class HomePage extends Component{
	
	state = {
     //housingTypeChecked {} , use hashmap?     
    };


	constructor(props){
        super(props);
    }


    selectHousingType = type =>({target: {checked}}) => {
     
    };


	render(){
	
	const classes = this.props.classes;
	
	 return(
	  
	   <div className={classes.root}>
         <CssBaseline />
    
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
           >
       
            <List subheader={<ListSubheader> Housing Types</ListSubheader>} className={classes.subList}>
            
                
              {['All types','Apartment', 'House', 'Room'].map((text, index) => (
                <ListItem button key={text}>
                    <Checkbox
                	  onChange={this.selectHousingType(text)}        
                    />
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
          </Drawer>
       </div>

	 );
	}

}



export default withStyles(styles, { withTheme: true })(HomePage);






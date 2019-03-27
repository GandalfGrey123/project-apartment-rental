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



import Button from '@material-ui/core/Button';

class HomePage extends Component{
	
	state = {

	    listings:[],

	    housingTypeChecks:{
	    	 All: true,
       	 Apartment: false,
       	 House: false,
       	 Room: false,  
	    }	
    };


	  constructor(props){
        super(props);
    }

    updateView(){      
      // 	axios.get('http://localhost:5000/search').then(res => {
      //  	 const listings = res.data; 		 
      //	})
    }
  


    selectHousingType = type => event => {

      console.log(this.state.housingTypeChecks[type]);
    	 this.setState({ 
      	  housingTypeChecks:{
    	    ...this.state.housingTypeChecks,
    	    [type]: event.target.checked
      	  }
    	});    
     };


 
	render(){
	
	const classes = this.props.classes;
	
	 return (
	  
	  <div className={classes.root}>
         <CssBaseline />
    
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              anchor="left"
            >

       
            <List subheader={<ListSubheader> Housing Types</ListSubheader>} className={classes.subList}>
                          
               {['All','Apartment', 'House', 'Room'].map((text, index) => (
                 <ListItem button key={text}>
                     <Checkbox             
                       checked={this.state.housingTypeChecks[text]}
                 	    onChange={this.selectHousingType(text)}               
                     />
                     <ListItemText primary={text} />
                 </ListItem>
               ))}

            </List>


            <Button color="primary" onClick={ () => { this.updateView();}}>
    			   Update
			      </Button>

            <Divider />
          </Drawer>

     </div>
 
	);
 }
}



export default withStyles(styles, { withTheme: true })(HomePage);






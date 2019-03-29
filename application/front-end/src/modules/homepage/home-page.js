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

import _ from 'lodash';

import Button from '@material-ui/core/Button';



class HomePage extends Component{
	
	  constructor(props){
        super(props);
        this.state = {
          listings:[],
          types: [],
          All: true,
          housingTypeChecks:{}	
        };
     this.getHousingTypes = this.getHousingTypes.bind(this);
    }

    componentWillMount(){
      this.getHousingTypes();
    }


    updateView(){  

        //if all make a specific request
        if(this.state.All == true){
          axios.get('http://localhost:5000/listings/all')
          .then(res => {
            const listings = res.data;   
            console.log(listings);
          })
        }

        //else build query string and then request
        else{

           let selectedTypes = []
           
           //create an array of all checkbox fields that == true    
           for (const [type, isSelected] of Object.entries(this.state.housingTypeChecks)) {       
             if(isSelected){
               selectedTypes.push(type)
             }
           }
     
           axios.get('http://localhost:5000/listings',{
             params:{housingTypes: selectedTypes}
           }).then(res => {
              const listings = res.data;   
              console.log(listings);
           });
        }        
    }
  
    getHousingTypes = () => {
      axios.get('http://localhost:5000/listings/types')
        .then((res) => {
          this.setState({ types: res.data })
        });
    }

  
    selectHousingType = type => event => {      
      this.setState({ 
      	  housingTypeChecks:{
    	    ...this.state.housingTypeChecks,
    	    [type]: event.target.checked
      	  }      
    	});    
     };

    selectAllTypes = types => event =>{
       this.setState({
         All: event.target.checked
       });         
    };

	render(){
	
  const classes = this.props.classes;
  
  const { types } = this.state;
	
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
                       
               <ListItem button key={"All"}>
                     <Checkbox             
                       checked={this.state.All}
                       onChange={this.selectAllTypes(["All"]
                          .concat(types.map((value) => 
                            _.capitalize(value.type))))}               
                     />
                     <ListItemText primary={"All"} />
                </ListItem>

               {[].concat(types.map((value) => value.type)).map((text, index) => (
                 <ListItem button key={`item-${index}`}>
                     <Checkbox             
                       checked={this.state.housingTypeChecks[_.capitalize(text)]}
                 	     onChange={this.selectHousingType(_.capitalize(text))}               
                     />
                     <ListItemText primary={_.capitalize(text)} />
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






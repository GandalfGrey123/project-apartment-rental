import React, { Component } from 'react';

import {
  TextField, FormGroup, FormControl,
  Paper, withStyles,
} from '@material-ui/core';

import styles from './styles/new-listing';
import Button from '@material-ui/core/Button';

//use axios for posting 
import axios from 'axios';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';


class NewListing extends Component{

  state = {
    open: false,
    
    post: {
      title: '',
      price:'',
      address:'',
      zip:'',
      description: '',
    },

    housingInfo: {
      housingType: '',
      bedrooms:0,
      bathrooms:0,
    },
    
    imageFiles:[]
  };
  

  addFile = event => {
    this.setState({
      imageFiles: this.state.imageFiles.concat(Array.from((event.target.files)))
    })
  }; 

  handlePostChange = name => ({target: {value}}) => {
    this.setState({ 
      post:{
    	  ...this.state.post,
    	  [name]: value 
      }	
    });
  };

   handleHousingChange = name => ({target: {value}}) => {
    this.setState({ 
      housingInfo:{
        ...this.state.housingInfo,
        [name]: value 
      } 
    });
  };

  handleSubmit = event => {

	    event.preventDefault();
 	    axios.post('http://localhost:5000/newlisting', 
        {          
           title: this.state.post.title,
           price: this.state.post.price,
           address: this.state.post.address,
           zip: this.state.post.zip,
           description: this.state.post.description,
           housingType:this.state.housingInfo.housingType,
           bedrooms:this.state.housingInfo.bedrooms,
           bathrooms:this.state.housingInfo.bathrooms,
           images: this.state.imageFiles          
        })
  };

  render(){

  const { 
      post: { 
        title,
        price,
        address,
        zip,
        description
      },

      housingInfo:{
        housingType,
        bedrooms,
        bathrooms,
      }
  } = this.state;

  var imagePreviews = this.state.imageFiles.map(function(image) {
    return (            
     <img src={URL.createObjectURL(image)} rounded height="200px"/>
    );
  });

   const { classes } = this.props; 

   return(
     <Paper className={classes.root}>
     <form onSubmit={this.handleSubmit}>
       <FormGroup className={classes.formGroup} >
          <FormControl>
           <TextField
             label="Title"
             value={title}
             onChange={this.handlePostChange('title')}
             margin="normal"
           />
         </FormControl>
         <FormControl>
           <TextField
             label="Price"
             value={price}
             onChange={this.handlePostChange('price')}
             margin="normal"
           />
         </FormControl>
         <FormControl>
           <TextField
             label="Address"
             value={address}
             onChange={this.handlePostChange('address')}
             margin="normal"
           />
         </FormControl>
         <FormControl>
           <TextField
             label="Zip"
             value={zip}
             onChange={this.handlePostChange('zip')}
             margin="normal"
           />
         </FormControl>
         <FormControl>
           <TextField
             multiline
             rows="6"
             label="Description"
             value={description}
             onChange={this.handlePostChange('description')}
             margin="normal"
           />
         </FormControl>


          <br /> 
          <FormControl variant="outlined">
             <InputLabel
               ref={ref => {
                 this.InputLabelRef = ref;
               }}
               htmlFor="outlined-age-native-simple"
             >
               Housing Type
             </InputLabel>
             <Select
               native
               value={housingType}
               onChange={this.handleHousingChange('housingType')}
               input={
                 <OutlinedInput
                   name="Housing Type"              
                   id="outlined-age-native-simple"
                 />
               }
             >
               <option value="" />
               <option value={"Apartment"}>Apartment</option>
               <option value={"House"}>House</option>
               <option value={"Room"}>Room</option>
             </Select>  
          </FormControl>


          <br />
          <FormControl variant="outlined">
             <InputLabel
               ref={ref => {
                 this.InputLabelRef = ref;
               }}
               htmlFor="outlined-age-native-simple"
             >
              Bed rooms
             </InputLabel>
             <Select
               native
               value={bedrooms}
               onChange={this.handleHousingChange('bedrooms')}
               input={
                 <OutlinedInput
                   name="bedrooms"              
                   id="outlined-age-native-simple"
                 />
               }
             >
               <option value="" />
               <option value={1}>1</option>
               <option value={2}>2</option>
               <option value={3}>3</option>
             </Select>  
          </FormControl>

          <br />
          <FormControl variant="outlined">
             <InputLabel
               ref={ref => {
                 this.InputLabelRef = ref;
               }}
               htmlFor="outlined-age-native-simple"
             >
               Bathrooms
             </InputLabel>
             <Select
               native
               value={bathrooms}
               onChange={this.handleHousingChange('bathrooms')}
               input={
                 <OutlinedInput
                   name="bathrooms"              
                   id="outlined-age-native-simple"
                 />
               }
             >
               <option value="" />
               <option value={1}>1</option>
               <option value={2}>2</option>
               <option value={3}>3</option>
             </Select>  
          </FormControl>


        
         <FormControl>
              <input 
                multiple
                accept="image/png, image/jpeg"
                type = "file"
                onChange={this.addFile}              
              />  
         </FormControl>

         {imagePreviews}

         <div>
           <Button variant="contained" size="small" color="primary" type="reset">
             RESET
           </Button>
           <Button variant="contained" size="small" color="primary" type="submit">
             SUBMIT
            </Button>
         </div>
       </FormGroup>
        </form>
     </Paper>
   );
  }
}


export default withStyles(styles, { withTheme: true })(NewListing);




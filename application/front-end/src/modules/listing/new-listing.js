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
import InputLabel from '@material-ui/core/InputLabel';

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

class NewListing extends Component{

  state = {
    open: false,
    
    post: {
      title: '',
      price:'',
      address:'',
      city:'',
      state:'',
      zip:'',
      description: '',
      bedrooms:0,
      bathrooms:0,
      housingType: '',
    },
    imageFiles:[],
    form:'',

  };
  

  addFile = event => {
    // console.log("Files: ", event.target.files.item(0));
    // this.getBase64(event.target.files.item(0))
    //   .then((data) => console.log('Data: ', data));
    // let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
    let files = Array.from(event.target.files);
    for(let i = 0; i < files.length; i++){
         this.getBase64(files[i])
          .then((data) => console.log('Data: ', i, ' - ', data));
    }
    // this.setState({
    //   imageFiles: this.state.imageFiles.concat(Array.from((event.target.files)))
    // })
  }; 

  handlePostChange = name => ({target: {value}}) => {
    this.setState({ 
      post:{
    	  ...this.state.post,
    	  [name]: value 
      }	
    });
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleSubmit = event => {

      this.state.form = new FormData();
      this.state.form.append('title',this.state.post.title);
      this.state.form.append('price',this.state.post.price);
      this.state.form.append('address',this.state.post.address);
      this.state.form.append('city',this.state.post.city);
      this.state.form.append('state',this.state.post.state);
      this.state.form.append('zip',this.state.post.zip);
      this.state.form.append('description',this.state.post.description);
      this.state.form.append('bedrooms',this.state.post.bedrooms);
      this.state.form.append('bathrooms',this.state.post.bathrooms);
      this.state.form.append('housingType',this.state.post.housingType);

      axios({
        method: 'post',
        url: 'http://localhost:5000/listings/new',
        data: this.state.form,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(function (response) {
          //handle success
          console.log(response);
      });
  };


  render(){

  const { 
      post: { 
        title,
        price,
        address,
        city,
        state,
        zip,
        description,       
        bedrooms,
        bathrooms,
        housingType,
      },
      imageFiles,
      form
      
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
             label="City"
             value={city}
             onChange={this.handlePostChange('city')}
             margin="normal"
           />
         </FormControl>


         <FormControl>
           <TextField
             label="State"
             value={state}
             onChange={this.handlePostChange('state')}
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
              
             >
               Housing Type
             </InputLabel>
             <Select
               native
               value={housingType}
               onChange={this.handlePostChange('housingType')}
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
               <option value={"Studio"}>Studio</option>
               <option value={"Townhome"}>Townhome</option>

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
               onChange={this.handlePostChange('bedrooms')}
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
               onChange={this.handlePostChange('bathrooms')}
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










  
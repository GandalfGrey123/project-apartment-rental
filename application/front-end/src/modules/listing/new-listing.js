import React, { Component } from 'react';

import {
  TextField, FormGroup, FormControl,
  Paper, withStyles,
} from '@material-ui/core';

import styles from './styles/new-listing';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
//use axios for posting 
import axios from 'axios';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript

class NewListing extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      form: {
        images: [],
        address: {}
      },
      submitSuccess: false
    }
    this.addFile = this.addFile.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  addFile = event => {
    let { form } = this.state;
    let files = Array.from(event.target.files);
    for(let i = 0; i < files.length; i++){
         this.getBase64(files[i])
          .then((data) => {
            let encoded = data.replace(/^data:(.*;base64,)?/, '');
            console.log('Data: ', encoded);
            form.images.push(encoded);
          });
    }
    this.setState({ form: form });
  }; 

  handleFormChange = name => ({target: {value}}) => {
    this.setState({ 
      form:{
    	  ...this.state.form,
    	  [name]: value 
      }	
    });
  };

  handleAddressChange = name => ({target: {value}}) => {
    const { form } = this.state
    form.address[name] = value;
    this.setState({ form: form });
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onSubmitClick = () => {
      const { form } = this.state;
      console.log('Form: ', form);
      axios({
        method: 'post',
        url: 'http://localhost:5000/listings/new',
        data: form
      }).then(() => {
          //handle success
          this.setState({ submitSuccess: true })
      });
  };

  onResetClick = () => {
    this.setState({
      form: {
        address: {},
        images: []
      }
    })
  }


  render(){

  const { form, submitSuccess } = this.state;

  // var imagePreviews = form.images.map(function(image) {
  //   return (            
  //    <img src={URL.createObjectURL(image)} rounded height="200px"/>
  //   );
  // });

   const { classes } = this.props; 

   if(submitSuccess){
     return <Redirect to={'/'} />
   }
   

   return(
    <Paper className={classes.root}>
     <form onSubmit={this.handleSubmit}>
       <FormGroup className={classes.formGroup} >
          <FormControl>
           <TextField
             label="Title"
             value={form.title}
             onChange={this.handleFormChange('title')}
             margin="normal"
           />
         </FormControl>
         <FormControl>
           <TextField
             label="Price"
             value={form.price}
             onChange={this.handleFormChange('price')}
             margin="normal"
           />
         </FormControl>

         <FormControl>
           <TextField
             label="Address"
             value={form.address.line1}
             onChange={this.handleAddressChange('line1')}
             margin="normal"
           />
         </FormControl>


         <FormControl>
           <TextField
             label="City"
             value={form.address.city}
             onChange={this.handleAddressChange('city')}
             margin="normal"
           />
         </FormControl>


         <FormControl>
           <TextField
             label="State"
             value={form.address.state}
             onChange={this.handleAddressChange('state')}
             margin="normal"
           />
         </FormControl>



         <FormControl>
           <TextField
             label="Zip"
             value={form.address.zipCode}
             onChange={this.handleAddressChange('zipCode')}
             margin="normal"
           />
         </FormControl>
         <FormControl>
           <TextField
             multiline
             rows="6"
             label="Description"
             value={form.description}
             onChange={this.handleFormChange('description')}
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
               value={form.housingType}
               onChange={this.handleFormChange('housingType')}
               input={
                 <OutlinedInput
                   name="Housing Type"              
                   id="outlined-age-native-simple"
                   labelWidth={'Housing Type'.length}
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
               value={form.bedrooms}
               onChange={this.handleFormChange('bedrooms')}
               input={
                 <OutlinedInput
                   name="bedrooms"              
                   id="outlined-age-native-simple"
                   labelWidth={'bedrooms'.length}
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
               value={form.bathrooms}
               onChange={this.handleFormChange('bathrooms')}
               input={
                 <OutlinedInput
                   name="bathrooms"              
                   id="outlined-age-native-simple"
                   labelWidth={'bathrooms'.length}
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

         {/* {imagePreviews} */}

         <div>
           <Button 
              variant="contained"
              size="small"
              color="primary"
              type="reset"
              onClick={this.onResetClick}
           >
             RESET
           </Button>
           <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={this.onSubmitClick}
            >
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










  
import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class NewListing extends Component{
  state = {
   open: false,

   post: {
   	  title: '',
   	  price:'',
   	  address:'',
   	  zip:'',
   	  description: ''
   }

  };


  handleChange = name => ({target: {value}}) => {
    this.setState({ 

      post:{
    	...this.state.post,
    	[name]: value 
      }
    	
    });
  };

  handleSubmit = event => {
	event.preventDefault();

 	axios.post('http://localhost:5000/newlisting', {
  		title: this.state.post.title,
		  price: this.state.post.price,
		  address: this.state.post.address,
		  zip: this.state.post.zip,
		  description: this.state.post.description
    })
  }

  render(){

  const { post: { title, price,address,zip,description} } = this.state;

  const actions = [
  	 <Button variant="contained" size="small" color="primary" type="reset">
        reset
      </Button>,

      <Button variant="contained" size="small" color="primary" type="submit">
        Submit
      </Button>	          
  ];


   return(
   
   	<div>
   		<h1>
   			Post 
   		</h1>
 		
 		<form onSubmit={this.handleSubmit}>
   		   	 <TextField
          		label="Title"
          		value ={title}
          		onChange={this.handleChange('title')}
          		margin="normal"
     		 />

     		 <br />

     		 <TextField
          		label="Price"
          		value ={price}
          		onChange={this.handleChange('price')}
          		margin="normal"
     		 />

     		 <br />

     		  <TextField
          		label="Address"
          		value ={address}
          		onChange={this.handleChange('address')}
          		margin="normal"
     		 />

     		 <TextField
          		label="Zip"
          		value ={zip}
          		onChange={this.handleChange('zip')}
          		margin="normal"
     		 />

     		  <br />     		
     		 
     		 <input
			   accept="image/*"			 			  
			   id="raised-button-file"
			   multiple
			   type="file"
			 />

		
     		 <br />

     		 <TextField
     		 	multiline
          		rows="6"
          		label="Description"
          		value ={description}          	
          		onChange={this.handleChange('description')}
          		margin="normal"
     		 />

     		 <br />    

     		 <div style={{padding: 8}}>
     			{actions}
    		</div>   		

     	</form>
     		
     </div>
   );
  }
}
export default NewListing;


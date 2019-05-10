import React, {Component} from 'react';

import { 
  Paper,withStyles,
  Typography, 
  List,ListItem,
  ListItemText,ListItemAvatar,
  Avatar, 
 } from '@material-ui/core';

import styles from '../styles/message-box';

class MessageBox extends Component{

  constructor(props){
    super(props);
    this.displayMessages = this.displayMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  latestMessage = React.createRef()

  componentDidMount(){  
    this.scrollToBottom();   
  } 

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () =>{
    this.latestMessage.current.scrollIntoView({ behavior: "smooth" });
  }

  onChangeMessage = ({target: {value}}) =>{
    this.setState({
      nextMessage: value
    });
  }

  displayMessages =() =>{

  	if(this.props.messages.length == 0){
      return;
    }

    let messages=[]
    this.props.messages.forEach((message)=>{
       messages.push(
        <React.Fragment>
          <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="your avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-512.png" />
           </ListItemAvatar>
           <ListItemText
             primary={`${message.senderEmail} `}// - sent 12:00pm`}
             secondary={
               <React.Fragment>
                 <Typography component="span"  color="textPrimary">
                 {message.message}
                 </Typography>               
               </React.Fragment>
             }
           />
          </ListItem>
        </React.Fragment>
      );
    });

    return messages;
  }
      
  render() {
  	const {classes, messages, chatInfo} = this.props;

   return(
  	 <React.Fragment>

        <ListItem 
          button 
          selected = {true}
        > 
           <ListItemAvatar 
           	className={classes.contactAvatar}
            >
              <Avatar 
                alt="contact user's avatar"               
                src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" 
              />
           </ListItemAvatar>
            
           <ListItemText           	
             primary={chatInfo.landLordEmail}
             secondary={chatInfo.listingTitle}                 
           />           
	    </ListItem>
        
	    <Paper>    
	      <List className={classes.chatBox}>                                 
          {this.displayMessages()}
          <div ref={this.latestMessage} />
        </List>
  	  </Paper>
    
  	</React.Fragment>
  );
 }
}

export default withStyles(styles)(MessageBox);
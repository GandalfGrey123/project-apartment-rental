import React, {Component} from 'react';

import { 
  Paper,withStyles,
  Typography, 
  List,ListItem,
  ListItemText,ListItemAvatar,
  Avatar, 
  IconButton,
 } from '@material-ui/core';

import styles from '../styles/message-box';
import {formatUtcMessageTime} from '../../../utils/messages'

class MessageBox extends Component{

  constructor(props){
    super(props);

    this.displayMessages = this.displayMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.formatUtcTime = this.formatUtcTime.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
  }

  latestMessage = React.createRef()

  componentDidMount(){  
    this.scrollToBottom();   
  } 

  componentDidUpdate() {
    this.scrollToBottom();
  }

  formatUtcTime = (utcTimeStamp)=>{
    return formatUtcMessageTime(utcTimeStamp)
  }

  scrollToBottom = () =>{
    this.latestMessage.current.scrollIntoView({ behavior: "smooth" });
  }

  displayTitle = (classes, chatInfo, defaultBox) =>{
    if(defaultBox){
      return(
       <Typography component="h2" variant="display2" gutterBottom>
          No chat selected 
        </Typography>
      )
    }

    return(
           <ListItem 
          button 
          selected = {true}
        > 
           <ListItemAvatar 
            className={classes.contactAvatar}
            >
              <Avatar 
                alt="contact user's avatar"               
                src={chatInfo.contactsAvatar} 
              />
           </ListItemAvatar>
            
           <ListItemText            
             primary={chatInfo.chatingWith}
             secondary={ 
              `Listing title - ${chatInfo.listingTitle}`
            }                 
           />     

            <IconButton 
              aria-label="Delete"
              onClick={this.props.refreshHandler}                          
             >
                Refresh
            </IconButton>      
      </ListItem>
    );
  }

  displayMessages =() =>{

  	if(this.props.messages.length === 0){
      return;
    }

    let messages=[]
    this.props.messages.forEach((message)=>{
       messages.push(
        <React.Fragment>
          <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="your avatar" src={message.senderAvatar} />
           </ListItemAvatar>
           <ListItemText
             primary={ `${message.senderEmail} sent - ${this.formatUtcTime(message.sentTime) }` }
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
  	const {classes, chatInfo, defaultBox} = this.props;

   return(
  	 <React.Fragment>

      {this.displayTitle(classes, chatInfo, defaultBox)}

        
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
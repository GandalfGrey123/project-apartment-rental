import React, {Component} from 'react';

import { 
  Grid,Paper,withStyles,
  Button,TextField, Typography, 
  Icon,IconButton,
  List,ListItem,Divider,
  ListItemText, ListItemSecondaryAction,ListItemAvatar,
  Avatar, 
  FormGroup,FormControl
 } from '@material-ui/core';

import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import styles from './styles/contact-page';

import { getInbox,sendMessage } from '../../api/message.actions';
import { checkSession } from '../../api/user.actions';

import MessageBox from './component/message-box';

class ContactPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      //all chat ids
      allUsersChats: [],
      currentChatIndex:0,
      nextMessage:'',
      userEmail:'',

      viewMessage:[],
    };

    this.getChats = this.getChats.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.handleSendButton = this.handleSendButton.bind(this);       
    this.getChatMessages = this.getChatMessages.bind(this);
  }


  componentDidMount(){  
    this.getChats();   
  } 

 //get data from API enpoint 
 getChats = () => {  
      getInbox( (chatObj)=>{              
        this.setState({ 
          allUsersChats: chatObj.inbox || [],
          userEmail: chatObj.userEmail,
         });
      });   
  }

  onChangeMessage = ({target: {value}}) =>{
    this.setState({
      nextMessage: value
    });
  }

  handleSendButton = () =>{
    //if nothing to send dont send
    if(this.state.nextMessage == ''){
      return
    }

    let messagePacket ={
     'chatId': this.state.allUsersChats[this.state.currentChatIndex].chatId,
     'message': this.state.nextMessage,
    }
    
    sendMessage(messagePacket, (resp)=>{                
       this.getChats();
       this.setState({
        nextMessage: ''
       });    
    });
  }

  //select a chat to show
  selectChat = (chatIndex) =>{
    this.setState({
     currentChatIndex: chatIndex
    });
  } 

  getChatMessages = (chatIndex) =>{
     if(this.state.allUsersChats.length ==0){
       return [];
     }
     return this.state.allUsersChats[chatIndex].messages;
  }


  chatsList = () => {
    if(this.state.allUsersChats.length ==0) 
      return;

    let chatListItems = [];
    this.state.allUsersChats.forEach((chat, index)=>{
    
        chatListItems.push(
           <div>

             <ListItem 
               button 
               //change to use selectChat() for onClick
                onClick={() => this.setState({ currentChatIndex: index }) }
              >
              <ListItemAvatar>
                 <Avatar
                   alt="dm user avatar${i}" 
                   src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" 
                 />
              </ListItemAvatar>
                
               <ListItemText
                  primary={
                    chat.userOneEmail === this.state.userEmail? chat.userTwoEmail : chat.userOneEmail
                  }
                  secondary={chat.listing}                 
               />
    
                  <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <DeleteForeverRoundedIcon />
                        </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

              <Divider light />
           </div>
        );
    });
  
   return chatListItems;
  }

  render() {
    const {classes,theme} = this.props;
    const {currentChatIndex} = this.state;
    
    return(
     <div>      
      <Grid container>       

          <Grid item xs={12} md={4} lg={4}>
              <Typography 
                 variant="h5" 
                 gutterBottom 
                 align="center"
                 style={{padding:20}}
              >
                Direct Messages
              </Typography>

              <List className={classes.root}>
                 {this.chatsList()}
              </List>
          </Grid>
        

           <Grid item xs={12} md={8} lg={8}>
               <Paper 
                 className={classes.messagePaper}
                 square='true'
                 elevation='1'
                >
                   
                <MessageBox
                  messages={
                    this.getChatMessages(currentChatIndex)
                  }
                  chatInfo={{
                    landLordEmail:'landlord@yahoo',
                    listingTitle: 'listing 1',
                  }}
                 />

                </Paper>

                <Paper>
                  <FormGroup>
                    <FormControl fullWidth className={classes.margin}>                 
                         <TextField
                             id="standard-full-width"
                             onChange={this.onChangeMessage}
                             label="Type message"        
                             variant="outlined"
                             multiline="true"
                             fullWidth 
                            value={this.state.nextMessage}
                           />                               
                    </FormControl>

                    <Button 
                     variant="contained" 
                     color="primary" 
                     className={classes.button}
                     onClick= {this.handleSendButton}
                     >
                        Send 
                    <Icon className={classes.rightIcon}>send</Icon>
                    </Button>

                  </FormGroup>
                </Paper>                   

            </Grid>
          </Grid>        
        </div>       
     );
  }

}

export default withStyles(styles, {withTheme:true}) (ContactPage);
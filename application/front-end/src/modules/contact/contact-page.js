import React, {Component} from 'react';

import { 
  Grid,Paper,AppBar,Toolbar,withStyles,
  Button,TextField, Typography, 
  Icon,IconButton,
  List,ListItem,Divider,
  ListItemIcon, ListItemText, ListItemSecondaryAction,ListItemAvatar,
  Avatar, 
  FormGroup,FormControl
 } from '@material-ui/core';

import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import styles from './styles/contact-page';

import { getInbox,sendMessage } from '../../api/message.actions';
//import { checkSession, getSessionToken } from '../../api/user.actions';
import { getSessionToken } from '../../api/local-session';

class ContactPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      //all chat ids
      allUsersChats: [],
      currentChatIndex:0,
      nextMessage:'',
      userEmail:'',
    };

    this.getChats = this.getChats.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.handleSendButton = this.handleSendButton.bind(this);   
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

   latestMessage = React.createRef()

  componentDidMount(){  
    this.getChats();
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

  handleSendButton = ()=>{
   let sessionToken = JSON.parse(sessionStorage.getItem('session')).token   

   let messagePacket ={
    'chatId': this.state.allUsersChats[this.state.currentChatIndex].chatId,
    'message': this.state.nextMessage,
   }

    sendMessage(sessionToken,messagePacket, (resp)=>{                
       this.getChats(); //not optimal shouldnt have to call getChats again.
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

  getChats = () => {  
    let sessionToken = JSON.parse(sessionStorage.getItem('session')).token

    if(sessionToken){
      getInbox(sessionToken, (chatObj)=>{              
        this.setState({ 
          allUsersChats: chatObj.inbox || [],
          userEmail: chatObj.userEmail,
         });     
      });
    }
   
   else {}    
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
                onClick={() => this.setState({ currentChatIndex: index }) }
              >
              <ListItemAvatar>
                 <Avatar
                   alt="dm view avatar${i}" 
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


//REFRACTOR- make displayMessages() its own component and pass Chat object as the props
  displayMessages = () => {
  if(this.state.allUsersChats.length ==0) 
      return;

  let messages = [];
   this.state.allUsersChats[this.state.currentChatIndex].messages.forEach(message =>{
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


  showMessageBox(classes){
      return(
        <React.Fragment>

      <ListItem 
        button 
        selected = {true}
      > 
         <ListItemAvatar className={classes.contactAvatar}>
            <Avatar alt="contact user's avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" />
         </ListItemAvatar>
    
          <ListItemText
             primary={ "Conversation with - LandLordUsername123"}
             secondary={"About Listing - #ListingPost123"}                 
          />        
       </ListItem>

         <Paper>

            <List className={classes.chatBox}>                                 
              {this.displayMessages()}
               <div ref={this.latestMessage} />
            </List>

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
        </React.Fragment>
   );
  }


  render() {
    const {classes,theme} = this.props;
    const {allUsersChats,currentChatIndex} = this.state;
    
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
                   {this.showMessageBox(classes)}
                </Paper>                   
            </Grid>

          </Grid>        
        </div>       
     );
  }

}

export default withStyles(styles, {withTheme:true}) (ContactPage);



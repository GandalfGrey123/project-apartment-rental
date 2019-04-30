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

import { getChats, sendMessage } from '../../api/message.actions';

class ContactPage extends Component{

  constructor(props){
    super(props);
    this.state = {
      allUsersChats: [],
      nextMessage:'',
    };

    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  onChangeMessage = ({target: {value}}) =>{
    this.setState({
      nextMessage: value
    });
  }


  handleSendMessage = ()=>{
    getChats(this.state.nextMessage, () => { 
       this.setState({
        nextMessage: ''
       });
    })  
  }



  chatsList = (chats) => {
    let chatListItems = [];
    for(let i = 0; i < 6; i +=1){
      chatListItems.push(
        <div>
        <ListItem button >
         <ListItemAvatar>
            <Avatar alt="dm user avatar${i}" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" />
         </ListItemAvatar>
    
          <ListItemText
             primary={ " LandLordUsername123"}
             secondary={" ListingPost123"}                 
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
    }
    return chatListItems;
  }


  generateFakeConvo(){
    return(
        <React.Fragment>
          <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="your avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-512.png" />
           </ListItemAvatar>
           <ListItemText
             primary="YourUsername123 - sent 12:00pm"
             secondary={
               <React.Fragment>
                 <Typography component="span"  color="textPrimary">
                 Hello I a m contacting you about this listing #Listing1235 , is it still for rent?
                 </Typography>
               
               </React.Fragment>
             }
           />
          </ListItem>


          <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="your avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-512.png" />
           </ListItemAvatar>
           <ListItemText
             primary="YourUsername123 - sent 12:03pm"
             secondary={
               <React.Fragment>
                 <Typography component="span"  color="textPrimary">
                my phone number is 415 1234567890 , you can give me a call anytime!!!
                 </Typography>
               
               </React.Fragment>
             }
           />
          </ListItem>




          <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="your avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" />
           </ListItemAvatar>
           <ListItemText
             primary="LandLordUsername123 - sent 1:00pm"
             secondary={
               <React.Fragment>
                 <Typography component="span"  color="textPrimary">
                 Hello YourUsername123, yes the apartment is still for rent, its only $10000 per month!!!
                 </Typography>
               
               </React.Fragment>
             }
           />
          </ListItem>

          <ListItem >
           <ListItemAvatar>
             <Avatar alt="your avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" />
           </ListItemAvatar>
           <ListItemText
             primary="LandLordUsername123 - sent 1:02pm"
             secondary={
               <React.Fragment>
                 <Typography component="span"  color="textPrimary">
                   and this is a very long message regarding the apartment details
                     and this is a very long message regarding the apartment details  and this is a very long message regarding the apartment details  and this is a very long message regarding the apartment details  and this is a very long message regarding the apartment details  and this is a very long message regarding the apartment details
                       and this is a very long message regarding the apartment details
                         and this is a very long message regarding the apartment details  and this is a very long message regarding the apartmen
                           and this is a very long message regarding the apartment details


                 </Typography>
                             
               </React.Fragment>
             }
           />
          </ListItem>


           <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="your avatar" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-512.png" />
           </ListItemAvatar>
           <ListItemText
             primary="YourUsername123 - sent 2:00pm"
             secondary={
               <React.Fragment>
                 <Typography component="span"  color="textPrimary">
                 thank you for that very long detailed messsage
                 </Typography>
               
               </React.Fragment>
             }
           />
          </ListItem>


        </React.Fragment>
    );
  }



  allMessages(classes){
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
           
              {this.generateFakeConvo()}

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
                   onClick= {this.handleSendMessage}
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
    const {allUsersChats} = this.state;
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

               {this.chatsList(allUsersChats)}
            </List>
          </Grid>
        

         <Grid item xs={12} md={8} lg={8}>
            <Paper 
              className={classes.messagePaper}
              square='true'
              elevation='1'
             >

             {this.allMessages(classes)}
          </Paper>                   
        </Grid>

      </Grid>        
      </div>       
    );
  }

}

export default withStyles(styles, {withTheme:true}) (ContactPage);

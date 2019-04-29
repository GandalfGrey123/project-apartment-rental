import React, {Component} from 'react';

import { 
  Grid,Paper,AppBar,Toolbar,withStyles,
  Button,TextField, Typography, 
  Icon,IconButton,
  List,ListItem,
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

    this.getAllChats = this.getAllChats.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount(){
    this.getAllChats();
  }

  getAllChats = () => {
    // get UserId from session
    // userId = session.UserId
    var userId = 1
    getChats(userId, (chats) => {
      this.setState({ allUsersChats: chats});
    });
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
    for(let i = 0; i < chats.length; i +=1){
      chatListItems.push(
        <ListItem button >
         <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png" />
         </ListItemAvatar>
    
          <ListItemText
             primary={chats.withUserName}
             secondary={chats.listingTitle}                 
          />
    
          <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <DeleteForeverRoundedIcon />
                </IconButton>
          </ListItemSecondaryAction>
       </ListItem>
      );
    }
    return chatListItems;
  }

  allMessages(classes){
      return(
        <React.Fragment>
         <Paper>
            <List className={classes.chatBox}>             
            //LIST ITEMS
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
          <AppBar position="static" color="default">
            <Toolbar>
               
             <div className={classes.toolbar}>
             //message toolbar blank for now  
             </div>

            </Toolbar>
           </AppBar>
        
      

      <Grid container>       

          <Grid item xs={4}>
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
        

         <Grid item xs={8}>
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

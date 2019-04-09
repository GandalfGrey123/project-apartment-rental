const drawerWidth = 240;

const styles = theme => ({

 
  main:{
      ...theme.mixins.gutters(),   
    flexGrow: 1,
    margin: 20,
  },
  searchTextField:{
    width: '100%',    
    backgroundColor:'white',
  },

  searchSection:{
    padding: 15,
    margin:15,
    flexGrow: 1,
  },
   menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  drawer: {
    flexGrow: 1,
     [theme.breakpoints.up('sm')]: {      
      flexShrink: 0,
    },   
  },
  drawerPaper: {    
    position:'relative',
    height: '100%',
  },

  drawerMobilePaper:{
    position:'relative',
    width: '40%',
  },
  subList: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 280,
  },
});

export default styles;
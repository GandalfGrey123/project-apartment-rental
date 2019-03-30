const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,     
  },
  drawerPaper: {
    width: drawerWidth,
    position:'relative',
    height: '100%',
  },
  subList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
  },
  gridContainer: {   
    flexGrow: 1,
    minWidth: 0, 
    overflow: 'auto'   
  }
});

export default styles;
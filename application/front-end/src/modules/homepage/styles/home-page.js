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
    marginTop: 64
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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
    padding: theme.spacing.unit * 5,
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'auto'   
  }
});

export default styles;
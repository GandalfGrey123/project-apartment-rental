const drawerWidth = 240;

const styles = theme => ({

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
});

export default styles;
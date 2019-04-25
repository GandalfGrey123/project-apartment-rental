const styles = theme => ({
  root: {
      flexGrow: 1,
      padding: 10,
      margin: 20,
      width: '70%',
   	  marginLeft: '15%',
  },
  formGroup: {
    width: '100%'

  },
   card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    zIndex:-1,
  },
  gridList: {
    width: '100%',
    backgroundColor:'grey',
  },
   actions: {
    display: 'flex',
    zIndex:1000,
  },
   icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color:'white',
  },
 

});

export default styles;
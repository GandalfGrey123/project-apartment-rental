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
    margin:20,
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

  fileInput:{
    padding: 10,
    border: 10,
    backgroundColor: 'lightgrey',
    margin:20,
  },
  hide:{
   display: 'none'
  },
  margin:{
    margin:20,
  }

});

export default styles;
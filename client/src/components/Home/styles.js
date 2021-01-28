import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  heading: {
    color: 'black',
    fontFamily: "AssistantRegular",
    fontStyle: 'italic',
  },
  image: {
    marginLeft: '15px',
  },
  myDiv: {
    margin: 'auto',
    width: '20%',
    padding: '10px',
    placeholderTextColor: 'white',
  },
  [theme.breakpoints.down('sm')]:{
    mainContainer: {
      flexDirection: "column-reverse",
    },
  }
  
}));
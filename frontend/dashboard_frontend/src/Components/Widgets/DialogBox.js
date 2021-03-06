import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { Checkbox, FormGroup, Grid, List, ListItem, Typography } from '@mui/material';
import { getBaskets } from '../../actions/action';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import {config} from "../../config";


function CBLabel(props){
    const name = props.name;
    const number = 10;
    return(
        <React.Fragment>
            <Typography variant="h6">{name}</Typography>
        </React.Fragment>
    );
}


function MaxWidthDialog(props) {
  const dispatch = useDispatch();
  const ticker_to_add = props.ticker;
  const [open, setOpen] = props.open;
  const [fullWidth, setFullWidth] = props.fullWidth;
  const [maxWidth, setMaxWidth] =props.maxWidth;
  // const [baskets, setBaskets] = React.useState([]);
  const baskets = props.state.baskets.data || [];
  baskets.forEach((basket)=>{basket['selected'] = false});
  const [checkedState, setCheckedState] = React.useState( new Array(baskets.length).fill(false));
  let selectedBasketId =[];

  // const addSelector = () => {
  //   let temp = baskets;
  //   for(let i=0;i<temp.length;i++){
  //       temp[i].selected = false;
  //   }
  //   setBaskets(temp);
  // }   

  const handleChange = (event, position) => {
    
    const updatedCheckedState = checkedState.map((item, index)=> index===position?!item:item);
    setCheckedState(updatedCheckedState);
    }



  const handleAdd = async (event) => {
    
    let basketIds = [];
    for(let i=0;i<checkedState.length;i++){
      if(checkedState[i]){
        basketIds.push(baskets[i].id)
      }
    }
    console.log(props.ticker);
    const configHeaders = localStorage.getItem('authTokens')?{
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
      }
    }:""
    await axios.post(config().insertIntoBasket,{basketID:basketIds, ticker: props.ticker},configHeaders)
    .then((response)=>{console.log(response)})
    .catch((err)=>{console.log(err)});
    setOpen(false);
  }

  const handleClickOpen = props.handleClickOpen;

  const handleClose = props.handleClose;

  const handleMaxWidthChange = props.handleMaxWidthChange;

  const handleFullWidthChange = props.handleFullWidthChange;

  // React.useEffect(()=>{
  //   const getBasketsAPI = async () => {
  //       const response = await getBaskets(dispatch);
  //       console.log("In dialog box file:",response);
  //       setBaskets(response.data);
  //   }
  //   getBasketsAPI();
  //   addSelector();
  // },[]);


  return (
    <React.Fragment>
      <Dialog
        xs={1}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add To Watchlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pick atleast 1 watchlist to add company.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              marginTop:"25px",
              padding:"20px"
            }}
          >
        <List>
            {(baskets.length>0)?baskets.map((basket,i)=> {
                return(
                    <ListItem>
                        <Checkbox checked={checkedState[i]} onChange={(event) => handleChange(event,i)}/>
                        <Typography variant="h6">{basket.name}</Typography>
                    </ListItem>
                )
            }):"No baskets available for this user"}
            </List>
          </Box>
          
        </DialogContent>
        <Box sx={{display:"flex", justifyContent:"center", padding:"15px"}} >
        <Button  variant="contained" sx={{backgroundColor:"#515051",width:"200px",'&:hover':{backgroundColor:"black"}}} onClick={handleAdd}>Add</Button>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    state:state
  }
};

export default connect(mapStateToProps, null)(MaxWidthDialog);
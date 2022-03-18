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
import { Checkbox, FormGroup, Grid, List, Typography } from '@mui/material';
import { getBaskets } from '../../actions/action';
import { connect, useDispatch } from 'react-redux';


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
  const [open, setOpen] = props.open;
  const [fullWidth, setFullWidth] = props.fullWidth;
  const [maxWidth, setMaxWidth] =props.maxWidth;
  const [baskets, setBaskets] = React.useState([]);
  const [state, setState] = React.useState([]);
  let selectedBasketId =[];

  const handleChange = (event) => {
    let temp = state;
    for(let i=0;i<temp.length;i++){
      if(event.target.name === i.toString())
        temp[i] = !temp[i];
    }
    setState(temp);
    console.log("state after selection: ", state);
    selectedBasketId=[];
    for(let i=0;i<state.length;i++){
      if(state[i]){
        selectedBasketId.push(baskets[i].id)
      }
    }
  };

  const handleAdd = (event) => {
    console.log(selectedBasketId);
  }

  const handleClickOpen = props.handleClickOpen;

  const handleClose = props.handleClose;

  const handleMaxWidthChange = props.handleMaxWidthChange;

  const handleFullWidthChange = props.handleFullWidthChange;

  React.useEffect(()=>{
    const getBasketsAPI = async () => {
        const response = await getBaskets(dispatch);
        console.log("In dialog box file:",response);
        setBaskets(response.data);
        console.log("This is the basket rn", baskets)
        let temp=[];
        for(var i=0;i<baskets.length;i++){
          temp.push(false);
        }
        setState(temp);
    }

    getBasketsAPI();
  },[])
  return (
    <React.Fragment>
      <Dialog
        xs={1}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
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
        <FormGroup>
          {(baskets.length>0)?baskets.map((basket, i)=>{
            return(
                <FormControlLabel
                control={
                  <Checkbox checked={state[i]} onChange={handleChange} name={i.toString()} />
                }
                label={<CBLabel name={basket.name}/>}
              />);
              }):"No baskets available for this user"}
          
        </FormGroup>
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
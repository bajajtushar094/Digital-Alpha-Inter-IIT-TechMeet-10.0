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


function CBLabel(props){
    const name = props.name;
    const number = 10;
    return(
        <React.Fragment>
            <Typography variant="h6">{name}</Typography>
            <Typography sx={{color:"#9B9B9C"}} variant="subtitle2">No. of baskets is:{number}</Typography>
        </React.Fragment>
    );
}


export default function MaxWidthDialog(props) {
  const [open, setOpen] = props.open;
  const [fullWidth, setFullWidth] = props.fullWidth;
  const [maxWidth, setMaxWidth] =props.maxWidth;
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { gilad, jason, antoine } = state;

  const listBaskets =[{
      name:"Basket 1",
      number:4
    },
    {
    name:"Basket 1",
    number:4
        },
    {
    name:"Basket 1",
        number:4
          }
    ]

  const handleClickOpen = props.handleClickOpen;

  const handleClose = props.handleClose;

  const handleMaxWidthChange = props.handleMaxWidthChange;

  const handleFullWidthChange = props.handleFullWidthChange;

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
          <FormControlLabel
            control={
              <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
            }
            label={<CBLabel name="Gilad Gray"/>}
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label={<CBLabel name="Jason Killian"/>}
          />
          <FormControlLabel
            control={
              <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
            }
            label={<CBLabel name="Antoine Llorca"/>}
          />
        </FormGroup>
          </Box>
          
        </DialogContent>
        <Box sx={{display:"flex", justifyContent:"center", padding:"15px"}} >
        <Button  variant="contained" sx={{backgroundColor:"#515051",width:"200px",'&:hover':{backgroundColor:"black"}}} onClick={handleClose}>Close</Button>
        </Box>
        
      </Dialog>
    </React.Fragment>
  );
}
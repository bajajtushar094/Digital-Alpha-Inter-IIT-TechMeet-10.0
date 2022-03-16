import React from 'react';
import "./navbar.scss";
import logo1 from '../../../images/nav/nav1.png';
import item1 from '../../../images/nav/Market.svg';
import item2 from '../../../images/nav/Basket.svg';
import { Link } from 'react-router-dom';
import MaxWidthDialog from '../../Widgets/DialogBox';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');

  const handleClickOpen = () => {
    setOpen(true);
  };
   const handleDialogButton =() =>{
     setOpen(!open);
   }
  const handleClose = () => {
    setOpen(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <div className='nav'>
     
      <div>
        <Link to='/'>
        <img src={logo1} alt="" />
        </Link>
      </div>
      <div className='navtabcontainer'>
       <Link to="/">
        <div className='navicon'>
          <img src={item1} alt="" />
         </div>
       </Link>
       <Link to="/">
        <div className='navicon'>
          <img src={item2} alt="" />
         </div>
       </Link>
       <Link to="/">
        <div className='navicon'>
          <button className='btn-primary' onClick={handleDialogButton}>Log In</button>
         </div>
       </Link>
      </div>
      <MaxWidthDialog open={[open,setOpen]} fullWidth={[fullWidth,setFullWidth]} maxWidth={[maxWidth, setMaxWidth]} handleClickOpen ={handleClickOpen} handleClose={handleClose} handleMaxWidthChange={handleMaxWidthChange} handleFullWidthChange={handleFullWidthChange}/>
    </div>
  )
}

export default Navbar
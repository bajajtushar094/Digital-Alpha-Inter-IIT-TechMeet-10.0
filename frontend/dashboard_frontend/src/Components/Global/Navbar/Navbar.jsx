import React from 'react';
import "./navbar.scss";
import logo1 from '../../../images/nav/nav1.png';
import item1 from '../../../images/nav/Market.svg';
import item2 from '../../../images/nav/Basket.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <button className='btn-primary'>Log In</button>
         </div>
       </Link>
      </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import './landing.scss';
//components
import Navbar from '../../Components/Global/Navbar/Navbar'
import Hero from './Hero';
import Data from './Data';


const Landing = () => {
  return (
    <div className='landing'>
        <Navbar />
        <Hero />
        <Data />
    </div>
  )
}

export default Landing
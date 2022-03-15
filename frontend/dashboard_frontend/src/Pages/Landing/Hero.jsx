import React from 'react'
import './hero.scss'
import search from '../../images/Landing/Search.svg'
import { useNavigate } from "react-router-dom";

const Hero = () => {
  let navigate = useNavigate();
  const handleSearch = () => {
    const query = document.getElementById('landing_search').value;
    navigate(`/search/${query}`);
  }

  return (
    <div className='isgradient'>
    <h1>Finding the text</h1>
    <br />
    <h1>Big thing just got easy</h1>
    <h2 className='isinlanding'>
     <br />
     View 300+ SaaS platform fillings
     <br />
     and guide your portfolio to the moon
     <br />
    </h2>
    <div className='searchbar isbig'>
    <input className="searchinput isbig" id="landing_search" placeholder='Search companies or tickers' />
    <button className="div-block-7 isbig" onClick = {handleSearch}><img src={search} loading="lazy" alt="" /></button>
    </div>
    </div>
  )
}

export default Hero
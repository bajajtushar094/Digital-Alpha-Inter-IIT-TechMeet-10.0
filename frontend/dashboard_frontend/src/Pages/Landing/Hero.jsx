import React from 'react'
import './hero.scss'
import search from '../../images/Landing/Search.svg'

const Hero = () => {
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
    <input className="searchinput isbig" placeholder='Search companies or tickers'></input>
    <button className="div-block-7 isbig"><img src={search} loading="lazy" alt="" /></button>
    </div>
    </div>
  )
}

export default Hero
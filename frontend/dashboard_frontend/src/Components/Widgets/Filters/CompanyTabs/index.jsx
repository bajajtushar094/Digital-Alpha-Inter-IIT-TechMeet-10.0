import React, { useEffect, useState } from "react";
import '../../../../global.scss';
import './companyTabs.scss';
import cross from "../../../../images/widgets/Cross.svg";
import { connect, useDispatch } from "react-redux";

const CompanyTabs = ({state})=>{
    const companyTabs = state.queryFilings.tickers; 
    const dispatch = useDispatch()
    const removeClickHandler = (ticker) => {
        dispatch({
            type: "UPDATE_QUERY_FILINGS",
            queryFilings: {
                ...state.queryFilings,
                tickers: [...companyTabs.filter(company => company !== ticker)]
            }
        })
    }
    return (
        <div className="tagsflex">
            {companyTabs.map((ticker, index) => (
                <Component ticker={ticker} key={index} removeClickHandler={removeClickHandler}/>
            ))}
        </div>
    );
}

const Component = ({ ticker , removeClickHandler }) => (
  <div className='tagcontainer'>
    <div className='tickertag'>
      <h4 className='black50'>{ticker}</h4>
      <button onClick={() =>{removeClickHandler(ticker)}}><img src={cross} loading='lazy' alt='' /></button>
    </div>
  </div>
);


/* 
import React from "react";
import '../../../../global.scss';
import './companyTabs.scss';
import cross from "../../../../images/widgets/Cross.svg";

const CompanyTabs = ({ handleSearchFilings }) => {
  return (
    <div className='tagsflex'>
      {handleSearchFilings.tickers.map((el) => (
        <Component ticker={el.ticker} />
      ))}
    </div>
  );
};

const Component = ({ticker}) => (
        <div className="tagcontainer">
            <div className="tickertag">
                <h4 className="black50">{ticker}</h4><img src={cross} loading="lazy" alt=""/>
            </div>
        </div>
)

export default CompanyTabs; 
*/

// export default CompanyTabs;

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(CompanyTabs);

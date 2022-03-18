import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import "../../../../global.scss";
import "./filingType.scss";

const FilingType = ({state}) => {
    const [active, setActive] = useState([false, false, false]);
    const dispatch = useDispatch();
    useEffect(() => {
      let filing_type = active.map((item, index) => {
        if (item) {
          switch(index) {
            case 0:
              return "8K"
            case 1:
              return "10K"
            case 2:
              return "10Q"
            default:
              return null
          }
        }
        else return null 
      });
      filing_type = filing_type.filter(item => item !== null);
      dispatch({
        type: "UPDATE_QUERY_FILINGS",
        queryFilings: {
          ...state.queryFilings,
          filing_type: filing_type
      }})
    }, [active]);
    return (
      <div
        id='w-node-_7afe8222-f6c9-3ac1-420d-01e4b7f2de0f-5d4911ed'
        className='filter-filing'
      >
        <div className='ui-text black100'>Filing Type</div>
        <div className='filingflex'>
          <div
            className={
              active[0]
                ? "filingcontainer isactive"
                : "filingcontainer"
            }
          >
            <button className='ui-text issecondarybutton isfiling black50' onClick={() => {
              setActive([!active[0], active[1], active[2]]);
            }}>8K</button>
          </div>
          <div className={
              active[1]
                ? "filingcontainer isactive"
                : "filingcontainer"
            }>
            <button className='ui-text issecondarybutton isfiling black50' onClick={
              () => {
                setActive([active[0], !active[1], active[2]]);
              }
            }>
              10K
            </button>
          </div>
          <div className={
              active[2]
                ? "filingcontainer isactive"
                : "filingcontainer"
            }>
            <div className='ui-text issecondarybutton isfiling black50' onClick={
              () => {
                setActive([active[0], active[1], !active[2]]);
              }
            }>
              10Q
            </div>
          </div>
        </div>
      </div>
    );
};

// export default FilingType;

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(FilingType);


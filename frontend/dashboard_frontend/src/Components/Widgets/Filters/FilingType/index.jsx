import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import "../../../../global.scss";
import "./filingType.scss";

const FilingType = ({ state }) => {
  const [active, setActive] = useState([false, false, false]);
  const dispatch = useDispatch();
  const filingMap = {
    0:"8K",
    1:"10K",
    2:"10Q"
  }
  useEffect(() => {
    console.log("Active from index filing type:", active);
    // let filing_type = active.map((item, index) => {
    //   if (item) {
    //     switch (index) {
    //       case 0:
    //         return "8K"
    //       case 1:
    //         return "10K"
    //       case 2:
    //         return "10Q"
    //       default:
    //         return null
    //     }
    //   }
    //   else return null
    // });
    let filing_type = [];
    
    for(let i=0;i<3;i++){
      if(active[i]){
        filing_type.push(filingMap[i]);
      }
    }
    console.log("FIling Type:", filing_type);
    // filing_type = filing_type.filter(item => item !== null);
    dispatch({
      type: "UPDATE_QUERY_FILINGS",
      queryFilings: {
        ...state.queryFilings,
        form_type: filing_type
      }
    })
    console.log("Redux state:", state.queryFilings);
  }, [active]);


  const clickHandleFormType = (id) => {
    let updatedActive = active.slice();
    updatedActive[id] = !updatedActive[id];
    console.log("Updated Active: 1", updatedActive);
    setActive(updatedActive);
    console.log("Updated Active: 2", active);
  }
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
          <button className='ui-text issecondarybutton isfiling black50' onClick={() => {clickHandleFormType(0)}}>8K</button>
        </div>
        <div className={
          active[1]
            ? "filingcontainer isactive"
            : "filingcontainer"
        }>
          <button className='ui-text issecondarybutton isfiling black50' onClick={() => {clickHandleFormType(1);}}>
            10K
          </button>
        </div>
        <div className={
          active[2]
            ? "filingcontainer isactive"
            : "filingcontainer"
        }>
          <div className='ui-text issecondarybutton isfiling black50' onClick={() => {clickHandleFormType(2);}}>
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


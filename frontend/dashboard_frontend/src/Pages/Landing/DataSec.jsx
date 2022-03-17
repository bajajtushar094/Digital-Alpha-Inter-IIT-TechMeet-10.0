import React from 'react'
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn'
import TableTwo from '../../Components/Widgets/TableTwo/TableTwo'
import { connect } from "react-redux";
const DataSec = (props) => {
  console.log("Data from DataSec:", props.state);

  const data = props.state.recentFilings;
  return (
    <div style={{display:"flex",gap:"2rem",marginTop:"2rem"}}>
        <RecentlyViewedLogIn />
        <TableTwo data={data}/>
    </div>
  )
}


const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(DataSec);
// export default DataSec;
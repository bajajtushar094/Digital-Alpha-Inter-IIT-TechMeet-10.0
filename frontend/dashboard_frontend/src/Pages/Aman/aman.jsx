import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Global/Navbar/Navbar";
import MainFilter from "../../Components/Widgets/Filters/MainFilter";
import SearchImage from "../../images/widgets/Search_black.svg";
import Table from "./table_for_aman";
import "../../global.scss";
import "./aman.scss";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { searchFillings, simpleSearch } from "../../actions/action";

const Search = (props) => {
  const query = useParams().query;
  return (
    <>
      <Navbar />
      <div className='searchcontainer'>
        <div
          className='maintitle'
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            justifyItems: "center",
            margin: "2vh",
          }}
        >
          <img src={SearchImage} loading='lazy' alt='' />
          <h1 className='heading heading-2'><span style={{fontWeight: '200'}}>Search results for </span>{query}</h1>
        </div>
        <div className='searchcontent'>
          <MainFilter />
          {/* <MainFilter query = {queryFilings} setQuery={setQueryFilings}/> */}
          <div className="tableSideMain">
              <div className="tableSide">
                  <div className="switch">
                <p className="active">Filings</p>
                <p>Companies</p>
                  </div>
                  <div className="download_csv">
                      <p>Download Query CSV</p>
                  </div>
              </div>
              <Table />
          </div>
        </div>
      </div>
    </>
  );
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         simpleSearch: (query) => simpleSearch(query, dispatch)
//     }
// }

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(Search);

import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import MainFilter from '../../Components/Widgets/Filters/MainFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
import "./search.scss";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { searchFilings, simpleSearch } from '../../actions/action';

const Search = (props)=>{
    const dispatch = useDispatch();
    const query = useParams().query;
    const [companies_bySimple, setCompanies_bySimple] = useState([]);
    const [companies_byFiling, setCompanies_byFiling] = useState([]);
    const queryFilings = props.state.queryFilings;
    // const [queryFilings, setQueryFilings] = useState({
    //     "tickers": [],
    //     "form_type": [],
    //     "time_start": "",
    //     "time_end": ""
    // })
    useEffect(() => {
        const func = async () => {
            console.log("query", query);
            console.log("queryFilings", queryFilings);
            const data_bySimple = await simpleSearch(query, dispatch);
            const data_byFilings = await searchFilings(queryFilings, dispatch);
            console.log("search :", data_bySimple);
            console.log("Filings:", data_byFilings);
            setCompanies_bySimple(data_bySimple);
            setCompanies_byFiling(data_byFilings);
        };
        func();
    }, [dispatch, query, queryFilings])

    return (
        <>
            <Navbar/>
            <div className="searchcontainer">
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center', margin:"2vh"}}>
                <img src={SearchImage} loading="lazy" alt=""/>
                <h1 className="heading heading-2">Filter</h1>
            </div>
            <div className="searchcontent">
            <MainFilter />
            {/* <MainFilter query = {queryFilings} setQuery={setQueryFilings}/> */}
            <Table />
            </div>
            </div>
        </>

    );
}

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

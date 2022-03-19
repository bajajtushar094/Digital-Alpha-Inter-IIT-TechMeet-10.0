import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Global/Navbar/Navbar";
import MainFilter from "../../Components/Widgets/Filters/MainFilter";
import Ticker from "../../Components/Widgets/Filters/Ticker";
import SearchCompany from "../../Components/Widgets/Filters/SearchCompany";
import SearchImage from "../../images/widgets/Search_black.svg";
import Table from "../../Components/Widgets/Table";
import "../../global.scss";
import "./search.scss";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
    searchFillings,
    simpleSearch,
    searchCompanyAPI,
} from "../../actions/action";
import vector1 from "../../images/nav/Market.svg";

const Search = (props) => {
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

    const [selected, setSelected] = useState(1);
    console.log("Search Filings:", props.state.searchFillings);

    // const [displayData, setDisplayData] = useState(false);
    // let dummyData=[];
    const [filingsData, setFilingsData] = useState([]);
    useEffect(() => {
        const func = async () => {
            console.log("queryFilings", queryFilings);

            let data_byFilings;

            if (selected == 2) {
                data_byFilings = await searchFillings(queryFilings, dispatch);
            } else if (selected == 1) {
                data_byFilings = await searchCompanyAPI(queryFilings, dispatch);
            }
            dispatch({
                type: "STORE_SEARCH_FILINGS",
                searchFillings: data_byFilings.data,
            });

            console.log("Data BY Filings:", data_byFilings);
        };
        func();
    }, [queryFilings]);

    useEffect(() => {
        const func = async () => {
            const data_bySimple = await simpleSearch(query, dispatch);
            setCompanies_bySimple(data_bySimple);
        };

        func();

        return function cleanup() {
            dispatch({
                type: "CLEAN_QUERY_FILINGS",
            });
        };
    }, []);

    const handleTable = (selectedTemp) => {
        setSelected(selectedTemp);
        dispatch({
            type: "RESET_QUERY_FILINGS",
            queryFilings: {
                tickers: [],
                form_type: [],
                time_start: "",
                time_end: "",
            },
        });
        dispatch({
            type: "RESET_SEARCH_FILINGS",
            searchFillings: [],
        });
    };

    console.log("Search Filings:", props.state.searchFillings);
    // if(props.state.searchFillings!=null){
    //     Object.entries(props.state.searchFillings).forEach(item => {
    //         let oldArray = filingsData;
    //         console.log("Item:", item);
    //         // oldArray = oldArray.concat(item[1]);
    //         // setFilingsData(oldArray);
    //       })

    //     // setDisplayData(true);
    // }

    // console.log("Final Data:", filingsData)
    return (
        <>
            <Navbar />
            <div className="landingdata">
                <div className="top">
                    <img src={vector1} alt="" />
                    <h3>Filter</h3>
                </div>
                <div className="body">
                    <div className="cardsec">
                        {selected == 1 && <SearchCompany />}
                        {selected == 2 && <MainFilter />}
                    </div>
                    <div className="tablesec">
                        <div className="table_top">
                            <button
                                className={selected === 1 ? "btn-link active" : "btn-link"}
                                onClick={() => {
                                    handleTable(1);
                                }}
                            >
                                Companies
                            </button>
                            <button
                                className={selected === 2 ? "btn-link active" : "btn-link"}
                                onClick={() => {
                                    handleTable(2);
                                }}
                            >
                                Filings
                            </button>
                        </div>
                        {selected == 1 && (
                            <Table
                                data={
                                    props.state.searchFillings != undefined
                                        ? props.state.searchFillings
                                        : []
                                }
                                hasCheckbox={false}
                                isCompany={true}
                                fromSearch={true}
                            />
                        )}
                        {selected == 2 && (
                            <Table
                                data={
                                    props.state.searchFillings != undefined
                                        ? props.state.searchFillings
                                        : []
                                }
                                hasCheckbox={false}
                                isCompany={false}
                                fromSearch={true}
                            />
                        )}
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

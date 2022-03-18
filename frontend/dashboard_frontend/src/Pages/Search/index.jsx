import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import MainFilter from '../../Components/Widgets/Filters/MainFilter';
import Ticker from '../../Components/Widgets/Filters/Ticker';
import SearchCompany from '../../Components/Widgets/Filters/SearchCompany';
import SearchImage from "../../images/widgets/Search_black.svg";
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
import "./search.scss";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { searchFilings, simpleSearch } from '../../actions/action';
import vector1 from '../../images/nav/Market.svg';

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
    useEffect(() => {
        const func = async () => {
            console.log("queryFilings", queryFilings);
            const data_byFilings = await searchFilings(queryFilings, dispatch);
            console.log("Filings:", data_byFilings);
            // setCompanies_byFiling(data_byFilings);
			dispatch({
				type: "STORE_SEARCH_FILINGS",
				searchFilings: data_byFilings
			})
        };
        func();
        return function cleanup() {
          dispatch({
            type: "CLEAN_QUERY_FILINGS",
          });
          console.log("error log search index line 44");
        };
    }, [])
    useEffect(() => {
        const func = async () => {
            await simpleSearch(query, dispatch);
        }
        func();
    }, [])

    const handleTable = (selectedTemp) => {
        setSelected(selectedTemp);
    }

    const [selected, setSelected] = useState(1);
    console.log("Search Filings:",props.state.searchFilings)

    const [filingsData, setFilingsData] = useState([]);

    if(props.state.searchFilings!=null){
        Object.entries(props.state.searchFilings).forEach(item => {
            console.log("Item:", item);
            // for(let i=0;i<item[1].length;i++){
            //     console.log("Item I", item[1][i]);
            // }
            console.log("filingData:")
          })
    }


    // console.log("Final Data:", filingsData)
    return (
        <>
            <Navbar />
            <div className='landingdata'>
			<div className='top'>
				<img src={vector1} alt="" />
				<h3>Filter</h3>
			</div>
			<div className='body'>
				<div className='cardsec'>
                    {selected==1&&<SearchCompany/>}
					{selected==2&&<MainFilter/>}
				</div>
				<div className='tablesec'>
					<div className="table_top">
						<button className={selected === 1 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(1); }}>All Companies</button>
						<button className={selected === 2 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(2); }}>Recent Filings</button>
					</div>
					{selected==1&&<Table data={[]} hasCheckbox={false} isCompany={true} />}
					{selected==2&&<Table data={[]} hasCheckbox={false} isCompany={false} />}
				</div>
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
    console.log("State:", state);
    return {
        // To get the list of employee details from store
        state: state,
    };
};

export default connect(mapStateToProps, null)(Search);

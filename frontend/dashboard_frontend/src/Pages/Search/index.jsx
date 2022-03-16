import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import MainFilter from '../../Components/Widgets/Filters/MainFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { simpleSearch } from '../../actions/action';

const Search = (props)=>{
    const [companies, setCompanies] = useState([]);
    const query = useParams().query;
    useEffect(async () => {
        const data = await props.simpleSearch(query);
        console.log(data);
        setCompanies(data);
    }, [])

    const handleSearchFillings = () => {
        console.log("Hello")
    }

=======
import './search.scss'
>>>>>>> 488954b4f6ee479c823c434bfbc4b5b505a36177

    return (
        <>
            <Navbar/>
            <div className="searchcontainer">
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center', margin:"2vh"}}>
                <img src={SearchImage} loading="lazy" alt=""/>
                <h1 className="heading heading-2">Filter</h1>
            </div>
<<<<<<< HEAD
            <MainFilter handleSearchFillings = {handleSearchFillings} />
        </div>
=======
            <div className="searchcontent">
            <MainFilter/>
            <Table />
            </div>
            </div>
        </>
>>>>>>> 488954b4f6ee479c823c434bfbc4b5b505a36177

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        simpleSearch: (query) => simpleSearch(query, dispatch)
    }
}

export default connect(mapDispatchToProps)(Search);

import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import MainFilter from '../../Components/Widgets/Filters/MainFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import "../../global.scss";
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


    return (
        <div>
            <Navbar/>
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center', margin:"2vh"}}>
                <img src={SearchImage} loading="lazy" alt=""/>
                <h1 className="heading heading-2">Filter</h1>
            </div>
            <MainFilter handleSearchFillings = {handleSearchFillings} />
        </div>

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        simpleSearch: (query) => simpleSearch(query, dispatch)
    }
}

export default connect(mapDispatchToProps)(Search);

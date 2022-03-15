import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import MainFilter from '../../Components/Widgets/Filters/MainFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import Table from '../../Components/Widgets/Table';
import "../../global.scss";
import './search.scss'

const Search = ()=>{
    return (
        <>
            <Navbar/>
            <div className="searchcontainer">
            <div className="maintitle" style={{display:'flex',flexDirection:'row', justifyContent:'flex-start', justifyItems:'center', margin:"2vh"}}>
                <img src={SearchImage} loading="lazy" alt=""/>
                <h1 className="heading heading-2">Filter</h1>
            </div>
            <div className="searchcontent">
            <MainFilter/>
            <Table />
            </div>
            </div>
        </>

    );
}

export default Search;
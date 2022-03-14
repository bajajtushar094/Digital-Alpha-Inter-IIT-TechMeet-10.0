import React from 'react';
import Navbar from '../../Components/Global/Navbar/Navbar'
import CompanyFilter from '../../Components/Widgets/Filters/CompanyFilter';
import SearchImage from "../../images/widgets/Search_black.svg";
import "../../global.scss";

const Company = ()=>{
    return (
        <div>
            <Navbar/>
            <CompanyFilter/>
        </div>

    );
}

export default Company;
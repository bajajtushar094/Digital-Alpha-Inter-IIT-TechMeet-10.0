import React, { useEffect, useState } from "react";
import '../../../../global.scss';
import './companyTabs.scss';
import cross from "../../../../images/widgets/Cross.svg";
import { connect, useDispatch } from "react-redux";
import { deselectInBasket } from "../../../../actions/action";

const CompanyTabs = (props) => {
    const dispatch = useDispatch();
    const [companyList, setCompanyList] = useState(props.state.basketSelectedCompanies);
    const state = props.state;
    // let company_list=[];
    // if(props.list)
    //     company_list = props.list;

    const handleCrossClick = (company) => {
        const response = deselectInBasket(company, dispatch);
    }
    useEffect(() => {
        dispatch({
            type:"UPDATE_QUERY_FILINGS",
            queryFilings: {
                ...state.queryFilings,
                tickers: [...companyList],
            }
        })
    }, [companyList])

    return (
        <div className="tagsflex">
            {companyList.map((company) => {
                return (
                    <div className="tagcontainer">
                        <div className="tickertag">
                            <h4 className="black50">{company.ticker}</h4>
                            <button onClick={() => { handleCrossClick(company) }} style={{ background: "none", padding: "0" }}><img src={cross} loading="lazy" alt="" /></button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

export default connect(mapStateToProps, null)(CompanyTabs);
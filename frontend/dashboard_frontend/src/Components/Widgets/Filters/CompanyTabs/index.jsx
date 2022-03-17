import React from "react";
import '../../../../global.scss';
import './companyTabs.scss';
import cross from "../../../../images/widgets/Cross.svg";

const CompanyTabs = (props)=>{
    let company_list=[];
    if(props.list)
        company_list = props.list;

    const handleCrossClick = () => {
        console.log("Cross button was clicked");
    }
    const checkImport = () => {
        console.log("checkImport-CompanyTabs")
        console.log(company_list);
        }
    React.useEffect(()=>{checkImport();},[])
    
    return (
        <div className="tagsflex">
        {company_list.map((company)=>{
            return(
            <div className="tagcontainer">
                <div className="tickertag">
                    <h4 className="black50">{company.ticker}</h4>
                    <button onClick={handleCrossClick} style={{background:"none", padding:"0"}}><img src={cross} loading="lazy" alt=""/></button>
                </div>
            </div>
            );
        })}
        </div>
    );
}

export default CompanyTabs;
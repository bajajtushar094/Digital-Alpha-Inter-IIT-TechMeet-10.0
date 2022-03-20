import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './table.scss';
import { getMetricsFromFiling, getKeyMetricOfCompany, searchFillings } from '../../actions/action';
import MaxWidthDialog from './DialogBox';

const CompanyRow = (props) => {
    // console.log("props", props);
    const dispatch = useDispatch();
    const [hasCheckbox, setHasCheckbox] = useState(props.hasCheckbox);
    const [isCompany, setIsCompany] = useState(props.isCompany);
    let filings = [];
    const fromSearch = props.fromSearch
    // console.log("Props from Row:", props)
    if (fromSearch == false) {
        filings = props.filing.filings
    }
    else {
        filings = props.filing
    }

    // console.log("Filings from Company Row:", filings);

    const [ARR, setARR] = useState("");
    const [CCR, setCCR] = useState("");
    const [LTV, setLTV] = useState("");
    const [CAC, setCAC] = useState("");
    const [ARPA, setARPA] = useState("");
    const [RCC, setRCC] = useState("");

    const [hover, setHover] = useState(false);
    const [hoverbg, setHoverBg] = useState(false);
    const handleMouseIn = () => {
        setHover(true);
    }
    const handleMouseOut = () => {
        setHover(false);
    }
    const handleMouseInBg = () => {
        setHoverBg(true);
    };
    const handleMouseOutBg = () => {
        setHoverBg(false);
    };

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xs');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDialogButton = () => {
        setOpen(!open);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };


    return (
        <>
            {
                filings != undefined && filings.map((filing, i) => {
                    const key_metrics = filing.key_metrics ? filing.key_metrics : [];
                    let CAC, GROSS_MARGIN, MRR, ARPU, AU, ARR;

                    for (let i = 0; i < key_metrics.length; i++) {
                        // console.log("I", key_metrics[i])
                        if (key_metrics[i]['metric_type'] == "CAC") {
                            CAC = key_metrics[i]['metric_value']
                        }
                        else if (key_metrics[i]['metric_type'] == "Gross Margin") {
                            GROSS_MARGIN = key_metrics[i]['metric_value']
                        }
                        else if (key_metrics[i]['metric_type'] == "MRR") {
                            MRR = key_metrics[i]['metric_value']
                        }
                        else if (key_metrics[i]['metric_type'] == "ARPU") {
                            ARPU = key_metrics[i]['metric_value']
                        }
                        else if (key_metrics[i]['metric_type'] == "AU") {
                            AU = key_metrics[i]['metric_value']
                        }
                        else if (key_metrics[i]['metric_type'] == "ARR") {
                            ARR = key_metrics[i]['metric_value']
                        }
                    }
                    
                    return (
                        <div className="listing" onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut}>
                            <div className="listingheader-wrapper">

                                <div className={hasCheckbox ? "listingheadergrid hascheckbox" : "listingheadergrid"}>

                                    {hasCheckbox && <div className="actiondiv">
                                        <input className='checkbox' type="checkbox" />
                                    </div>}
                                    
                                    <>
                                        <div className="filingcontainer">
                                            <Link to={`/company/${filing['ticker']}`}><div className="ui-text issecondarybutton isfiling"><img src={filing.logo} width="30px" /></div></Link>
                                        </div>
                                        <div className="filingcontainer">
                                            <Link to={`/company/${filing['ticker']}`}><div className="ui-text issecondarybutton isfiling">{fromSearch == true ? filing['ticker'] : filing['company_id']}</div></Link>
                                        </div>
                                    </>

                                </div>
                            </div>
                            <div className="div-block-4">
                                <h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e4-5d4911ed" className="iscolumn black50">{CAC ? CAC : '-'}</h4>
                                <h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e6-5d4911ed" className="iscolumn black50">{GROSS_MARGIN ? GROSS_MARGIN : '-'}</h4>
                                <h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e8-5d4911ed" className="iscolumn black50">{MRR ? MRR : '-'}</h4>
                                <h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194ea-5d4911ed" className="iscolumn black50">{ARPU ? ARPU : '-'}</h4>
                                <div onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} className="actions">
                                    <div className="actions-1">
                                        <Link to={`/company/${filing['ticker']}`} >
                                        <div className="actioncontainer ">
                                            <IconButton style={{ backgroundColor: 'transparent' }} aria-label="delete">
                                                <OpenInNewIcon />
                                            </IconButton>
                                        </div>
                                        </Link>
                                        <div className= "actioncontainer">
                                            <IconButton style={{ backgroundColor: 'transparent' }} onClick={handleClickOpen}  aria-label="delete">
                                                <BookmarkBorderIcon />
                                            </IconButton>
                                        </div>
                                        
                                    </div>
                                    <div className="actioncontainer-1 ">
                                            <MoreVertIcon />
                                     </div>
                                </div>
                                <MaxWidthDialog open={[open, setOpen]} fullWidth={[fullWidth, setFullWidth]} maxWidth={[maxWidth, setMaxWidth]} handleClickOpen={handleClickOpen} handleClose={handleClose} handleMaxWidthChange={handleMaxWidthChange} handleFullWidthChange={handleFullWidthChange} ticker={filing.ticker}/>
                            </div>
                        </div>);
                })}
        </>
    )
}

export default CompanyRow;
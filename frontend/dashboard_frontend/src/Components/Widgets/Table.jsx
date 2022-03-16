import React from 'react'
import { useState} from 'react';
import {useDispatch} from "react-redux";
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './table.scss';
import { getMetricsFromFiling } from '../../actions/action';


const Row_custom = (props) => {
	const [hasCheckbox, setHasCheckbox] = useState(props.hasCheckbox);
	const [isCompany, setIsCompany] = useState(props.isCompany);
	const filing = props.filing;
	const [hover,setHover] = useState(false);
	const [hoverbg, setHoverBg] = useState(false);
	const handleMouseIn = () => {
		setHover(true);
	}
	const handleMouseOut = () =>{
		setHover(false);
	}
	const handleMouseInBg = () => {
		setHoverBg(true);
	};
	const handleMouseOutBg = () => {
		setHoverBg(false);
	};

	const metrics = filing['metrics'];
	let ARR, CCR, LTV, CAC, ARPA, RCC;
	for(let i=0;i<metrics.length;i++){
		if(metrics[i]['metric_type']==="ARR"){
			ARR=metrics[i]['metric_value'];
		}
		else if(metrics[i]['metric_type']==="CCR"){
			CCR = metrics[i]['metric_value'];
		}
		else if(metrics[i]['metric_type']==="LTV"){
			LTV = metrics[i]['metric_value'];
		}
		else if(metrics[i]['metric_type']==="CAC"){
			CAC = metrics[i]['metric_value'];
		}
		else if(metrics[i]['metric_type']==="ARPA"){
			ARPA = metrics[i]['metric_value'];
		}
		else if(metrics[i]['metric_type']==="RCC"){
			RCC = metrics[i]['metric_value'];
		}
		
	}

	return (
		<div className={hoverbg ? "listing ishover" : "listing"} onMouseOver={handleMouseInBg} onMouseLeave={handleMouseOutBg}>
			<div className="listingheader-wrapper">

				<div class={hasCheckbox ? "listingheadergrid hascheckbox" : "listingheadergrid"}>

					{hasCheckbox && <div className="actiondiv">
						<input className='checkbox' type="checkbox" />
					</div>}
					{isCompany ? <>
						<div id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194db-5d4911ed" class="compcontainer">
							<div class="logo-wrapper">
								<img src="https://uploads-ssl.webflow.com/6223552248fd5d64304911ec/622788b6ed5b1301d589b856_ASAN.svg" loading="lazy" alt="" />
							</div>
						</div>
						<div id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194de-5d4911ed">
							<div class="ui-text black100">{filing['company_id']}</div>
							<h4 class="black15">{filing['company_id']}</h4>
						</div>
					</> :
						<>
							<div class="filingcontainer">
								<div class="ui-text issecondarybutton isfiling">{filing['form_type']}</div>
							</div>
							<div id="w-node-b6ad1064-49e9-79f3-df7a-f41125cb80fe-5d4911ed">
								<div class="ui-text black100">{filing['company_id']}</div>
								<h4 class="black15">{filing['company_id']}</h4>
							</div>
						</>
					}
				</div>

			</div>
			<div className="div-block-4">

				<h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e4-5d4911ed" className="iscolumn black50">{ARR?ARR:'-'}</h4>
				<h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e6-5d4911ed" className="iscolumn black50">{CCR?CCR:'-'}</h4>
				<h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194e8-5d4911ed" className="iscolumn green">{LTV?LTV:'-'}</h4>
				<h4 id="w-node-_5f9bbd68-5925-7f41-4e08-47c4097194ea-5d4911ed" className="iscolumn red">{CAC?CAC:'-'}</h4>
				<div onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} className="actions">
					<div className={hover ? "actioncontainer " : "actioncontainer hide"}>
						<IconButton style={{ backgroundColor: 'transparent' }} aria-label="delete">
							<BookmarkBorderIcon />
						</IconButton>
					</div>
					<div className={hover ? "actioncontainer " : "actioncontainer hide"}>
						<IconButton style={{ backgroundColor: 'transparent' }} aria-label="delete">
							<BookmarkBorderIcon />
						</IconButton>
					</div>
					<div className={hover ? "actioncontainer " : "actioncontainer hide"}>
						<IconButton style={{ backgroundColor: 'transparent' }} aria-label="delete">
							<BookmarkBorderIcon />
						</IconButton>
					</div>
					<div className={!hover ? "actioncontainer " : "actioncontainer hide"}>

						<MoreVertIcon />

					</div>
				</div>
			</div>
		</div>)
}

const Table = (props) => {
	const [hasCheckbox, setHasCheckbox] = useState(props.hasCheckbox);
	const [isCompany, setIsCompany] = useState(props.isCompany);
	const data = props.data;
	const dispatch = useDispatch();
	// console.log("Data", data);

	const [hover, setHover] = useState(false);
	const [hoverbg, setHoverbg] = useState(false);

	const handleMouseIn = () => {
		setHover(true);
		console.log("enter")
	};

	const handleMouseOut = () => {
		setHover(false);
		console.log("false")
	};

	const handleMouseInBg = () => {
		setHoverbg(true);
	};
	const handleMouseOutBg = () => {
		setHoverbg(false);
	};

	const getMetricsFromFilingAPI = async (id) =>{
		const response = await getMetricsFromFiling(id, dispatch);

		return response;
	};

	return (
		<div id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f379-5d4911ed" className="metrics widthfull">
			<div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>

			<div class="metric-entry istable">
				<h4>{isCompany?'Ticker':'Filing Ticker'}</h4>
				<div class="div-block-4">
					<h4 id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f37e-5d4911ed" class="iscolumn">ARR</h4>
					<h4 id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f380-5d4911ed" class="iscolumn">CCR</h4>
					<h4 id="w-node-_06af9ce0-e762-bd28-f8f4-da23828e9c33-5d4911ed" class="iscolumn">LTV</h4>
					<h4 id="w-node-cb07bc53-cdcb-0899-354b-99a0f44924bb-5d4911ed" class="iscolumn">CAC</h4>
					<h4 id="w-node-_0a377e6d-9df9-25b2-2352-cfe26081a062-5d4911ed" class="iscolumn isaction">Actions</h4>
				</div>
			</div>


			<div className="separator"></div>
			{data.map((filing, i) => {
				return (
					<Row_custom filing={filing} />
				);
			})}

		</div>
	)
}

export default Table;
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";

import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './table.scss';
import { getMetricsFromFiling, getKeyMetricOfCompany} from '../../actions/action';
import RecentFilingRow from "./RecentFilingRow.jsx";
import CompanyRow from "./CompanyRow.jsx"

const Table = (props) => {
	const [hasCheckbox, setHasCheckbox] = useState(props.hasCheckbox);
	const [isCompany, setIsCompany] = useState(props.isCompany);
	const data = props.data || [];
	console.log("Data from Table for search filings:", data);
	const dispatch = useDispatch();
	// console.log("Props", props);
	const fromSearch = props.fromSearch;

	const [hover, setHover] = useState(false);
	const [hoverbg, setHoverbg] = useState(false);
	console.log("Le tera Data",data)
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

	const getMetricsFromFilingAPI = async (id) => {
		const response = await getMetricsFromFiling(id, dispatch);

		return response;
	};

	return (
		<div id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f379-5d4911ed" className="metrics widthfull">
			<div id="w-node-_2c6e5316-4ef7-fb3c-7fc6-16076e37e42b-5d4911ed" className="separator"></div>

			<div class="metric-entry istable">
				<h4>{isCompany ? 'Ticker' : 'Filing Ticker'}</h4>
				{isCompany ?
					<div class="div-block-4">
						<h4 id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f37e-5d4911ed" class="iscolumn">ARR</h4>
						<h4 id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f380-5d4911ed" class="iscolumn">CCR</h4>
						<h4 id="w-node-_06af9ce0-e762-bd28-f8f4-da23828e9c33-5d4911ed" class="iscolumn">LTV</h4>
						<h4 id="w-node-cb07bc53-cdcb-0899-354b-99a0f44924bb-5d4911ed" class="iscolumn">CAC</h4>
						<h4 id="w-node-_0a377e6d-9df9-25b2-2352-cfe26081a062-5d4911ed" class="iscolumn isaction">Actions</h4>
					</div>
					:
					<div class="div-block-4">
						<h4 id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f37e-5d4911ed" class="iscolumn">Company</h4>
						<h4 id="w-node-_436487ff-0a8b-05ed-b67d-aafecf95f380-5d4911ed" class="iscolumn">Date</h4>
						<h4 id="w-node-_0a377e6d-9df9-25b2-2352-cfe26081a062-5d4911ed" class="iscolumn isaction">Actions</h4>
					</div>
				}

			</div>


			<div className="separator"></div>
			{isCompany==false&&data!=[]&&data.map((filing, i) => {
				return (
					<RecentFilingRow filing={filing} hasCheckbox={false}/>
				);
			})}
			{isCompany==true&&fromSearch==false&&data.map((filing, i) => {
				return (
					<CompanyRow filing={filing} hasCheckbox={false} fromSearch={false}/>
				);
			})}
			{isCompany==true&&fromSearch==true&&
			<CompanyRow filing={data} hasCheckbox={false} fromSearch={true}/>}
		</div>
	)
}

export default Table;
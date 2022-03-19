import React from 'react'
import './data.scss'
import { useState } from 'react';
import vector1 from '../../images/nav/Market.svg';
//componenets
import PerformerCard from '../../Components/Widgets/PerformerCard'
import ViewedCard from '../../Components/Widgets/ViewedCard';
import Table from '../../Components/Widgets/Table';
import { connect } from 'react-redux';
import RecentlyViewedLogIn from '../../Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn';

const Data = (props) => {
	const [selected, setSelected] = useState(1);
	// const [hasCheckbox, setHasCheckbox] = useState(false);
	// const [isCompany, setIsCompany] = useState(false);
	// console.log("State from data:", props);
	console.log("Props State:", props.state);
	const recentFilings = props.state.recentFilings;
	// const bookmarkedCompanies = props.state.bookmarkedCompanies;
	const allCompanies = props.state.allCompanies;
	// const [data, setData] = useState(recentFilings);
	// let data=recentFilings;


	const handleTable = (selectedTemp)=>{
		setSelected(selectedTemp);
	}
	const handleClick = (selectedTemp)=>{
		console.log("Hello")
	}
	return (
		<div className='landingdata'>
			<div className='top'>
				<img src={vector1} alt="" />
				<h3>The Market</h3>
			</div>
			<div className='body'>
				<div className='cardsec'>
					{/* <PerformerCard /> */}
					<RecentlyViewedLogIn />
				</div>
				<div className='tablesec'>
					<div className="table_top">
						<button className={selected === 1 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(1); }}>All Companies</button>
						<button className={selected === 2 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(2); }}>Recent Filings</button>
					</div>
					{selected===1&&
					// <Table data={allCompanies} hasCheckbox={false} isCompany={true} fromSearch={false}
					<Table
						data={allCompanies.data}
						hasCheckbox={false}
						isCompany={true}
						fromSearch={true}
					/>
					}
					{selected===2&&
					<Table data={recentFilings} hasCheckbox={false} isCompany={false} fromSearch={false}/>
					}
				</div>
			</div>
		</div>
	)
}

// export default Data;
const mapStateToProps = (state) => {
	// console.log("State:", state);
	return {
		// To get the list of employee details from store
		state: state,
		bookmarkedCompanies: state.bookmarkedCompanies
	};
};

export default connect(mapStateToProps, null)(Data);

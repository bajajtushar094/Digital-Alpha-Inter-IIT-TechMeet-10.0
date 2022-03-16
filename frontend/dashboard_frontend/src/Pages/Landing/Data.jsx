import React from 'react'
import './data.scss'
import { useState } from 'react';
import vector1 from '../../images/nav/Market.svg';
//componenets
import PerformerCard from '../../Components/Widgets/PerformerCard'
import ViewedCard from '../../Components/Widgets/ViewedCard';
import Table from '../../Components/Widgets/Table';
import { connect } from 'react-redux';

const Data = (props) => {
	const [selected, setSelected] = useState(1);
	const [hasCheckbox, setHasCheckbox] = useState(false);
	const [isCompany, setIsCompany] = useState(false);
	// console.log("State from data:", props);
	const recentFilings = props.state.recentFilings;
	const bookmarkedCompanies = props.state.bookmarkedCompanies;
	const allCompanies = props.state.allCompanies;
	const [data, setData] = useState(recentFilings);
	// let data=recentFilings;


	const handleTable = (selectedTemp)=>{
		setSelected(selectedTemp);
		console.log("Selected:", typeof selected);
		if (selected == 1) {
			setData(recentFilings);
			console.log("Data to table:", data);
			setHasCheckbox(false);
			setIsCompany(false);
		}
		else if (selected == 2) {
			setData(bookmarkedCompanies);
			setHasCheckbox(false);
			setIsCompany(true);
		}
		else if(selected == 3) {
			setData(allCompanies);
			setHasCheckbox(false);
			setIsCompany(true);
		}

		return 0;
	}

	return (
		<div className='landingdata'>
			<div className='top'>
				<img src={vector1} alt="" />
				<h3>The Market</h3>
			</div>
			<div className='body'>
				<div className='cardsec'>
					<PerformerCard />
					<ViewedCard />
				</div>
				<div className='tablesec'>
					<div className="table_top">
						<button className={selected === 1 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(1); }}>Recent fillings</button>
						<button className={selected === 2 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(2); }}>Bookmarked</button>
						<button className={selected === 3 ? 'btn-link active' : 'btn-link'} onClick={() => { handleTable(3); }}>All Companies</button>
					</div>
					{<Table data={data} hasCheckbox={hasCheckbox} isCompany={isCompany} />}
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

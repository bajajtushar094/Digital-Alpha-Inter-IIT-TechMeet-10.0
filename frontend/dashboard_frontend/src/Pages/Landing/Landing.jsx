import React,{ useState, useEffect } from "react";
import "./landing.scss";
//components
import Navbar from "../../Components/Global/Navbar/Navbar";
import Hero from "./Hero";
import Data from "./Data";
import {getRecentFilings, getAllCompanies} from "../../actions/action"; 
import {useDispatch} from "react-redux";
import {turnOn, turnOff} from "../../constants/spinnerActions";
import store from "../../store";
import { connect } from 'react-redux';

const Landing = (props) => {
	const dispatch = useDispatch();

	useEffect(async () => {
		const fetchRecentFilings = async () => { 
			try{
				const response = await getRecentFilings(dispatch);	
			}
			catch(err){
				console.log("Error:", err);
			}
		};

		const fetchAllCompanies = async () => {
			try{
				const response = await getAllCompanies(dispatch);
			}
			catch(err){
				console.log("Error:", err);
			}
		};
		
		fetchRecentFilings();
		fetchAllCompanies();
	  }, []);

	return (
		<div className="landing">
			<Navbar />
			<Hero />
			<Data />
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log("State:", state);
    return {
        // To get the list of employee details from store
        state: state
    };
};

export default connect(mapStateToProps, null)(Landing);

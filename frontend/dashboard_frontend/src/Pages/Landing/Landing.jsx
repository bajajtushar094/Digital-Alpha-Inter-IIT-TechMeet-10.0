import React,{ useState, useEffect } from "react";
import "./landing.scss";
//components
import Navbar from "../../Components/Global/Navbar/Navbar";
import Hero from "./Hero";
import Data from "./Data";
import {getRecentFilings, loginUser} from "../../actions/action"; 
import {useDispatch} from "react-redux";
import {turnOn, turnOff} from "../../constants/spinnerActions";
import store from "../../store";
import { connect } from 'react-redux';
import {config} from "../../config";

const Landing = (props) => {
	const dispatch = useDispatch();

	const fetchRecentFilings = async () => { 
		const response = await getRecentFilings(dispatch);
		console.log("Response:", response);
	};

	useEffect(async () => {
		console.log("Data:", props.recentFilings);
		const response = await fetchRecentFilings();
		console.log("response:", response);

		const data = await loginUser({email:config().email, password:config().password}, dispatch);
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
        recentFilings: state.user
    };
};

export default connect(mapStateToProps, null)(Landing);

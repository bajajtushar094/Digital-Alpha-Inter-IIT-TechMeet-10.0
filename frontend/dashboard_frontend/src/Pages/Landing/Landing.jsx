import React,{ useState, useEffect } from "react";
import "./landing.scss";
//components
import Navbar from "../../Components/Global/Navbar/Navbar";
import Hero from "./Hero";
import Data from "./Data";
import {getRecentFilings} from "../../actions/action"; 
import {useDispatch} from "react-redux";
import {turnOn, turnOff} from "../../constants/spinnerActions";

const Landing = () => {
	const dispatch = useDispatch();

	const fetchRecentFilings = async () => { 

		dispatch(turnOn());
		const response = await getRecentFilings();
		dispatch(turnOff());
		console.log("Response:", response);
	};

	useEffect(async ()=>{
		await fetchRecentFilings();
	})

	return (
		<div className="landing">
			<Navbar />
			<Hero />
			<Data />
		</div>
	);
};

export default Landing;

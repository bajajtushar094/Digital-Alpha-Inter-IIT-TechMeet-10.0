/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./landing.scss";
//components
import Navbar from "../../Components/Global/Navbar/Navbar";
import Hero from "./Hero";
import Data from "./Data";
import {
  getRecentFilings,
  getAllCompanies,
  loginUser,
  getBookmarkCompanies,
  searchFillings,
} from "../../actions/action";
import { useDispatch } from "react-redux";
import { turnOn, turnOff } from "../../constants/spinnerActions";
import store from "../../store";
import { connect } from "react-redux";
import { config } from "../../config";
import DataSec from "./DataSec";
import {LOCAL_SERVER_URL} from '../../config'
import axios from 'axios';

const Landing = (props) => {
  const dispatch = useDispatch();
  const user = props.state.user;
  console.log("State:", props.state);

  useEffect(async () => {
    // const fetchRecentFilings = async () => {
    //   try {

    //     const response = await getRecentFilings(dispatch);

    //     console.log("line 33 landing page ", response);
    //   } catch (err) {
    //     console.log("Error:", err);
    //   }
    // };

    const fetchRecentFilings = async () => {
      console.log("Dasdhkjasdhals")
      const data_byFilings = await axios.post(`${config().search}/filings` , {
        "isAll": true
      });
      const data = data_byFilings.data;
      console.log("data_byFilings:" , data_byFilings);
       dispatch({
         type: "GET_RECENT_FILINGS",
         recentFilings: data.data,
       });

    }

    // const fetchAllCompanies = async () => {
    //   try {
        // const response = await getAllCompanies(dispatch);
      // } catch (err) {
    //     console.log("Error:", err);
    //   }
    // };
    const fetchAllCompanies = async () => {
      try {
        const response = await axios.post(LOCAL_SERVER_URL + 'company/metric/all', {
          isAll: true
        })
        
            dispatch({
                type: 'GET_ALL_COMPANIES',
                allCompanies: response.data
            });
            data = response.data
      }
      catch(err) {
        console.log(err)
      }
    }

    const getBookmarkCompaniesAPI = async () => {
      try {
        const response = await getBookmarkCompanies(user.user_id, dispatch);
        // console.log("Response:", typeof user.user_id);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchRecentFilings();
    fetchAllCompanies();
    getBookmarkCompaniesAPI();
    const data = await loginUser(
      { email: config().email, password: config().password },
      dispatch
    );
  }, []);

  return (
    <div className='landing'>
      <Navbar />
      <Hero />
      <Data />
      {/* <DataSec /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(Landing);

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "../../../../global.scss";
import "./timeframe.scss";
import Calendar from "../../../../images/widgets/Calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";

const TimeFrame = ({state}) => {

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const dispatch = useDispatch()
  const queryFilings = state.queryFilings;

	useEffect(() => {
    const NewqueryFilings = {
      ...queryFilings,
      time_start: `${selectedStartDate.getFullYear()}-${
        selectedStartDate.getMonth() + 1
      }-${selectedStartDate.getDate()}`,
      time_end: `${selectedEndDate.getFullYear()}-${
        selectedEndDate.getMonth() + 1
      }-${selectedEndDate.getDate()}`,
    };
    dispatch({
      type: "UPDATE_QUERY_FILINGS",
      queryFilings: NewqueryFilings,
    })
	}, [selectedEndDate, selectedStartDate]);
  return (
    <div
      id='w-node-_6a908ad0-02ce-84fb-5195-d4c0f43f65e9-5d4911ed'
      className='filter-timeframe'
    >
      <div className='ui-text black100'>Timeframe</div>
      <div
        id='w-node-_41cc1a62-f60f-c68b-ea37-f0b418e4c9f4-5d4911ed'
        className='filter-ticker'
      >
        <div
          id='w-node-ec0d4782-ae1d-f1c1-9d9a-feb852a07851-5d4911ed'
          className='div-block-13'
        >
          <h4
            id='w-node-_4a412ca3-f5ce-763d-829c-a0e5771ee42d-5d4911ed'
            className='black50'
          >
            From
          </h4>
        </div>
        <div className='tickersearch'>
          <div className='tickerinput'>
            <DatePicker
              selected={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date)}
              value={selectedStartDate}
              className='black-50'
            />
          </div>
          <a href='#' className='w-inline-block'>
            <div className='div-block-12'>
              <img src={Calendar} loading='lazy' alt='' />
            </div>
          </a>
        </div>
      </div>
      <div
        id='w-node-c071388f-cb3a-5bab-8d80-adf879c84f67-5d4911ed'
        className='filter-ticker'
      >
        <div
          id='w-node-_5800b8ef-4631-a1f8-ce8e-aed70a5571c0-5d4911ed'
          className='div-block-13'
        >
          <h4
            id='w-node-_5800b8ef-4631-a1f8-ce8e-aed70a5571c1-5d4911ed'
            className='black50'
          >
            To
          </h4>
        </div>
        <div className='tickersearch'>
          <div className='tickerinput'>
            <DatePicker
              selected={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date)}
              value={selectedEndDate}
              wrapperClassName='datePicker'
              className='black-50'
            />
          </div>
          <div href='#' className='w-inline-block'>
            <div className='div-block-12'>
              <img src={Calendar} loading='lazy' alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TimeFrame;

const mapStateToProps = (state) => {
  // console.log("State:", state);
  return {
    // To get the list of employee details from store
    state: state,
  };
};

export default connect(mapStateToProps, null)(TimeFrame);
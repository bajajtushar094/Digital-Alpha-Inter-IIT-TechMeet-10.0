import React, {useState} from "react";
import '../../../../global.scss';
import './timeframe.scss';
import Calendar from "../../../../images/widgets/Calendar.svg";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TimeFrame = () => {
    return (
        <div id="w-node-_6a908ad0-02ce-84fb-5195-d4c0f43f65e9-5d4911ed" className="filter-timeframe">
            <div className="ui-text black100">Timeframe</div>
            <div id="w-node-_41cc1a62-f60f-c68b-ea37-f0b418e4c9f4-5d4911ed" className="filter-ticker">
                <div id="w-node-ec0d4782-ae1d-f1c1-9d9a-feb852a07851-5d4911ed" className="div-block-13">
                    <h4 id="w-node-_4a412ca3-f5ce-763d-829c-a0e5771ee42d-5d4911ed" className="black50">From</h4>
                </div>
                <div className="tickersearch">
                    <div className="tickerinput">
                        <DatePicker selected={new Date()} className="black-50"/>
                    </div>
                    <a href="#" className="w-inline-block">
                        <div className="div-block-12"><img src={Calendar} loading="lazy" alt="" /></div>
                    </a>
                </div>
            </div>
            <div id="w-node-c071388f-cb3a-5bab-8d80-adf879c84f67-5d4911ed" className="filter-ticker">
                <div id="w-node-_5800b8ef-4631-a1f8-ce8e-aed70a5571c0-5d4911ed" className="div-block-13">
                    <h4 id="w-node-_5800b8ef-4631-a1f8-ce8e-aed70a5571c1-5d4911ed" className="black50">To</h4>
                </div>
                <div className="tickersearch">
                    <div className="tickerinput">
                        <h4 className="black50">27 MAR’20</h4>
                    </div>
                    <a href="#" className="w-inline-block">
                        <div className="div-block-12"><img src={Calendar} loading="lazy" alt="" /></div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TimeFrame;
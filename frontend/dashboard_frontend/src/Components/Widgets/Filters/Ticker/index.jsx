import React, { useEffect, useRef, useState } from "react";
import '../../../../global.scss';
import './ticker.scss';
import tickerSearchEnter from "../../../../images/widgets/Tickersearchenter.svg";
import { connect, useDispatch } from "react-redux";

const Ticker = ({ state }) => {
	const [newTicker, setNewTicker] = useState("");
	const newTickerReference = useRef();
	const tickers = state.queryFilings.tickers;
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("TickerPage", newTicker, tickers)

		if(newTicker!=="" && !tickers.includes(newTicker)){
			dispatch({
				type: "UPDATE_QUERY_FILINGS",
				queryFilings: {
					...state.queryFilings,
					tickers: [...tickers, newTicker],
				}
			})
		}

	}, [newTicker]);
	return (
		<div id="w-node-_81d8dbc1-a99d-2a58-a2e6-ec975f1b0dc3-5d4911ed" className="filter-ticker">
			<div className="ui-text black100">Ticker</div>
			<div className="tickersearch">
				<div className="tickerinput">
					<input type="text" className="black50" ref={newTickerReference} onKeyDown={(e) => {
						if(e.key === 'Enter'){
							e.preventDefault();
							setNewTicker(null);
							console.log("ticker: ", newTicker);
							if (
								newTickerReference.current.value &&
								newTickerReference.current.value.length > 0
							) {
								setNewTicker(newTickerReference.current.value);
							}
							newTickerReference.current.value = "";
						}
					}} />
				</div>
				<a href="/#" className="w-inline-block">
					<button style={{ background: "transparent", padding: "0px", margin: "0px" }}
						onClick={(e) => {
							e.preventDefault();
							setNewTicker(null);
							console.log("ticker: ", newTicker);
							if (
								newTickerReference.current.value &&
								newTickerReference.current.value.length > 0
							) {
								setNewTicker(newTickerReference.current.value);
							}
							newTickerReference.current.value = "";
						}}>
						<div className="div-block-12"><img src={tickerSearchEnter} loading="lazy" alt="" /></div></button>
				</a>
			</div>
		</div>
	);
}

// export default Ticker;

const mapStateToProps = (state) => {
	// console.log("State:", state);
	return {
		// To get the list of employee details from store
		state: state,
	};
};

export default connect(mapStateToProps, null)(Ticker);
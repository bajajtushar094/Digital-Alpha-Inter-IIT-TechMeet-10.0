import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Landing from "./Pages/Landing/Landing";
import Search from "./Pages/Search";
import IndividualBasket from "./Pages/IndividualBasket";
import BasketList from "./Pages/BasketList";
import Company from "./Pages/Company";
import { connect } from 'react-redux';
import { getRecentFilings } from "./actions/action";

const mapDispatchToProps = dispatch => ({
	getRecentFilings: () => dispatch(getRecentFilings())
})

/* 
 * mapStateToProps
*/
const mapStateToProps = state => ({
	...state
})

getRecentFilings = (event)=>{
	this.props.getRecentFilings();
}


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Landing />} />
					</Route>
					<Route path="/search">
						<Route index element={<Search />} />
					</Route>
					<Route path="/individualBasket">
						<Route index element={<IndividualBasket />} />
					</Route>
					<Route path='/basketList'>
						<Route index element={<BasketList />} />
					</Route>
					<Route path='/company'>
						<Route index element={<Company />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Landing from "./Pages/Landing/Landing";
import Search from "./Pages/Search";
import IndividualBasket from "./Pages/IndividualBasket";
import BasketList from "./Pages/BasketList";
import Company from "./Pages/Company";
import Chart from "./Components/Widgets/Chart/Chart";
import File from "./Pages/Files/file";
import { connect } from 'react-redux';
import { getRecentFilings, loginUser } from "./actions/action";
import { useEffect } from "react";
import RecentlyViewed from "./Pages/RecentlyViewed";
import Filenew from "./Pages/Filenew/Filenew";
import CompanyTitle from "./Components/Widgets/Filters/CompanyTitle/CompanyTitle";
import test from "./Pages/test";
import RecentlyViewedLogIn from "./Components/Widgets/RecentlyViewedLogIn/RecentlyViewedLogIn";
import Error404 from "./Pages/Error404";


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Landing />} />
					</Route>
					<Route path="/search/:query">
						<Route index element={<Search />} />
					</Route>
					<Route path="/individualBasket/:basket_id">
						<Route index element={<IndividualBasket />} />
					</Route>
					<Route path='/basketList'>
						<Route index element={<BasketList/>}/>
					</Route>
					<Route path='/company/:ticker'>
						<Route index element={<Company/>}/>
					</Route>
					<Route path='/recentlyviewed'>
						<Route index element={<RecentlyViewed/>}/>
					</Route>
					<Route path='/test'>
						<Route index element={<RecentlyViewedLogIn />}/>
					</Route>
					<Route path='/file'>
						<Route index element={<Filenew/>}/>
					</Route>
					<Route path="/*" element={<Error404 />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}


export default App;
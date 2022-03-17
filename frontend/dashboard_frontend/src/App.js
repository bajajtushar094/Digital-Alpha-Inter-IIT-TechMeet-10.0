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
import Aman from "./Pages/Aman/aman";




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
					<Route path="/aman/:query">
						<Route index element={<Aman />} />
					</Route>
					<Route path="/individualBasket/:basket_id">
						<Route index element={<IndividualBasket />} />
					</Route>
					<Route path='/basketList'>
						<Route index element={<BasketList/>}/>
					</Route>
					<Route path='/recentlyviewed'>
						<Route index element={<RecentlyViewed/>}/>
					</Route>
					<Route path='/company'>
						<Route index element={<Company/>}/>
					</Route>
					<Route path='/test'>
						<Route index element={<Chart/>}/>
					</Route>
					<Route path='/file'>
						<Route index element={<File/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}


export default App;
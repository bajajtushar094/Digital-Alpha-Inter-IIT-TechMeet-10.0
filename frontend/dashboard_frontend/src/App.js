import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Landing from "./Pages/Landing/Landing";
import Search from "./Pages/Search";
import IndividualBasket from "./Pages/IndividualBasket";
import BasketList from "./Pages/BasketList";
<<<<<<< HEAD
import Company from "./Pages/Company";

=======
>>>>>>> 19b2e26cd3763d1af57233b8e16bfa3402654453

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
						<Route index element={<BasketList/>}/>
					</Route>
<<<<<<< HEAD
					<Route path='/company'>
						<Route index element={<Company/>}/>
					</Route>
=======
>>>>>>> 19b2e26cd3763d1af57233b8e16bfa3402654453
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

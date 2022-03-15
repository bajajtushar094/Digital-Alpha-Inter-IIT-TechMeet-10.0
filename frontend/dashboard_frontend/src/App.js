import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Landing from "./Pages/Landing/Landing";
import Search from "./Pages/Search";
import IndividualBasket from "./Pages/IndividualBasket";
<<<<<<< HEAD
import BasketList from "./Pages/BasketList";
import Company from "./Pages/Company";
import Chart from "./Components/Widgets/Chart/Chart";


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
					<Route path='/company'>
						<Route index element={<Company/>}/>
					</Route>
					<Route path='/test'>
						<Route index element={<Chart/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
=======

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
      </Routes>
      </BrowserRouter>
    </div>
  );
>>>>>>> 6d88778f8eb0c9e55587f218282477714e94088a
}

export default App;

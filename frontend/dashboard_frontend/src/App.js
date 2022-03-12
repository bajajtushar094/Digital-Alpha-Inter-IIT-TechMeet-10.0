import {BrowserRouter,Routes,Route} from "react-router-dom";

//pages
import Landing from "./Pages/Landing/Landing";
import Search from "./Pages/Search";
import IndividualBasket from "./Pages/IndividualBasket";

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
}

export default App;

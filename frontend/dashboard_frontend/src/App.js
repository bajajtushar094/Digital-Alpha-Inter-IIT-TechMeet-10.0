import {BrowserRouter,Routes,Route} from "react-router-dom";

//pages
import Landing from "./Pages/Landing/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/">
           <Route index element={<Landing />} />
      </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

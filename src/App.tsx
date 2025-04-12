import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home/Home";
import ViewFlight from "./views/flight/ViewFlight";
import EditFlight from "./views/flight/EditFlight";

import PageNotFound from "./views/pageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/flight/view/:flight"} element={<ViewFlight />} />
        <Route path={"/flight/edit/:flight"} element={<EditFlight />} />

        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

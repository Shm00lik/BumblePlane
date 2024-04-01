import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home/Home";
import Flight from "./views/flight/ViewFlight";
import PageNotFound from "./views/pageNotFound/PageNotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/flight/:flight"} element={<Flight />} />
                <Route path={"*"} element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './home/Home'
import Flight from "./flight/Flight";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={"/"}
                    element={<Home />}
                />
                <Route 
                    path={"/flight/:flight"}
                    element={<Flight />}
                />
            </Routes>
        </BrowserRouter>
    );
}


export default App

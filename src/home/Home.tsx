import { Input, Select } from "antd";
import "./home.scss";
import { useEffect, useState } from "react";

const Home = () => {
    const [flight, setFlight] = useState();

    useEffect(() => {
        console.log(flight);
    }, [flight]);

    return (
        <div className="Home">
            <Input title="Name" onChange={(value) => localStorage.setItem("name", value.target.value)}/>

            <Select
                showSearch
                onChange={(value) => setFlight(value)}
                style={{ width: "100%" }}
                options={[{ value: "TLV-PARIS", label: "TLV-PARIS" }, { value: "PARIS-HOUSTON", label: "PARIS-HOUSTON" }]}
            />
        </div>
    );
}

export default Home;
import { EditOutlined, EyeOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input, Select, message } from "antd";
import { useState } from "react";
import "./Home.scss";

const Home = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [flight, setFlight] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleContinue = () => {
    if (!name || !flight || !mode) {
      messageApi.error("Please complete all fields ✈️");
      return;
    }

    window.location.href = `/flight/${mode}/${flight}`;
  };

  return (
    <div className="Home">
      <div className="sky">
        <span className="animated_plane">✈️</span>
      </div>

      <div className="header">
        <h1>✈️ BumblePlane ✈️</h1>
        <p>Find your seat & friends</p>
      </div>

      <div className="card">
        <div className="field">
          <label>Your Name</label>
          <Input
            value={name}
            placeholder="Enter your name"
            onChange={(e) => {
              localStorage.setItem("name", e.target.value);
              setName(e.target.value);
            }}
          />
        </div>

        <div className="field">
          <label>Flight</label>
          <Select
            placeholder="Select flight"
            value={flight || undefined}
            onChange={setFlight}
            options={[
              { value: "TLV-EWR-LY025", label: "TLV → New York(EWR) - LY025" },
              { value: "TLV-JFK-LY001", label: "TLV → New York(JFK) - LY001" },
              { value: "LGA-IAH-DL2109", label: "New York → Houston - DL2109" },
              { value: "IAH-LGA-DL2099", label: "Houston → New York - DL2099" },
              { value: "IAH-LGA-DL2140", label: "Houston → New York - DL2140" },
              { value: "EWR-TLV-LY026", label: "New York(EWR) → TLV - LY026" },
              { value: "JFK-TLV-LY008", label: "New York(JFK) → TLV - LY008" },
            ]}
          />
        </div>

        <div className="field">
          <label>Mode</label>

          <div className="segmented">
            <button
              className={mode === "view" ? "active" : ""}
              onClick={() => setMode("view")}
            >
              <EyeOutlined /> View
            </button>

            <button
              className={mode === "edit" ? "active" : ""}
              onClick={() => setMode("edit")}
            >
              <EditOutlined /> Edit
            </button>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
          className="cta"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>

      {contextHolder}
    </div>
  );
};

export default Home;

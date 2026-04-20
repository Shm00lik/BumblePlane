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
      messageApi.error("Fill everything first 🙂");
      return;
    }

    window.location.href = `/flight/${mode}/${flight}`;
  };

  return (
    <div className="Home">
      {/* ✈️ Header */}
      <div className="header">
        <h1>✈️ Seat Planner</h1>
        <p>Find your friends on the plane</p>
      </div>

      {/* 🎫 Card */}
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
          <label>Select Flight</label>
          <Select
            placeholder="Choose your flight"
            onChange={setFlight}
            options={[
              { value: "TLV-EWR-LY025", label: "TLV → EWR (LY025)" },
              { value: "TLV-JFK-LY001", label: "TLV → JFK (LY001)" },
              { value: "LGA-IAH-DL2109", label: "NY → Houston" },
              { value: "IAH-LGA-DL2099", label: "Houston → NY" },
              { value: "EWR-TLV-LY026", label: "EWR → TLV" },
              { value: "JFK-TLV-LY008", label: "JFK → TLV" },
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
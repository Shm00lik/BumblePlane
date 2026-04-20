import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import LoadingGif from "/loadingSmall.gif";
import "./Home.scss";

const Home = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [flight, setFlight] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLoad = () => {
    if (name && flight && mode) {
      setLoad(true);
      setTimeout(() => {
        window.location.href = `/flight/${mode}/${flight}`;
      }, 1500);
    } else {
      messageApi.error("Fill everything first 🙂");
    }
  };

  return (
    <div className="Home">
      <h1>✈️ Seat Planner</h1>
      <p className="subtitle">Find your friends on the plane</p>

      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => {
          localStorage.setItem("name", e.target.value);
          setName(e.target.value);
        }}
      />

      <Select
        placeholder="בחר טיסה / Select flight"
        onChange={setFlight}
        options={[
          { value: "TLV-EWR-LY025", label: "TLV → NEW YORK (EWR)" },
          { value: "TLV-JFK-LY001", label: "TLV → NEW YORK (JFK)" },
          { value: "LGA-IAH-DL2109", label: "NEW YORK → HOUSTON" },
          { value: "IAH-LGA-DL2099", label: "HOUSTON → NEW YORK" },
          { value: "IAH-LGA-DL2140", label: "HOUSTON → NEW YORK" },
          { value: "EWR-TLV-LY026", label: "NEW YORK → TLV" },
          { value: "JFK-TLV-LY008", label: "NEW YORK → TLV" },
        ]}
      />

      <div className="modeButtons">
        <Button
          icon={<EyeOutlined />}
          type={mode === "view" ? "primary" : "default"}
          onClick={() => setMode("view")}
          block
        >
          View Seats
        </Button>

        <Button
          icon={<EditOutlined />}
          type={mode === "edit" ? "primary" : "default"}
          onClick={() => setMode("edit")}
          block
        >
          Pick My Seat
        </Button>
      </div>

      <Button className="goButton" size="large" onClick={handleLoad}>
        Continue →
      </Button>

      <Modal open={load} footer={null} closable={false} centered>
        <div className="loadingModal">
          <h2>{mode === "edit" ? "Saving seat..." : "Loading seats..."}</h2>
          <Image src={LoadingGif} preview={false} />
        </div>
      </Modal>

      {contextHolder}
    </div>
  );
};

export default Home;
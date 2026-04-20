import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Image, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import LoadingGif from "/loadingSmall.gif";
import "./Home.scss";

const Home = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [flight, setFlight] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("name", e.target.value);
    setName(e.target.value);
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  const isAbleToContinue = () => {
    return name && flight && mode;
  };

  const handleLoad = () => {
    if (isAbleToContinue()) {
      setLoad(true);
      setTimeout(
        () => {
          window.location.href = `/flight/${mode}/${flight}`;
        },
        Math.round(Math.random() * 3000) + 2000,
      );
    } else {
      error();
    }
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please fill in all fields",
    });
  };

  useEffect(() => {
    console.log(flight);
  }, [flight]);

  return (
    <div className="Home">
      <Input
        title="Name"
        onChange={handleNameChange}
        value={name}
        placeholder="Name"
      />
      <br />

      <Select
        placeholder={"Flight"}
        showSearch
        onChange={(value) => setFlight(value)}
        style={{ width: "100%" }}
        options={[
          { value: "TLV-EWR-LY025", label: "TLV → NEW YORK(EWR) - LY025" },
          { value: "TLV-JFK-LY001", label: "TLV → NEW YORK(JFK) - LY001" },
          { value: "LGA-IAH-DL2109", label: "NEW YORK → HOUSTON" },
          {
            value: "IAH-LGA-DL2099",
            label: "HOUSTON → NEW YORK(LGA) - DL2099",
          },
          {
            value: "IAH-LGA-DL2140",
            label: "HOUSTON → NEW YORK(LGA) - DL2140",
          },
          { value: "EWR-TLV-LY026", label: "NEW YORK(EWR) → TLV - LY026" },
          { value: "JFK-TLV-LY008", label: "NEW YORK(JFK) → TLV - LY008" },
        ]}
      />

      <h1>Select Mode:</h1>

      <div className="Buttons">
        <Button
          onClick={() => handleModeChange("view")}
          icon={<EyeOutlined />}
          type={mode == "view" ? "primary" : "default"}
        >
          View
        </Button>

        <Button
          onClick={() => handleModeChange("edit")}
          icon={<EditOutlined />}
          type={mode == "edit" ? "primary" : "default"}
        >
          Edit
        </Button>
      </div>

      <br />
      <br />
      <br />

      <Button size="large" onClick={handleLoad}>
        Let's GO
      </Button>

      <Modal
        open={load}
        footer={null}
        closable={false}
        centered
        style={{ textAlign: "center" }}
      >
        <h1>
          {mode == "edit" ? "Editing" : "Viewing"} {flight}
        </h1>

        <br></br>

        <Image src={LoadingGif} preview={false} />

        <h2>Connecting...</h2>
      </Modal>

      {contextHolder}
    </div>
  );
};

export default Home;

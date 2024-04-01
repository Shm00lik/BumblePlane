import { Button, Input, Modal, Select, Image, Alert, message } from "antd";
import "./Home.scss";
import { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import LoadingGif from "../../assets/loading.gif";

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
            setTimeout(() => {
                window.location.href = "/flight/" + flight;
            }, Math.round(Math.random() * 3000) + 2000);
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
            <h1>Your Name:</h1>
            <Input title="Name" onChange={handleNameChange} value={name} />

            <h1>Select Flight:</h1>

            <Select
                showSearch
                onChange={(value) => setFlight(value)}
                style={{ width: "100%" }}
                options={[
                    { value: "TLV-PARIS", label: "TLV → PARIS" },
                    { value: "PARIS-HOUSTON", label: "PARIS → HOUSTON" },
                    { value: "HOUSTON-PARIS", label: "HOUSTON → PARIS" },
                    { value: "PARIS-TLV", label: "PARIS → TLV" },
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

                <h2>Loading...</h2>
            </Modal>

            {contextHolder}
        </div>
    );
};

export default Home;

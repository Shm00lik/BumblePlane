import { Button, Flex, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditFlight.scss";
import db from "../../db";

const NUM_OF_ROWS: number = 50;
const LETTERS = ["A", "B", "C", "D", "E", "H", "J", "K", "L"];

const Flight = () => {
    const { flight } = useParams<string>();

    const [letter, setLetter] = useState<string>("");
    const [seat, setSeat] = useState<number | null>(1);

    const isSeatAcceptable = () => {
        return LETTERS.includes(letter) && seat !== null;
    };

    const updateSeat = async () => {
        if (!isSeatAcceptable()) {
            return;
        }

        await db
            .collection(flight || "")
            .add({
                seat: letter + seat,
                flight: flight,
                name: localStorage.getItem("name") || "",
            })
            .then(() => {
                window.location.href = "/";
            });
    };

    useEffect(() => {
        if (localStorage.getItem("name") == undefined) {
            window.location.href = "/";
        }
    }, []);

    return (
        <div className="Base">
            <h1>Fill Your Seat:</h1>

            <Flex justify={"center"} align={"center"}>
                <Select
                    placeholder={"Letter"}
                    showSearch
                    onChange={(value) => setLetter(value)}
                    style={{ width: "100%" }}
                    options={LETTERS.map((l) => {
                        return { value: l, label: l };
                    })}
                />

                <InputNumber
                    required
                    min={1}
                    max={NUM_OF_ROWS}
                    step={1}
                    defaultValue={1}
                    onChange={(value) => setSeat(value)}
                />
            </Flex>

            <br />
            <br />

            {isSeatAcceptable() && <h1>Your Seat: {letter + seat}</h1>}
            {isSeatAcceptable() && (
                <Button size="large" onClick={updateSeat}>
                    Let's GO
                </Button>
            )}
        </div>
    );
};

export default Flight;

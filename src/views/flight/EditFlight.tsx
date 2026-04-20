import { Button, Select, InputNumber } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./EditFlight.scss";
import db from "../../db";

const BIG = ["A", "B", "C", "", "D", "F", "G", "", "H", "J", "K"];
const SMALL = ["A", "B", "", "C", "D", "E"];

const EditFlight = () => {
  const { flight } = useParams();

  const [letter, setLetter] = useState("");
  const [seat, setSeat] = useState<number | null>(1);

  const letters = (flight?.includes("TLV") ? BIG : SMALL).filter(Boolean);

  const submit = async () => {
    await db.collection(flight || "").add({
      seat: letter + seat,
      flight,
      name: localStorage.getItem("name"),
    });

    window.location.href = "/";
  };

  return (
    <div className="EditFlight">
      <h1>בחר מושב ✈️</h1>

      <div className="picker">
        <Select
          placeholder="Letter"
          options={letters.map((l) => ({ value: l, label: l }))}
          onChange={setLetter}
        />

        <InputNumber min={1} max={65} value={seat} onChange={setSeat} />
      </div>

      {letter && seat && (
        <>
          <h2 className="preview">Seat: {letter + seat}</h2>
          <Button type="primary" size="large" block onClick={submit}>
            Save Seat
          </Button>
        </>
      )}
    </div>
  );
};

export default EditFlight;
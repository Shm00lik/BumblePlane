import { Button, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditFlight.scss";
import db from "../../db";

const BIG = ["A", "B", "C", "D", "F", "G", "H", "J", "K"];
const SMALL = ["A", "B", "C", "D", "E"];

const EditFlight = () => {
  const { flight } = useParams();

  const [letter, setLetter] = useState("");
  const [seat, setSeat] = useState<number | null>(1);

  const letters = (flight?.includes("TLV") ? BIG : SMALL);

  // ✈️ parse flight info
  const parts = (flight || "").split("-");
  const from = parts[0];
  const to = parts[1];
  const flightNumber = parts[2];

  const updateSeat = async () => {
    await db.collection(flight || "").add({
      seat: letter + seat,
      flight,
      name: localStorage.getItem("name") || "",
    });

    window.location.href = "/";
  };

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="BoardingPage">

      {/* ✈️ LEFT SIDE */}
      <div className="BoardingLeft">
        <div className="planeGraphic">✈️</div>

        <div className="route">
          <h2>FLIGHT</h2>

          <div className="routeRow">
            <div>
              <span className="airport">{from}</span>
              <p>FROM</p>
            </div>

            <div className="arrow">→</div>

            <div>
              <span className="airport">{to}</span>
              <p>TO</p>
            </div>
          </div>

          <div className="flightNumber">
            {flightNumber}
          </div>
        </div>
      </div>

      {/* 🎫 RIGHT SIDE */}
      <div className="BoardingRight">
        <h2>BOARDING PASS</h2>

        <div className="field">
          <label>Seat Letter</label>
          <Select
            placeholder="Letter"
            onChange={setLetter}
            options={letters.map((l) => ({
              value: l,
              label: l,
            }))}
          />
        </div>

        <div className="field">
          <label>Seat Number</label>
          <InputNumber
            min={1}
            max={65}
            onChange={(v) => setSeat(v)}
            value={seat}
          />
        </div>

        <div className="preview">
          {letter && seat && (
            <span>
              Seat: <b>{letter + seat}</b>
            </span>
          )}
        </div>

        {letter && seat && (
          <Button type="primary" size="large" block onClick={updateSeat}>
            Confirm Seat
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditFlight;
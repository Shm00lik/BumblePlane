import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cell from "../../components/Cell";
import "./ViewFlight.scss";
import db from "../../db";

const NUM_OF_ROWS = 65;

const BIG_LAYOUT = ["ABC", "DFG", "HJK"];
const SMALL_LAYOUT = ["AB", "CDE"];

const ViewFlight = () => {
  const { flight } = useParams();
  const [data, setData] = useState<{ [seat: string]: string }>({});
  const [mySeat, setMySeat] = useState<string | null>(null);

  const myName = localStorage.getItem("name");

  const layout = flight?.includes("TLV") ? BIG_LAYOUT : SMALL_LAYOUT;

  // 🔥 flatten layout into real seat order (NO AISLE CONNECTION)
  const seatOrder = layout.flatMap((block) => block.split(""));

  useEffect(() => {
    const fetch = async () => {
      const res = await db.collection(flight || "").get();

      let map: { [seat: string]: string } = {};
      let foundMySeat: string | null = null;

      res.forEach((d: any) => {
        map[d.seat] = d.name;

        if (d.name === myName) {
          foundMySeat = d.seat;
        }
      });

      setData(map);
      setMySeat(foundMySeat);

      // 🔥 AUTOSCROLL
      if (foundMySeat) {
        const el = document.getElementById(foundMySeat);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    fetch();
  }, []);

  const getSeatType = (seatId: string) => {
    if (!mySeat) return "";

    const myRow = parseInt(mySeat.slice(1));
    const myCol = mySeat[0];

    const row = parseInt(seatId.slice(1));
    const col = seatId[0];

    if (seatId === mySeat) return "me";

    const isNearbyRow = Math.abs(row - myRow) <= 1;

    // 🔥 FIXED COLUMN LOGIC
    const myIndex = seatOrder.indexOf(myCol);
    const colIndex = seatOrder.indexOf(col);

    const isNearbyCol = Math.abs(colIndex - myIndex) <= 1;

    if (isNearbyRow && isNearbyCol) return "near";

    return "";
  };

  const renderSeat = (letter: string, row: number) => {
    const seatId = `${letter}${row}`;
    const name = data[seatId];
    const type = getSeatType(seatId);

    return (
      <div
        id={seatId} // 🔥 needed for scroll
        className={`seat ${type}`}
        key={seatId}
      >
        <Cell name={name} />
        <span className="seatLabel">{letter}</span>
      </div>
    );
  };

  return (
    <div className="FlightView">
      <h2>✈️ Seat Map</h2>

      <div className="plane">
        {Array.from({ length: NUM_OF_ROWS }, (_, i) => {
          const row = i + 1;

          return (
            <div className="row" key={row}>
              {layout.map((block, idx) => (
                <div className="blockWrapper" key={idx}>
                  <div className="block">
                    {block.split("").map((letter) => renderSeat(letter, row))}
                  </div>

                  {idx < layout.length - 1 && (
                    <div className="rowNumber">{row}</div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewFlight;

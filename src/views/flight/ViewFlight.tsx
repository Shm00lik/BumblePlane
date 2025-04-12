import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cell from "../../components/Cell";
import db from "../../db";

const NUM_OF_ROWS: number = 65;
const BIG_PLANE_LETTERS = ["A", "B", "C", "", "D", "E", "H", "", "J", "K", "L"];
const SMALL_PLANE_LETTERS = ["A", "B", "C", "D", "E", "F"];

const Flight = () => {
  const { flight } = useParams<string>();

  // database is like:
  // [
  //     { name: "yoav", seat: "A27" },
  //     { name: "rooni", seat: "B27" },
  // ]

  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  const [sortedData, setSortedData] = useState<{ [key: string]: string }[]>([]);

  const blankRows = () => {
    let rows = [];

    for (let i = 1; i <= NUM_OF_ROWS; i++) {
      rows.push({ rowNumber: i.toString(), key: i.toString() });
    }

    return rows;
  };

  useEffect(() => {
    let newSortedData = blankRows();

    data.forEach((data: { [key: string]: string }) => {
      let column: string = data.seat.slice(0, 1).toLowerCase();
      let rowNumber: string = data.seat.slice(1);

      const index = newSortedData.findIndex(
        (item) => item.rowNumber === rowNumber
      );

      if (index !== -1) {
        newSortedData[index] = {
          ...newSortedData[index],
          [column]: data.name,
        };
      } else {
        newSortedData.push({
          [column]: data.name,
          rowNumber: rowNumber,
          key: rowNumber,
        });
      }
    });

    setSortedData(newSortedData);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection(flight || "")
        .where("flight", "==", flight)
        .get();

      setData(data);
    };

    fetchData();
  }, []);

  const columns: TableProps["columns"] = (
    flight?.includes("TLV") ? SMALL_PLANE_LETTERS : BIG_PLANE_LETTERS
  ).map((letter) => {
    if (!letter)
      return {
        title: "",
        dataIndex: "rowNumber",
        key: "rowNumber",
        align: "center",
      };

    return {
      title: letter,
      dataIndex: letter.toLowerCase(),
      key: letter.toLowerCase(),
      align: "center",
      render: (name: string) => <Cell name={name}></Cell>,
    };
  });

  return <Table dataSource={sortedData} columns={columns} pagination={false} />;
};

export default Flight;

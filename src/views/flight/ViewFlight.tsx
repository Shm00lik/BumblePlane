import { Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cell from "../../components/Cell";
import db from "../../db";

const NUM_OF_ROWS: number = 50;
const LETTERS = ["A", "B", "C", "", "D", "E", "F", "G", "", "H", "J", "K"];

const Flight = () => {
    const { flight } = useParams<string>();

    // database is like:
    // [
    //     { name: "yoav", seat: "A27" },
    //     { name: "rooni", seat: "B27" },
    // ]

    const [data, setData] = useState<{ [key: string]: string }[]>([]);

    const [sortedData, setSortedData] = useState<{ [key: string]: string }[]>(
        []
    );

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

    const columns = LETTERS.map((letter) => {
        if (!letter)
            return {
                title: "",
                dataIndex: "rowNumber",
                key: "rowNumber",
            };

        return {
            title: letter,
            dataIndex: letter.toLowerCase(),
            key: letter.toLowerCase(),
            render: (name: string) => <Cell name={name}></Cell>,
        };
    });

    return (
        <Table dataSource={sortedData} columns={columns} pagination={false} />
    );
};

export default Flight;

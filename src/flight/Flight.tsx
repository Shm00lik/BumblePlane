import { Avatar, Popover, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cell from "../components/Cell";

const NUM_OF_ROWS: number = 50;
const LETTERS = ["A", "B", "C", "", "D", "E", "F", "G", "", "H", "J", "K"];

const Flight = () => {
    const { flight } = useParams<string>();

    // database will be like:
    // [
    //     { name: "yoav", seat: "A27" },
    //     { name: "rooni", seat: "B27" },
    // ]

    const [data, setData] = useState<{ [key: string]: string }[]>([
        { name: "YOAV", seat: "E44" },
        { name: "YOAV", seat: "D40" },
        { name: "YOAV", seat: "C8" },
        { name: "YOAV", seat: "D40" },
        { name: "YOAV", seat: "D43" },
        { name: "YOAV", seat: "K2" },
        { name: "YOAV", seat: "A8" },
        { name: "YOAV", seat: "A50" },
        { name: "YOAV", seat: "G36" },
        { name: "YOAV", seat: "K33" },
        { name: "YOAV", seat: "D46" },
        { name: "YOAV", seat: "J32" },
        { name: "YOAV", seat: "G14" },
        { name: "YOAV", seat: "F43" },
        { name: "YOAV", seat: "B4" },
        { name: "YOAV", seat: "H17" },
        { name: "YOAV", seat: "D22" },
        { name: "YOAV", seat: "K27" },
        { name: "YOAV", seat: "F19" },
        { name: "YOAV", seat: "D12" },
        { name: "YOAV", seat: "F7" },
        { name: "YOAV", seat: "F26" },
        { name: "YOAV", seat: "D50" },
        { name: "YOAV", seat: "H49" },
        { name: "YOAV", seat: "D32" },
        { name: "YOAV", seat: "B43" },
        { name: "YOAV", seat: "E43" },
        { name: "YOAV", seat: "D37" },
        { name: "YOAV", seat: "G5" },
        { name: "YOAV", seat: "F3" },
        { name: "YOAV", seat: "A47" },
        { name: "YOAV", seat: "K34" },
        { name: "YOAV", seat: "C7" },
        { name: "YOAV", seat: "F20" },
        { name: "YOAV", seat: "H11" },
        { name: "YOAV", seat: "J21" },
        { name: "YOAV", seat: "J50" },
        { name: "YOAV", seat: "F7" },
        { name: "YOAV", seat: "A34" },
        { name: "YOAV", seat: "D21" },
        { name: "YOAV", seat: "C1" },
        { name: "YOAV", seat: "K36" },
        { name: "YOAV", seat: "B18" },
        { name: "YOAV", seat: "H1" },
        { name: "YOAV", seat: "F15" },
        { name: "YOAV", seat: "B18" },
        { name: "YOAV", seat: "F25" },
        { name: "YOAV", seat: "C35" },
        { name: "YOAV", seat: "B36" },
        { name: "YOAV", seat: "C44" },
        { name: "YOAV", seat: "H20" },
        { name: "YOAV", seat: "A42" },
        { name: "YOAV", seat: "E4" },
        { name: "YOAV", seat: "C37" },
        { name: "YOAV", seat: "A42" },
        { name: "YOAV", seat: "J3" },
        { name: "YOAV", seat: "G4" },
        { name: "YOAV", seat: "C11" },
        { name: "YOAV", seat: "K22" },
        { name: "YOAV", seat: "K29" },
        { name: "YOAV", seat: "D19" },
        { name: "YOAV", seat: "B21" },
        { name: "YOAV", seat: "E22" },
        { name: "YOAV", seat: "B12" },
        { name: "YOAV", seat: "K15" },
        { name: "YOAV", seat: "J28" },
        { name: "YOAV", seat: "C46" },
        { name: "YOAV", seat: "C22" },
        { name: "YOAV", seat: "H26" },
        { name: "YOAV", seat: "E32" },
        { name: "YOAV", seat: "J1" },
        { name: "YOAV", seat: "E6" },
        { name: "YOAV", seat: "C34" },
        { name: "YOAV", seat: "G33" },
        { name: "YOAV", seat: "J42" },
        { name: "YOAV", seat: "H40" },
        { name: "YOAV", seat: "G15" },
        { name: "YOAV", seat: "F34" },
        { name: "YOAV", seat: "C46" },
        { name: "YOAV", seat: "C8" },
        { name: "YOAV", seat: "A15" },
        { name: "YOAV", seat: "K38" },
        { name: "YOAV", seat: "D12" },
        { name: "YOAV", seat: "J8" },
        { name: "YOAV", seat: "C42" },
        { name: "YOAV", seat: "A50" },
        { name: "YOAV", seat: "E8" },
        { name: "YOAV", seat: "K33" },
        { name: "YOAV", seat: "E42" },
        { name: "YOAV", seat: "F35" },
        { name: "YOAV", seat: "C36" },
        { name: "YOAV", seat: "E34" },
        { name: "YOAV", seat: "E4" },
        { name: "YOAV", seat: "D5" },
        { name: "YOAV", seat: "J16" },
        { name: "YOAV", seat: "A23" },
        { name: "YOAV", seat: "J28" },
        { name: "YOAV", seat: "B23" },
        { name: "YOAV", seat: "D5" },
        { name: "YOAV", seat: "K39" },
    ]);

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

    console.log(sortedData);
    return (
        <Table dataSource={sortedData} columns={columns} pagination={false} />
    );
};

export default Flight;

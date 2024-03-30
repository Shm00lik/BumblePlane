import { Popover, Avatar } from "antd";
import { useState } from "react";

interface CellProps {
    name: string;
}

const Cell = ({ name }: CellProps) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    if (!name) {
        return <></>;
    }

    return (
        <Popover
            content={name}
            title={name}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <Avatar size={"small"} style={{ backgroundColor: "blue" }} />
        </Popover>
    );
};

export default Cell;

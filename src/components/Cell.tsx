import { Popover, Avatar } from "antd";

const getColor = (name: string) => {
  const colors = ["#1677ff", "#52c41a", "#fa8c16", "#eb2f96", "#722ed1"];
  return colors[name.length % colors.length];
};

const Cell = ({ name }: { name: string }) => {
  if (!name) return null;

  return (
    <Popover content={name}>
      <Avatar size="small" style={{ backgroundColor: getColor(name) }}>
        {name[0].toUpperCase()}
      </Avatar>
    </Popover>
  );
};

export default Cell;
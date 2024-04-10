import { Image } from "antd";
import image from "/404PageNotFound.png";

const PageNotFound = () => {
    return <Image src={image} preview={false} />;
};

export default PageNotFound;

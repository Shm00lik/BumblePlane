import { Image } from "antd";
import image from "../../assets/404PageNotFound.png";

const PageNotFound = () => {
    return <Image src={image} preview={false} />;
};

export default PageNotFound;

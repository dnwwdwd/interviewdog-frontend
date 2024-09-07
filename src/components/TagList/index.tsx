import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import {Tag} from "antd";

interface Props {
    value?: string[];
}

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
    const {tags = []} = props;

    return (
        <div className="tagList">
            {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
    );
};

export default TagList;
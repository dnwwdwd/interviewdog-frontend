"use client";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import {Card, List} from "antd";
import Link from "next/link";
import TagList from "@/components/TagList";

interface Props {
    questionList?: API.QuestionVO[];
}

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
    const {questionList = []} = props;

    return (
        <Card className="questionList">
            <List
                dataSource={questionList}
                renderItem={(item) => (
                    <List.Item extra={<TagList tags={item.tagList}/>}>
                        <List.Item.Meta title={
                            <Link href={`/question/${item.id}`} >
                                {item.title}
                            </Link>
                        }/>
                    </List.Item>)}
            />
        </Card>
    );
};

export default QuestionList;
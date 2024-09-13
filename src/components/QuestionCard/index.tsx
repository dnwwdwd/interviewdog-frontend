"use client";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import {Card} from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";

interface Props {
    question?: API.QuestionVO;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {

    const {question} = props;

    useAddUserSignInRecord();

    return (
        <div className="questionCard">
            <Card>
                <Title level={1} style={{fontSize: 24}}>
                    {question.title}
                </Title>
                <TagList tags={question.tagList}/>
                <div style={{marginBottom: 16}}></div>
                <MdViewer value={question.content}/>
            </Card>
            <div style={{marginBottom: 16}}/>
            <Card title={'推荐答案'}>
                <MdViewer value={question.answer}/>
            </Card>
        </div>
    );
};

export default QuestionCard;
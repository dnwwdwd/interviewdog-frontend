"use client";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import {Avatar, Card, List, Typography} from "antd";
import Link from "next/link";

interface Props {
    questionBankList?: API.QuestionBankVO[];
}

/**
 * 题库列表
 * @param props
 * @constructor
 */
const QuestionBankList = (props: Props) => {
    const {questionBankList = []} = props;

    const questionBankView = (questionBank: API.QuestionBankVO) => {
        return (
            <Card>
                <Link href={`/bank/${questionBank.id}`}>
                    <Card.Meta
                        avatar={<Avatar src={questionBank.picture}/>}
                        title={questionBank.title}
                        description={
                            <Typography.Paragraph type="secondary" ellipsis={{rows: 1}} style={{marginBottom: 0}}>
                                {questionBank.description}
                            </Typography.Paragraph>
                        }
                    />
                </Link>
            </Card>
        );
    };

    return (
        <div className="questionBankList">

            <List
                grid={{
                    gutter: 16,
                    column: 4,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                }}
                dataSource={questionBankList}
                renderItem={(item) => (
                    <List.Item>
                        {questionBankView(item)}
                    </List.Item>
                )}
            />

        </div>
    );
};

export default QuestionBankList;
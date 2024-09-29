"use server";
import './index.css';
import Title from "antd/es/typography/Title";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

/**
 * 题库列表页面
 * @constructor
 */
export default async function BanksPage() {

    let questionBankList = [];

    try {
        const res = await listQuestionBankVoByPageUsingPost({
            pageSize: 200,
            sortField: 'createTime',
            sortOrder: 'descend',
        });
        questionBankList = res.data.records ?? [];
        console.log(questionBankList);
    } catch (e) {
        console.log('获取题库列表失败，' + e.message);
    }

    return (
        <div id="banksPage" className="max-width-content">
            <Title level={3}>
                题库大全
            </Title>
            <QuestionBankList questionBankList={questionBankList}/>
        </div>
    );
}

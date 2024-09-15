"use server";
import './index.css';
import Title from "antd/es/typography/Title";
import {message} from "antd";
import {searchQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable/page";

/**
 * 题目列表页面
 * @constructor
 */
export default async function QuestionsPage({searchParams}) {
    // 获取 url 查询参数，重命名为 searchText
    const {q: searchText} = searchParams;

    let questionList = [];
    const pageSize = 12;
    let total = 0;

    try {
        const res = await searchQuestionVoByPageUsingPost({
            searchText,
            pageSize: pageSize,
            sortField: 'createTime',
            sortOrder: 'desc',
        });
        questionList = res.data.records ?? [];
        total = res.data.total ?? 0;
    } catch (e) {
        message.error('获取题目列表失败，' + e.message);
    }

    return (
        <div id="questionsPage" className="max-width-content">
            <Title level={3}>
                题目大全
            </Title>
            <QuestionTable defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={{
                title: searchText
            }}/>
        </div>
    );
}

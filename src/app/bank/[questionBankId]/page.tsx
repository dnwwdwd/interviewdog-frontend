"use server";
import "./index.css";
import {Avatar, Button, Card} from "antd";
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import QuestionList from "@/components/QuestionList";
import Title from "antd/es/typography/Title";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({ params }) {
  const { questionBankId } = params;
  let bank = undefined;

  // 获取题库详情
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      // 可以自行扩展为分页实现
      pageSize: 200,
    });
    bank = res?.data;
  } catch (e) {
    console.log("获取题库详情失败，" + e.message);
  }
  // 如果题库不存在，进行错误处理
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 获取第一道题目
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }

  return (
    <div id="bankPage" className="max-width-content">
      <Title level={2}>{bank.name}</Title>
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph
                type="secondary"
                ellipsis={{ rows: 1 }}
                style={{ marginBottom: 0 }}
              >
                {bank.description}
              </Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <QuestionList
        questionList={bank.questionPage.records ?? []}
        cardTitle={`題目列表（${bank.questionPage?.total ?? 0}）`}
        questionBankId={questionBankId}
      />
    </div>
  );
}

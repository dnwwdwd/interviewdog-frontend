"use server";
import "./index.css";
import {Flex, Menu} from "antd";
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import Title from "antd/es/typography/Title";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";
import Link from "next/link";

/**
 * 题库题目详情页
 * @constructor
 */
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;
  let bank = undefined;
  let question = undefined;

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

  // 获取题目详情
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res?.data;
  } catch (e) {
      console.log("获取题目详情失败，" + e.message);
  }
  // 如果题目不存在，进行错误处理
  if (!question) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }

  // 题目菜单列表
  const questionMenuItemList = (bank.questionPage.records || []).map(q => {
      return {
          label: <Link href={`/bank/${questionBankId}/question/${q.id}`}>
              {q.title}
          </Link>,
          key: q.id,
      }
  });


  return (
    <div id="bankQuestionPage" className="max-width-content">
      <Flex>
        <Sider width={240} theme="light">
            <Title level={4} style={{ padding: '0 20px'}}>
                {bank.title}
            </Title>
            <Menu items={questionMenuItemList} selectedKeys={[question.id]}/>
        </Sider>
          <Content>
              <QuestionCard question={question}/>
          </Content>
      </Flex>
    </div>
  );
}

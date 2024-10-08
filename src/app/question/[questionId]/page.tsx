"use server";
import "./index.css";
import {Flex} from "antd";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import {Content} from "antd/es/layout/layout";
import QuestionCard from "@/components/QuestionCard";

/**
 * 题目详情页（从外层进入的）
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionBankId, questionId } = params;
  let bank = undefined;
  let question = undefined;

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

  return (
    <div id="questionPage" className="max-width-content">
      <Flex>
          <Content>
              <QuestionCard question={question}/>
          </Content>
      </Flex>
    </div>
  );
}

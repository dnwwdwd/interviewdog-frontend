import {Button, Form, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {batchAddQuestionsToBankUsingPost} from "@/api/questionController";

interface Props {
    questionIdList?: number[];
    visible: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}


/**
 * 批量添加题目到题库
 * @param props
 * @constructor
 */
const BatchAddQuestionToBankModal: React.FC<Props> = (props) => {
    const {questionIdList = [], visible, onCancel, onSubmit} = props;
    const [form] = Form.useForm();
    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([]);

    /**
     * 提交
     *
     * @param values
     */
    const doSubmit = async (values: API.QuestionBankQuestionBatchAddRequest) => {
        const hide = message.loading('正在操作');
        let questionBankId = values.questionBankId;
        if (!questionBankId) return;
        try {
            await batchAddQuestionsToBankUsingPost({
                questionBankId,
                questionIdList,
            });
            hide();
            message.success('操作成功');
            onSubmit?.();
            return true;
        } catch (error: any) {
            hide();
            message.error('操作失败，' + error.message);
        }
    };

    // 获取题库列表
    const getQuestionBankList = async () => {
        try {
            const res = await listQuestionBankVoByPageUsingPost({
                pageSize: 200,
                sortField: 'createTime',
                sortOrder: 'descend',
            });
            setQuestionBankList(res.data?.records ?? []);
        } catch (e) {
            message.error("获取题库列表失败，" + e.message);
        }
    };

    useEffect(() => {
        getQuestionBankList()
    }, []);


    return (
        <Modal
            destroyOnClose
            title={'批量向题库添加题目'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form} style={{marginTop: 24}} onFinish={doSubmit}>
                <Form.Item label="选择题库" name="questionBankId">
                    <Select
                        style={{width: '100%'}}
                        options={questionBankList.map((questionBank) => {
                            return {
                                label: questionBank.title,
                                value: questionBank.id,
                            };
                        })}
                    >
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default BatchAddQuestionToBankModal;

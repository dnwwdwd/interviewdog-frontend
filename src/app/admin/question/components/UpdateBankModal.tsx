import {Form, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {
    addQuestionBankQuestionUsingPost,
    listQuestionBankQuestionByPageUsingPost,
    removeQuestionBankQuestionUsingPost
} from "@/api/questionBankQuestionController";

interface Props {
    questionId: number;
    visible: boolean;
    onCancel: () => void;
}


/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
    const {questionId, visible, onCancel} = props;
    const [form] = Form.useForm();
    const [questionBankList, setQuestionBankList] = useState<API.QuestionBankVO[]>([]);

    // 获取所属题库列表
    const getCurrentQuestionBankIdList = async () => {
        try {
            const res = await listQuestionBankQuestionByPageUsingPost({
                questionId: questionId,
                pageSize: 200,
            });
            const questionBankIdList = (res.data?.records ?? []).map(item => item.questionBankId);
            form.setFieldValue("questionBankIdList", questionBankIdList);
        } catch (e) {
            message.error("获取题目所属题库列表失败，" + e.message);
        }
    };

    useEffect(() => {
        if (questionId) {
            getCurrentQuestionBankIdList();
        }
    }, [questionId]);


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
        if (questionId) {
            getCurrentQuestionBankIdList();
        }
    }, [questionId]);


    return (
        <Modal
            destroyOnClose
            title={'更新题目所属题库'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form} style={{marginTop: 24}}>
                <Form.Item label="所属题库" name="questionBankIdList">
                    <Select mode="multiple" style={{width: '100%'}}
                            options={questionBankList.map((questionBank) => {
                                return {
                                    label: questionBank.title,
                                    value: questionBank.id,
                                };
                            })}
                            onSelect={async (value) => {
                                const hide = message.loading('正在更新');
                                try {
                                    await addQuestionBankQuestionUsingPost({
                                        questionId,
                                        questionBankId: value,
                                    });
                                    hide();
                                    message.success('绑定题库成功');
                                    return true;
                                } catch (error: any) {
                                    hide();
                                    message.error('绑定题库失败，' + error.message);
                                    return false;
                                }
                            }}
                            onDeselect={async (value) => {
                                const hide = message.loading('正在更新');
                                try {
                                    await removeQuestionBankQuestionUsingPost({
                                        questionId,
                                        questionBankId: value,
                                    });
                                    hide();
                                    message.success('取消绑定题库成功');
                                    return true;
                                } catch (error: any) {
                                    hide();
                                    message.error('取消绑定题库失败，' + error.message);
                                    return false;
                                }
                            }}
                    >
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UpdateBankModal;

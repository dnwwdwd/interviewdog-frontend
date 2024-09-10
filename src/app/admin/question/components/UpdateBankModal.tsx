import {Form, message, Modal, Select} from 'antd';
import React from 'react';
import {updateQuestionUsingPost} from "@/api/questionController";

interface Props {
    questionId: number;
    visible: boolean;
    onCancel: () => void;
}

/**
 * 更新题目所属题库弹窗
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
        await updateQuestionUsingPost(fields);
        hide();
        message.success('更新成功');
        return true;
    } catch (error: any) {
        hide();
        message.error('更新失败，' + error.message);
        return false;
    }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
    const {questionId, visible, onCancel} = props;

    if (!questionId) {
        return <></>;
    }

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
            <Form style={{marginTop: 24}}>
                <Form.Item label="所属题库">
                    <Select mode="multiple" style={{width: '100%'}}>

                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UpdateBankModal;

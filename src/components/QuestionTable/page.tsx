"use client";
import React, {useState} from 'react';
import {ProColumns, ProTable} from "@ant-design/pro-table";
import {listQuestionByPageUsingPost, searchQuestionVoByPageUsingPost} from "@/api/questionController";
import TagList from "@/components/TagList";
import {TablePaginationConfig} from "antd";
import Link from "next/link";

interface Props {
    // 默认值
    defaultQuestionList?: API.QuestionVO[],
    defaultTotal?: number,
    // 默认搜索条件
    defaultSearchParams?: API.QuestionQueryRequest,
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {

    const {defaultQuestionList, defaultTotal, defaultSearchParams = {}} = props;
    // 题目列表
    const [questionList, setQuestionList] = useState<API.QuestionVO[]>(defaultQuestionList || []);
    // 题目总数
    const [total, setTotal] = useState<number>(defaultTotal || 0);
    // 判断是否首次加载
    const [init, setInit] = useState<boolean>(true);

    /**
     * 表格列配置
     */
    const columns: ProColumns<API.Question>[] = [
        {
            title: '标题',
            dataIndex: 'title',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '搜索',
            dataIndex: 'searchText',
            valueType: 'text',
            hideInTable: true,
            render: (_, record) => {
                return <Link href={`/question/${record.id}`}>{record.title}</Link>
            },
        },
        {
            title: "标签",
            dataIndex: "tags",
            valueType: "select",
            fieldProps: {
                mode: "tags",
            },
            render: (_, record) => {
                const tags = JSON.parse(record.tags || "[]");
                return <TagList tags={tags}/>;
            },
        },
        {
            title: '创建人',
            dataIndex: 'userId',
            valueType: 'text',
            hideInSearch: true,
            hideInForm: true,
        },
    ];
    return (
        <div className="questionTable">
            <ProTable<API.QuestionVO>
                rowKey="key"
                size="large"
                search={{
                    labelWidth: "auto",
                }}
                form={{
                    initialValues: defaultSearchParams
                }}
                pagination={{
                    pageSize: 12,
                    showTotal: (total) => `总共${total}条`,
                    showSizeChanger: false,
                    total,
                } as TablePaginationConfig}
                request={async (params, sort, filter) => {
                    // 判断是否是首次加载
                    // if (init) {
                    //     setInit(false);
                    //     if (defaultQuestionList && defaultTotal) {
                    //         return;
                    //     }
                    // }
                    const sortField = Object.keys(sort)?.[0] || 'createTime';
                    const sortOrder = sort?.[sortField] || 'desc';

                    const {data, code} = await searchQuestionVoByPageUsingPost({
                        ...params,
                        sortField,
                        sortOrder,
                        ...filter,
                    } as API.QuestionQueryRequest);

                    const newData = data?.records || [];
                    const newTotal = data?.total || 0;
                    // 更新状态
                    setQuestionList(newData);
                    setTotal(newTotal);
                    return {
                        success: code === 0,
                        data: newData,
                        total: newTotal,
                    };
                }}
                columns={columns}
            />
        </div>
    );
};

export default QuestionTable;

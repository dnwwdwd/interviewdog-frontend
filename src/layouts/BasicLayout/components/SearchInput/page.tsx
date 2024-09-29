import React from "react";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

interface Props {

}

/**
 * 搜索条组件
 * @constructor
 */
export const SearchInput = (props: Props) => {

    const router = useRouter();

    return (
        <div
            className="searchInput"
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
        >
            <Input.Search
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                prefix={
                    <SearchOutlined/>
                }
                placeholder="搜索题目"
                onSearch={(value: string) => {
                    window.open(`/questions?q=${value}`, '_blank');
                }}
            />
        </div>
    );
};
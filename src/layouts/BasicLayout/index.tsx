"use client";
import {GithubFilled, LogoutOutlined, SearchOutlined,} from '@ant-design/icons';
import {ProLayout,} from '@ant-design/pro-components';
import {Dropdown, Input,} from 'antd';
import React, {useState} from 'react';
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import {menus} from "../../../config/menu";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";


/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                prefix={
                    <SearchOutlined/>
                }
                placeholder="搜索题目"
                variant="borderless"
            />
        </div>
    );
};

interface Props {
    children: React.ReactNode
}

export default function BasicLayout({children}: Props) {

    const pathname = usePathname();

    const loginUser = useSelector((state: RootState) => state.loginUser);

    const [text, setText] = useState<string>('');// 搜索框内容


    return (
        <div
            id="basicLayout"
            style={{
                minHeight: '100vh',
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProLayout
                title="面试狗"
                logo={
                    <Image
                        src="/assets/logo.png"
                        height={32}
                        width={32}
                        alt="面试狗"
                    />
                }
                layout="top"
                location={{
                    pathname,
                }}
                avatarProps={{
                    src: loginUser.userAvatar || '/assets/logo/notLoginUser.png',
                    size: 'small',
                    title: loginUser.username || '游客',
                    render: (props, dom) => {
                        return (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'logout',
                                            icon: <LogoutOutlined/>,
                                            label: '退出登录',
                                        },
                                    ],
                                }}
                            >
                                {dom}
                            </Dropdown>
                        );
                    },
                }}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <SearchInput key="searchInput"/>,
                        <a href="https://www.github.com/dnwwdwd" target="_blank" key="github">
                            <GithubFilled key="GithubFilled"/>,
                        </a>
                    ];
                }}
                headerTitleRender={(logo, title, _) => {
                    return (
                        <a>
                            {logo}
                            {title}
                        </a>
                    );
                }}
                // 渲染底部栏
                footerRender={(props) => {
                    return <GlobalFooter/>;
                }}
                onMenuHeaderClick={(e) => console.log(e)}
                menuDataRender={() => {
                    return getAccessibleMenus(loginUser, menus);
                }}
                menuItemRender={(item, dom) => (
                    <Link
                        href={item.path || '/'}
                        target={item.target}>
                        {dom}
                    </Link>
                )}
            >
                <MdEditor value={text} onChange={setText}/>
                <MdViewer value={text}/>
                {children}
            </ProLayout>
        </div>
    );
};
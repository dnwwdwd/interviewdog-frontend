"use client";
import {GithubFilled, LogoutOutlined,} from '@ant-design/icons';
import {ProLayout,} from '@ant-design/pro-components';
import {Dropdown, message,} from 'antd';
import React, {useState} from 'react';
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {menus} from "../../../config/menu";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import getAccessibleMenus from "@/access/menuAccess";
import {userLogoutUsingPost} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import {ProForm} from "@ant-design/pro-form/lib";
import {DEFAULT_USER} from "@/constants/user";
import {SearchInput} from "@/layouts/BasicLayout/components/SearchInput/page";


interface Props {
    children: React.ReactNode
}

export default function BasicLayout({children}: Props) {

    const router = useRouter();
    const pathname = usePathname();
    // 当前登录用户
    const loginUser = useSelector((state: RootState) => state.loginUser);

    const dispatch = useDispatch<AppDispatch>();
    const [form] = ProForm.useForm();
    const [text, setText] = useState<string>('');// 搜索框内容

    // 注销
    const userLogout = async () => {
        try {
            const res = await userLogoutUsingPost();
            if (res.data) {
                message.success('退出登录成功');
                // 保存用户登录状态
                dispatch(setLoginUser(DEFAULT_USER));
                router.push('/user/login');
                form.resetFields();
            }
        } catch (e) {
            message.error('退出登录失败，' + e.message);
        }
    };


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
                        if (!loginUser.id) {
                            return <div onClick={() => router.push('user/login')}>{dom}</div>;
                        }
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
                                    onClick: async (event: { key: React.Key }) => {
                                        const {key} = event;
                                        if (key === 'logout') {
                                            userLogout();
                                        }
                                    }
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
                    return <></>;
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
                {children}
            </ProLayout>
        </div>
    );
};
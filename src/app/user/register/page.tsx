"use client";
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import Image from "next/image";
import React from "react";
import './index.css';
import Link from "next/link";
import {userRegisterUsingPost} from "@/api/userController";
import {message} from "antd";
import {ProForm} from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {

    const [form] = ProForm.useForm();
    const router = useRouter();

    // 注册
    const doSubmit = async (values: API.UserLoginRequest) => {
        try {
            const res = await userRegisterUsingPost(values);
            if (res.data) {
                message.success('注册成功，请登录');
                // 前往登录页面
                router.replace('/user/login');
                form.resetFields();
            }
        } catch (e) {
            message.error('注册失败，' + e.message);
        }
    };

    return (
        <div id="userRegisterPage">
            <LoginForm
                form={form}
                logo={
                    <Image src="/assets/logo.png" alt="面试狗" height={44} width={44}/>
                }
                title="面试狗 - 注册"
                subTitle="全球最大的面试刷题网站"
                submitter={{
                    searchConfig: {
                        submitText: '注册'
                    },
                }}
                onFinish={doSubmit}
            >
                <ProFormText
                    name="userAccount"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'}/>,
                    }}
                    placeholder={'用户名: 请输入用户名'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="userPassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'}/>,
                        strengthText:
                            'Password should contain numbers, letters and special characters, at least 8 characters long.',
                    }}
                    placeholder={'密码: 请输入密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="checkPassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'}/>,
                        strengthText:
                            'Password should contain numbers, letters and special characters, at least 8 characters long.',
                    }}
                    placeholder={'密码: 请确认密码'}
                    rules={[
                        {
                            required: true,
                            message: '请确认密码！',
                        },
                    ]}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <Link href={'/user/login'} style={{
                        float: 'right',
                    }}>
                        已有账号？去登录
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
};

export default UserRegisterPage;
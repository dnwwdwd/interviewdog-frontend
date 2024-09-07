"use client";
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import Image from "next/image";
import React from "react";
import './index.css';
import Link from "next/link";
import {userLoginUsingPost} from "@/api/userController";
import {message} from "antd";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/stores";
import {setLoginUser} from "@/stores/loginUser";
import { ProForm } from "@ant-design/pro-form/lib";
import {useRouter} from "next/navigation";
import './index.css';

/**
 * 用户登录页面
 * @constructor
 */
const UserLoginPage: React.FC = () => {

    const [form] = ProForm.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // 登录
    const doSubmit = async (values: API.UserLoginRequest) => {
        try {
            const res = await userLoginUsingPost(values);
            if (res.data) {
                message.success('登录成功');
                // 保存用户登录状态
                dispatch(setLoginUser(res.data));
                router.replace('/');
                form.resetFields();
            }
        } catch (e) {
            message.error('登录失败，' + e.message);
        }
    };

    return (
        <div id="userLoginPage">
            <LoginForm
                form={form}
                logo={
                    <Image src="/assets/logo.png" alt="面试狗" height={44} width={44}/>
                }
                title="面试狗 - 登录"
                subTitle="全球最大的面试刷题网站"
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
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <Link href={'/user/register'} style={{
                        float: 'right',
                    }}>
                        没有账号？去注册
                    </Link>
                </div>
            </LoginForm>
        </div>
    );
};

export default UserLoginPage;
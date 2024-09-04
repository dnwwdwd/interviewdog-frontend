import {MenuDataItem} from "@ant-design/pro-layout";
import {CrownOutlined} from "@ant-design/icons";

// 顶部导航栏菜单项
export const menus = [
    {
        path: '/',
        name: '主页',
    },
    {
        path: '/banks',
        name: '题库',
    },
    {
        path: '/questions',
        name: '题目',
    },
    {
        path: '/admin',
        name: '管理',
        icon: <CrownOutlined/>,
        children: [
            {
                path: '/admin/user',
                name: '用户管理',
            }
        ]
    },

] as MenuDataItem;
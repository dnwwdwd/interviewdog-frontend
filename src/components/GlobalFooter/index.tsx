import React from 'react';
import './index.css';

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {

    const currentYear = new Date().getFullYear();

    return (
        <div
            className="global-footer"
        >
            <div>@ {currentYear} AI 刷题平台</div>
            <a href="https://www.github.com/dnwwdwd" target="_blank">
                作者：C1own
            </a>
        </div>
    );
};
/* eslint-disable import/first */
import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Navigation from './Navigation';
import { Button, Radio } from 'antd';

const home = () => {
    return (
        <div>
            <Navigation />
            <main class="page-main">
                <h1 style={{ color: "#ffffff" }}>What Are you Waiting for...</h1>
                <div>
                    <Button type="primary" href="/menu" size={'large'} style={{ background: "#1fb31a", borderColor: "#1fb31a" }} block>
                        Order Now
                </Button>
                </div>
            </main>
        </div>
    );
}

export default home;
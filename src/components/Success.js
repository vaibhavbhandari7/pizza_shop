import React, { Component } from 'react';
import { connect } from "react-redux";
import Navigation from './Navigation';
import { changeInput } from "../js/actions/index";
import Progress from "./Progress";
import { Card } from 'antd';
import cookie from 'react-cookies';

import { Result, Button } from 'antd';

const { Meta } = Card;
class Success extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation />
                <div class="menu-cnt">
                    <Progress current={2} />
                </div>
                <Result
                    status="success"
                    title="Order Placed Successfully!!"
                    subTitle="Order number: 2017182818828182881 Your Pizza Will Reach You soon."
                    extra={[
                        <Button type="primary" href="/Menu" key="buy">Buy Again</Button>,
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        itemPrice: state.itemPrice
    };
};

export default connect(mapStateToProps, { changeInput })(Success);
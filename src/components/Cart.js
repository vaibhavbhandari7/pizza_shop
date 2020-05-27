import React, { Component } from 'react';
import { connect } from "react-redux";
import Navigation from './Navigation';
import { changeInput } from "../js/actions/index";
import Progress from "./Progress";
import CheckoutItem from "./CheckoutItem";
import { Card } from 'antd';
import cookie from 'react-cookies';
import { Input } from 'antd';

import { message, Button, Radio } from 'antd';

const { Meta } = Card;
class Cart extends Component {

    constructor(props) {
        super(props);

    }


    componentWillMount() {
        let tempcart = cookie.load('cart');
        let token = cookie.load('token');
        if (token !== undefined) {
            fetch('/api/user', {
                headers: { Authorization: 'Bearer ' + token.replace(/['"]+/g, '') }
            }).then(res => res.json())
                .then(
                    (result) => {
                        this.props.changeInput({ type: 'UPDATE_NAME', payload: result.user.name })
                        this.props.changeInput({ type: 'UPDATE_ADDRESS', payload: result.user.address })
                        this.props.changeInput({ type: 'UPDATE_MOBILE', payload: result.user.mobile })
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
        if (tempcart) {
            let itemPrice = tempcart.reduce((sum, i) => (
                sum += i.quantity * i.price
            ), 0)
            if (itemPrice == 0) {
                this.props.history.push('/menu')
                return
            }
            let tax = Math.round(itemPrice * .05)
            let delivery = 100
            let total = itemPrice + tax
            this.props.changeInput({ type: 'UPDATE_ITEM_PRICE', payload: itemPrice })
            this.props.changeInput({ type: 'UPDATE_TAX', payload: tax })
            this.props.changeInput({ type: 'UPDATE_DELIVERY', payload: delivery })
            this.props.changeInput({ type: 'UPDATE_TOTAL', payload: total })
        }
        if (!tempcart) {
            tempcart = []
            this.props.history.push('/menu')
            return
        }

        this.props.changeInput({ type: 'UPDATE_CART', payload: tempcart })
    }

    OrderNow() {
        if (this.props.name == '' || this.props.address == '' || this.props.mobile == '') {
            message.error('Please Fill Contact Details');
            return
        }
        let num = parseInt(this.props.mobile)
        if (num.toString().length !== 10) {
            message.error('Please Correct Mobile number');
            return
        }

        let data = {}
        data.name = this.props.name
        data.address = this.props.address
        data.mobile = this.props.mobile
        data.total = this.props.total
        data.cart = this.props.cart
        let token = cookie.load('token');
        let headers = {
            'Content-Type': 'application/json'
        }
        if (token !== undefined) {
            headers['Authorization'] = 'Bearer ' + token.replace(/['"]+/g, '')
        }


        fetch("/api/place_order", {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    cookie.remove('cart', { path: '/' })
                    this.props.changeInput({ type: 'UPDATE_ITEM_PRICE', payload: 0 })
                    this.props.changeInput({ type: 'UPDATE_TAX', payload: 0 })
                    this.props.changeInput({ type: 'UPDATE_DELIVERY', payload: 0 })
                    this.props.changeInput({ type: 'UPDATE_TOTAL', payload: 0 })
                    this.props.history.push('/Success')
                },
                (error) => {
                    console.log(error);
                }
            )


    }

    render() {
        return (
            <div>
                <Navigation />
                <div class="menu-cnt">
                    <Progress current={1} />
                </div>

                <div class="cart">
                    <div class="left" >
                        <div style={{ display: "block" }}>
                            <div class="sc-jnlKLf gvJbQF">
                                <div style={{ display: "block" }}>

                                    <div class="sub-hdng">
                                        <span class="sub-hdng--lft">6 Items you have selected</span>
                                    </div>
                                    <div>
                                        {
                                            this.props.cart.map(iteam => (
                                                <CheckoutItem iteam={iteam} />
                                            )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="right" >
                        <div style={{ display: "block" }}>
                            <div class="sc-jwKygS iRVdgI">
                                <span class="sub-hdng itms" >Contact Details</span>
                                <div class="injectStyles-sc-1jy9bcf-0 gatcFE">
                                    <div class="sc-cmTdod gCVNxa">
                                        <div class="txt--wrpr">
                                            <Input
                                                placeholder="Name"
                                                onChange={
                                                    (value) => this.props.changeInput({ type: 'UPDATE_NAME', payload: value.target.value })
                                                }
                                                value={this.props.name} />
                                        </div>
                                        <div class="txt--wrpr">
                                            <Input
                                                placeholder="Mobile"
                                                maxLength={10}
                                                onChange={
                                                    (value) => this.props.changeInput({ type: 'UPDATE_MOBILE', payload: value.target.value })
                                                }
                                                value={this.props.mobile} />
                                        </div>
                                        <div class="txt--wrpr">
                                            <Input
                                                placeholder="Address"
                                                onChange={
                                                    (value) => { this.props.changeInput({ type: 'UPDATE_ADDRESS', payload: value.target.value }) }
                                                }
                                                value={this.props.address} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "block" }}>
                            <div class="sc-jwKygS iRVdgI">
                                <span class="sub-hdng itms" >Price Details</span>
                                <div class="injectStyles-sc-1jy9bcf-0 gatcFE">
                                    <div class="sc-cmTdod gCVNxa">
                                        <div class="txt--wrpr">
                                            <span class="sc-ktHwxA QrGLy" data-label="cart_subtotal">Sub Total</span>
                                            <span class="sc-cIShpX jhQqzf"><span class="rupee"> {this.props.itemPrice}</span></span>
                                        </div>
                                        <div class="txt--wrpr">
                                            <span class="sc-ktHwxA QrGLy" data-label="cart_subtotal">Tax</span>
                                            <span class="sc-cIShpX jhQqzf"><span class="rupee"> {this.props.tax}</span></span>
                                        </div>
                                        <div class="txt--wrpr">
                                            <span class="sc-ktHwxA QrGLy">Delivery</span>
                                            <span class="sc-cIShpX jhQqzf" data-label="cart_gst"><span class="rupee"> {this.props.delivery}</span></span>
                                        </div>
                                        <div class="txt--wrpr marginTop">
                                            <span class="txt--bold sc-ktHwxA QrGLy">Grand Total</span>
                                            <span class="txt--bold txt--bggr sc-cIShpX jhQqzf" data-label="cart_total"><span class="rupee"> {this.props.total}</span></span>
                                        </div>
                                        <div class="sc-iELTvK dfQrnG"></div>
                                        <div class="injectStyles-sc-1jy9bcf-0 fNOYBs">
                                            <Button
                                                type="primary"
                                                size={'large'}
                                                onClick={() => this.OrderNow()}
                                                style={{ background: "#1fb31a", borderColor: "#1fb31a" }}
                                                block>
                                                Order Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        articles: state.about,
        cart: state.cart,
        itemPrice: state.itemPrice,
        tax: state.tax,
        delivery: state.delivery,
        total: state.total,
        name: state.name,
        address: state.address,
        mobile: state.mobile,
        otp: state.otp,

    };
};

export default connect(mapStateToProps, { changeInput })(Cart);
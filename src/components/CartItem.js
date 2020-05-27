/* eslint-disable import/first */
import React, { Component } from 'react';

import { Card } from 'antd';

import { Select } from 'antd';

const { Option } = Select;
import { connect } from "react-redux";
import { changeInput } from "../js/actions/index";

const CartItem = ({ iteam, quantity, changeInput, cart }) => {


    const handleChange = (value, id) => {
        let tempcart = cart.map((item) => (
            item.id === id ? { ...item, quantity: value } : item
        ))
        let itemPrice = tempcart.reduce((sum, i) => (
            sum += i.quantity * i.price
        ), 0)
        changeInput({ type: 'UPDATE_ITEM_PRICE', payload: itemPrice })
        changeInput({ type: 'UPDATE_CART', payload: tempcart })
    }

    if (iteam.quantity > 0)
        return (
            <div style={{ display: "block" }}>
                <div class='crt-cntnt'>
                    <div class="crt-cnt">
                        <div class="crt-cnt-img">
                            <img src={iteam.img_url} /></div>
                        <div class="crt-cnt-descrptn">
                            <span class="crt-cnt-descrptn-ttl">{iteam.name}</span>
                            <span class="crt-cnt-descrptn-txt">{iteam.description}</span>
                            <span class="crt-cnt-descrptn-txt"> Price :{iteam.price}</span>
                            <span class="crt-cnt-descrptn-txt">
                                Quantity :<Select value={iteam.quantity} onChange={(value) => handleChange(value, iteam.id)} >
                                    {quantity.map(item => (
                                        <Option value={item}>{item}</Option>
                                    )
                                    )}
                                </Select>
                            </span>
                            <div class="crt-cnt-descrptn-sz-crst">
                            </div></div></div>
                </div>
                <div class="eucsDH"></div>
            </div>
        )
    else
        return (
            <div></div>
        )
}

const mapStateToProps = state => {
    return {
        quantity: state.quantity,
        cart: state.cart,
        itemPrice: state.itemPrice
    };
};

export default connect(mapStateToProps, { changeInput })(CartItem);
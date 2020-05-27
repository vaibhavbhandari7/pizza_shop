/* eslint-disable import/first */
import React, { Component } from 'react';

import { Card } from 'antd';

import { Select } from 'antd';

const { Option } = Select;
import { connect } from "react-redux";
import { changeInput } from "../js/actions/index";

const CheckOutItem = ({ iteam, quantity, changeInput, cart }) => {


    const handleChange = (value, id) => {
        let tempcart = cart.map((item) => (
            item.id === id ? { ...item, quantity: value } : item
        ))
        let itemPrice = tempcart.reduce((sum, i) => (
            sum += i.quantity * i.price
        ), 0)
        let tax = Math.round(itemPrice * .05)
        let delivery = 100
        let total = itemPrice + tax
        changeInput({ type: 'UPDATE_ITEM_PRICE', payload: itemPrice })
        changeInput({ type: 'UPDATE_TAX', payload: tax })
        changeInput({ type: 'UPDATE_DELIVERY', payload: delivery })
        changeInput({ type: 'UPDATE_TOTAL', payload: total })
        changeInput({ type: 'UPDATE_CART', payload: tempcart })
    }

    if (iteam.quantity > 0)
        return (

            <div style={{ display: "block" }}>
                <div class="sc-kpOJdX frPpmm">
                    <div class="injectStyles-sc-1jy9bcf-0 bslwCH">
                        <div class="cart-item" data-label="cart-item-entry">
                            <div class="flex col-dir">
                                <div class="flex"><div class="sc-jTzLTM jAcaTr">
                                    <img class="img-wrpr__img" src={iteam.img_url} />

                                </div>
                                    <div class="sc-fjdhpX hyIsIm">
                                        <div class="width100">
                                            <span class="item--ttl">{iteam.name}</span>
                                            <span class="item--dscrptn">{iteam.description}</span>


                                            <div class="incr-price">
                                                <div class="price">
                                                    Quantity :<Select value={iteam.quantity} onChange={(value) => handleChange(value, iteam.id)} >
                                                        {quantity.map(item => (
                                                            <Option value={item}>{item}</Option>
                                                        )
                                                        )}
                                                    </Select>
                                                </div>
                                                <div class="price">
                                                    <div class="price--fnl" data-label="cart-item-price">
                                                        <span class="rupee"> Price : {iteam.price * iteam.quantity}</span>
                                                    </div>
                                                </div>

                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div></div>
        )
}

const mapStateToProps = state => {
    return {
        articles: state.about,
        cart: state.cart,
        itemPrice: state.itemPrice,
        tax: state.tax,
        delivery: state.delivery,
        total: state.total,
        quantity: state.quantity
    };
};

export default connect(mapStateToProps, { changeInput })(CheckOutItem);
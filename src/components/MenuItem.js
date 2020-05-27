import React, { Component } from 'react';
/* eslint-disable import/first */
import { Card } from 'antd';

import { Button, Radio } from 'antd';

const { Meta } = Card;
import { connect } from "react-redux";
import { changeInput } from "../js/actions/index";
import Item from 'antd/lib/list/Item';

const MenueItem = ({ iteam, cart, changeInput }) => {

    const addToCart = (id) => {
        let tempcart = cart.map((item) => (
            item.id === id ? { ...item, quantity: 1 } : item
        ))
        let itemPrice = tempcart.reduce((sum, i) => (
            sum += i.quantity * i.price
        ), 0)
        changeInput({ type: 'UPDATE_ITEM_PRICE', payload: itemPrice })
        changeInput({ type: 'UPDATE_CART', payload: tempcart })
    }

    const removeFromCart = (id) => {
        let tempcart = cart.map((item) => (
            item.id === id ? { ...item, quantity: 0 } : item
        ))
        let itemPrice = tempcart.reduce((sum, i) => (
            sum += i.quantity * i.price
        ), 0)
        changeInput({ type: 'UPDATE_ITEM_PRICE', payload: itemPrice })
        changeInput({ type: 'UPDATE_CART', payload: tempcart })
    }

    return (
        <div class="itm-wrppr">
            <div class='menu-iteam'>
                <Card
                    hoverable
                    cover={<img alt="example" src={iteam.img_url} />}
                >
                    <Meta title={iteam.name} description={iteam.description} />
                </Card>
                <div class="card-action ">
                    {iteam.quantity == 0 ?
                        <Button
                            type="primary"
                            size={'large'}
                            style={{ background: "#1fb31a", borderColor: "#1fb31a" }}
                            onClick={() => addToCart(iteam.id)}
                            block
                        >
                            Add To Cart
                        </Button> :
                        <Button
                            type="primary"
                            size={'large'}
                            style={{ background: "#f3223b", borderColor: "#f3223b" }}
                            onClick={() => removeFromCart(iteam.id)}
                            block
                        >
                            Remove From Cart
                    </Button>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    };
};

export default connect(mapStateToProps, { changeInput })(MenueItem);
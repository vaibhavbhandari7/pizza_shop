import React, { Component } from 'react';
import { connect } from "react-redux";
import Navigation from './Navigation';
import { changeInput } from "../js/actions/index";
import Progress from "./Progress";
import MenueItem from "./MenuItem";
import CartItem from "./CartItem";
import { Card } from 'antd';
import cookie from 'react-cookies';

import { Button, Radio } from 'antd';

const { Meta } = Card;
class Menu extends Component {

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      let tempcart = cookie.load('cart');
      if (typeof tempcart === 'object') {
         let itemPrice = tempcart.reduce((sum, i) => (
            sum += i.quantity * i.price
         ), 0)
         this.props.changeInput({ type: 'UPDATE_ITEM_PRICE', payload: itemPrice })
         this.props.changeInput({ type: 'UPDATE_CART', payload: tempcart })
      }
      if (typeof tempcart !== 'object') {


         fetch('/api/menu').then(res => res.json())
            .then(
                (result) => {
                  tempcart = result.menu;
                  this.props.changeInput({ type: 'UPDATE_CART', payload: tempcart })
                },
                (error) => {
                    console.log(error);
                }
            )
      }
      
      
   }

   render() {
      return (
         <div>
            <Navigation />
            <div class="menu-cnt">
               <Progress current={0} />
            </div>
            <div class="menu-cnt">
               <div class="menu-left">
                  <div style={{ display: "block" }}>
                     <div class="itm-container">
                        {
                           this.props.cart.map(iteam => (
                              <MenueItem iteam={iteam} />
                           )
                           )
                        }
                     </div>

                  </div>
               </div>
               <div class="menu-right">
                  <div>
                     <div class="cnt">
                        <hr class="crt-hdr-ln" />
                        <div class="crt-itms">
                           {
                              this.props.cart.map(iteam => (
                                 <CartItem iteam={iteam} />
                              )
                              )
                           }
                        </div>
                        <div class="chkot-ftr">
                           <div class="chkot-ftr-prc">
                              <span class="sb-ttl-hdn">Subtotal</span>
                              <span class="rupee sb-ttl">{this.props.itemPrice}</span>
                           </div>
                           <div class="gAzPKu">
                              <Button
                                 type="primary"
                                 size={'large'}
                                 style={{ background: "#1fb31a", borderColor: "#1fb31a" }}
                                 href="/cart"
                                 block
                              >
                                 CheckOut
                                        </Button>
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
      cart: state.cart,
      itemPrice: state.itemPrice
   };
};

export default connect(mapStateToProps, { changeInput })(Menu);
import { ADD_ABOUT } from "../constants/index";

const initialState = {
  about: "vaibhav vaibhav vaibhav",
  cart: [],
  quantity: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  itemPrice: 0,
  tax: 0,
  delivery: 0,
  total: 0,
  name: '',
  address: '',
  mobile: '',
  otp: Math.floor(1000 + Math.random() * 9000),
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ABOUT) {
    return Object.assign({}, state, {
      about: action.payload
    });
  } else if (action.type === "UPDATE_CART") {
    return Object.assign({}, state, {
      cart: action.payload
    })
  } else if (action.type === "UPDATE_ITEM_PRICE") {
    return Object.assign({}, state, {
      itemPrice: action.payload
    })
  } else if (action.type === "UPDATE_TAX") {
    return Object.assign({}, state, {
      tax: action.payload
    })
  } else if (action.type === "UPDATE_DELIVERY") {
    return Object.assign({}, state, {
      delivery: action.payload
    })
  } else if (action.type === "UPDATE_NAME") {
    return Object.assign({}, state, {
      name: action.payload
    })
  } else if (action.type === "UPDATE_ADDRESS") {
    return Object.assign({}, state, {
      address: action.payload
    })
  } else if (action.type === "UPDATE_MOBILE") {
    return Object.assign({}, state, {
      mobile: action.payload
    })
  } else if (action.type === "UPDATE_TOTAL") {
    return Object.assign({}, state, {
      total: action.payload
    })
  } else if (action.type === "UPDATE_OTP") {
    return Object.assign({}, state, {
      total: action.payload
    })
  }

  return state;
}

export default rootReducer;
import { ADD_ABOUT } from "../constants/index";
import cookie from 'react-cookies'

export function addAbout(payload) {
  return { type: ADD_ABOUT, payload };
}
export function changeInput({type, payload}) {
  if(type == 'UPDATE_CART'){
    cookie.save('cart', JSON.stringify(payload), { path: '/' })
  }
  return { type, payload }
}
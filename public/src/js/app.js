import $ from 'jquery';
import 'bootstrap';

import {add, substr} from './modules/math';
import base from './modules/base'

const item1Price = 400;
const item2Price = 600;
const coupon = 300;
const totalPrice = add(item1Price,item2Price);
const priceAfterApplyCoupon = substr(totalPrice,coupon);

$(function(){
    $('.xxx').text(priceAfterApplyCoupon + '円');
})

import Cookies from 'js-cookie';

export const removeCookies = () => {
   Cookies.remove('firstName');
   Cookies.remove('lastName');
   Cookies.remove('address');
   Cookies.remove('address2');
   Cookies.remove('zipcode');
   Cookies.remove('city');
   Cookies.remove('phone');
   Cookies.remove('email');
   Cookies.remove('dni');

   Cookies.remove('cart');
   Cookies.remove('shipping');
   Cookies.remove('coupons');
   Cookies.remove('referralCoupon');
   Cookies.remove('referralDiscount');
   Cookies.remove('points');
   Cookies.remove('total');
};

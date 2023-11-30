import Cookies from 'js-cookie';

export const removeCookies = () => {
   Cookies.remove('firstName');
   Cookies.remove('lastName');
   Cookies.remove('address');
   Cookies.remove('address2');
   Cookies.remove('zipcode');
   Cookies.remove('city');
   Cookies.remove('city2');
   Cookies.remove('phone');
   Cookies.remove('email');
   Cookies.remove('dni');

   localStorage.removeItem('cart');

   Cookies.remove('cart-middleware');
   Cookies.remove('shipping');
   Cookies.remove('coupons');
   Cookies.remove('referralCoupon');
   Cookies.remove('referralDiscount');
   Cookies.remove('points');
   Cookies.remove('total');
};

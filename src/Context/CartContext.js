import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { userContext } from './TokenContext';

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartNumber, setCartNumber] = useState(0);
  const endPoint = "https://ecommerce.routemisr.com/api/v1/cart";

  function addToCart(id) {
    const header = { token: localStorage.getItem('userToken') };

    return axios.post(
      `${endPoint}`,
      { productId: id },
      { headers: header }
    );
  }

  function getCart() {
    const header = { token: localStorage.getItem('userToken') };
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`, 
      { headers: header }
    );
  }
  function updateCart(id, count) {
    const header = { token: localStorage.getItem('userToken') };

    return axios.put(
      `${endPoint}/${id}`, 
      { count: count },
      { headers: header }
    );
  }

  function deleteCart(id) {
    const header = { token: localStorage.getItem('userToken') };

    return axios.delete(
      `${endPoint}/${id}`, 
      { headers: header }
    );
  }

  function clearCart() {
    const header = { token: localStorage.getItem('userToken') };

    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`, 
      { headers: header }
    );
  }

  function checkoutPayment(id,dataForm) {
    const header = { token: localStorage.getItem('userToken') };
    
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, 
      { shippingAddress: dataForm },
      { headers: header }
    );
  }

  return (
    <cartContext.Provider value={{ checkoutPayment,updateCart, deleteCart, getCart, addToCart, cartNumber, setCartNumber,clearCart }}>
      {children}
    </cartContext.Provider>
  );
}
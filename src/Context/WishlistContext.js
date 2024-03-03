import { createContext, useState } from "react";
import axios  from 'axios';

export const wishlistContext = createContext();
export default function WishListContextProvider({ children }) {
  

    const  [wishlist, setWishlist] = useState([])
    let endPoint ="https://ecommerce.routemisr.com/api/v1/wishlist";
    let header ={
        token:localStorage.getItem('userToken')
    }
    function addToWishlist(id){
        return axios.post(`${endPoint}`,
        {
            productId:id
        },
        {
            headers:header
        },
   
        )
    } 
    function getWishlist() {
      const header = { token: localStorage.getItem('userToken') };
  
      return axios.get(
        `${endPoint}`,
        { headers: header }
      );
    }

    function deleteFromWishlist(id) {
      const header = { token: localStorage.getItem('userToken') };
  
      return axios.delete(
        `${endPoint}/${id}`, 
        { headers: header }
      );
    }


   
 

  return (
    <wishlistContext.Provider value={{addToWishlist,wishlist,setWishlist,getWishlist,deleteFromWishlist}}>
      {children}
    </wishlistContext.Provider>
  );
}

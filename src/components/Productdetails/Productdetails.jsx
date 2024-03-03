import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Context/WishlistContext';

export default function Productdetails() {
  let params = useParams(); 
  let productId = params.id;
  const {addToCart,setCartNumber} = useContext(cartContext);
  const [productDetails, setProductDetails] = useState(null)
  const {addToWishlist,wishlist,setWishlist} = useContext(wishlistContext)

  async function getProductDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    console.log(data.data)
    setProductDetails(data.data)
  }
  async function addItemToCart(id){
    let {data} = await addToCart(id);
    if(data.status === "success"){
      toast.success(data.message)
      setCartNumber(data.numOfCartItems)
    }
  }

  async function addProductToWishlist(id) {
    let { data } = await addToWishlist(id);
    if (data.status === 'success') {
      toast(data.message);
      setWishlist((prevWishlist) => [...prevWishlist,id]);
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [productId])

  return (
    <div className='container py-5'>
      <div className="row py-5 shadow ">
        <div className="col-md-3">
          {productDetails ? <img src={productDetails.imageCover} className='w-100' alt={productDetails.title} /> : null}
        </div>
        <div className="col-md-9 d-flex flex-column justify-content-around ">
          <div>
            {productDetails ? <h2>{productDetails.title}</h2> : null}
            {productDetails ? <p>{productDetails.description}</p> : null}
          </div>
          <div className='position-relative' >
            {productDetails?.category ? <p className='fw-bold'>{productDetails.category.name}</p> : null}
          <div className='d-flex justify-content-between'>
            <p className="fw-bold h5"><span className='fw-semibold h6'>EGP </span>{productDetails?.price}</p>
            <p className='fw-bold'><span className="text-success "> </span>{productDetails?.ratingsAverage} <i className='fa-solid fa-star text-warning'></i></p>
           
            </div>
            <div className='d-flex justify-content-between'>
            <button className='btn btn-success' onClick={() => {addItemToCart(productDetails?._id)}}>+ Add to cart</button>
            <button onClick={() => addProductToWishlist(productDetails?._id)} className='btn btn-link'>
                <i className={wishlist.includes(productDetails?._id) ? 'fas fa-heart fs-3 text-danger' : 'far fa-heart fs-3 text-dark'} ></i>
            </button>
           </div>
        </div>
      </div>
    </div>
    </div>
  )
}
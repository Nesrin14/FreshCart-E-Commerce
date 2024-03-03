import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Context/WishlistContext';

export default function FeaturedProduct() {
  const [products, setProducts] = useState([]);
  const {addToCart,setCartNumber} = useContext(cartContext)
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const {addToWishlist,wishlist,setWishlist} = useContext(wishlistContext)

  async function getProducts() {
    try {

  
      let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(res.data.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setProducts([]);
      setLoading(false);
      setError(err.response.data.message);
    }
  }

  function handleHover(product) {
    setHoveredProduct(product);
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
    getProducts();
  }, []);

  return (
    <section className='py-5' style={{ minHeight: '100vh' }}>
      {isLoading && (
        <div className='d-flex justify-content-center align-items-center bg-white vh-100 '>
          <PuffLoader color="#16d7b7" />
        </div>
      )}

      {error && (
        <div className='alert alert-danger'>
          {error}
        </div>
      )}

      {products && (
        <div className="container">
          <h2 className='fw-light text-success'>Products</h2>

          <div className="row g-4">
          {products.map((product) => (
                <div key={product._id} className={`${hoveredProduct === product ? 'border border-success rounded ' : ''} p-2  col-md-2 position-relative`} onMouseEnter={() => handleHover(product)} onMouseLeave={() => handleHover(null)}>
                <Link to={`/productdetails/${product._id}`} className='no-underline'>
                <img className='w-100 img-fluid' src={product.imageCover} alt={product.title} />
                <h3 className=' py-2 h6  text-success'>{product.category.name}</h3>
                <h4 className='h6 fw-light text-dark'>{product.title.split(' ').splice(0,3).join(' ')}</h4>
                <div className="d-flex justify-content-between">
                  <h5 className='h6 text-dark '>{product.price} EGP</h5>
                  <h5 className='h6 text-dark'> {product.ratingsAverage} <i className=' fas fa-star text-warning'></i></h5>
                </div>    
                </Link>
                <div className='d-flex justify-content-between'>
                <div className='add-cart d-flex  align-items-center p-2'>
                 <button className='btn btn-success' onClick={() => {addItemToCart(product._id)}}>
                  + Add to cart
                  </button>
                 </div>
                <div>
                 <button onClick={() => addProductToWishlist(product._id)} className='btn btn-link'>
                <i className={wishlist.includes(product._id) ? 'fas fa-heart fs-3 text-danger' : 'far fa-heart fs-3 text-dark'} ></i>
            </button>
            </div>
          </div>
        </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
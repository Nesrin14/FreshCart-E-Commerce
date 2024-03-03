import React, { useContext, useEffect, useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Context/WishlistContext';
import { cartContext } from '../../Context/CartContext';

export default function Wishlist() {
  const { getWishlist, deleteFromWishlist } = useContext(wishlistContext);
  const { addToCart, setCartNumber } = useContext(cartContext);
  const [isLoading, setLoading] = useState(true);
  const [wishlistDetails, setWishlistDetails] = useState(null);

  async function displayWishlistItems() {
    try {
      const response = await getWishlist();
      setLoading(false);
      if (response?.data.status === 'success') {
        setWishlistDetails(response?.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  async function removeWishlistItem(id) {
    try {
      const { data } = await deleteFromWishlist(id);
      if (data.status === 'success') {
        toast.success('Product removed successfully from your wishlist');
        displayWishlistItems();
      } else {
        toast.error('Error in removing the product from your wishlist');
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      toast.error('Error removing product from wishlist');
    }
  }

  async function addItemToCart(id) {
    try {
      const { data } = await addToCart(id);
      if (data.status === 'success') {
        toast.success(data.message);
        setCartNumber(data.numOfCartItems);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error adding item to cart');
    }
  }

  useEffect(() => {
    displayWishlistItems();
  }, []);

  return (
    <div className='container py-5 '>
      {isLoading ? (
       <div className='d-flex justify-content-center align-items-center bg-white vh-100 '>
       <PuffLoader color="#16d7b7" />
     </div>
        
      ) : wishlistDetails === null ? (
        <h2>Your Cart Is Empty</h2>
      ) : (
        <div className='bg-light p-5 mt-5'>
          <h2 className='h1 fw-bolder mb-4'>My Wishlist</h2>
          <h2 className='h6 fw-bold mt-4 text-end'> Number Of Items: <span className='text-success'>{wishlistDetails.count}</span>
          </h2>
          {wishlistDetails.data.map((product) => (
            <div
              className='row justify-content-between align-items-center g-4 py-3 border-bottom border-1 border-dark border-opacity-25'
              key={product._id}
            >
              <div className='col-md-4 col-lg-3'>
                <img src={product.imageCover} alt={product.title} className='w-100' height={300} />
              </div>
              <div className='col-md-8 '>
                <div className='row flex-column flex-lg-row justify-content-between '>
                  <div className='col-lg-6'>
                    <h3 className=' fw-bold mb-3'>
                      {product.title.split(' ').splice(0, 3).join(' ')}
                    </h3>
                    <span className='fw-bold me-3 '> Price {product.price} EGP</span>
        
                    <span className='d-block mt-3'>
                      <i className='fa-solid fa-star text-warning pe-2'></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                  <div className='col-lg-6 text-lg-end mt-3 mt-lg-0'>
                    <div className='row align-items-stretch'>
                      <div className='col-md-6'>
                        <button
                          className='btn btn-outline-danger me-lg-3 mb-2 d-block w-100 h-100'
                          onClick={() => {
                            removeWishlistItem(product._id);
                          }}
                        >
                          <i className='fa-solid fa-trash me-2'></i> Remove
                        </button>
                      </div>
                      <div className='col-lg-6'>
                        <button
                          className='btn btn-success countBtn d-block w-100 h-100'
                          onClick={() => {
                            addItemToCart(product._id);
                          }}
                        >
                          + Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../../Context/TokenContext'
import { cartContext } from '../../Context/CartContext'
import { useEffect } from 'react';

export default function Navbar() {
 let {userToken , setToken} = useContext(userContext)
 const{cartNumber,setCartNumber,getCart} = useContext(cartContext)

 let handleLogout = ()=>{
  setToken(null)
  localStorage.removeItem('userToken')

 }

 useEffect(() => {
  (async () => {
    try {
      let { data } = await getCart();
      setCartNumber(data.numOfCartItems);
    } catch (error) {
      console.error( error);
    }
  })();
}, []);

  return (
  <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light py-4 shadow"
      >
        <div className="container ">
          <a className="navbar-brand" href="#">
          <i className="text-success fa-solid fa-cart-shopping px-1"></i>
          <span className='fw-bold'>FreshCart</span></a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="collapsibleNavId">
            {
              userToken && <ul className="navbar-nav me-auto mt-2 mt-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brand">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart"><i className='fa-solid fa-shopping-cart text-success px-3'><span className='badge text-light bg-success'>{cartNumber}</span></i>
                
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/allorders">My Orders</Link>
              </li>
              <li className="nav-item d-flex align-items-center">
            <i className="fa-brands fa-facebook mx-2 "></i>
            <i className="fa-brands fa-twitter mx-2"></i>
            <i className="fa-brands fa-instagram mx-2"></i>
            <i className="fa-brands fa-linkedin mx-2"></i>
            </li>

            </ul>
            }
            
            
            
               <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {
              userToken ? 
              <li className="nav-item">
                <Link className="nav-link" onClick={()=>{handleLogout()}} >Logout</Link>
              </li>
              :<>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">SignIn</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Register</Link>
              </li>
              </>
              }
            </ul>
          </div>
        </div>
      </nav>
      


  </>
  )
}

import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const { getCart, deleteCart, updateCart, setCartNumber,clearCart } = useContext(cartContext);

  async function removeProduct(id) {
    let { data } = await deleteCart(id);
    setData(data.data.products);
    setCartNumber(data.numOfCartItems);
  }

  async function updateProduct(id, count) {
    let { data } = await updateCart(id, count);
    if (count === 0) {
      removeProduct(id);
    } else {
      setData(data.data.products);
      setCartNumber(data.numOfCartItems);
    }
  }
  async function clearProductCart(){
    let {data} = await clearCart();
    if(data.message === 'success'){
      setData([])
      setPrice(0)
    }
    
  }

  useEffect(() => {
    (async () => {
      try {
        let { data } = await getCart();
        setData(data.data.products);
        setPrice(data.data.totalCartPrice);
      } catch (error) {
        console.error( error);
      }
    })();
  }, []);
  
  return (
    <div className='container'>
  <h2 className='fw-bold  pt-5'>Shopping Cart</h2>
  <div className="row">
    <div className='row d-flex justify-content-between align-items-center bg-light shadow pb-5'>
      <div className='col-md-6'>
        <h4 className='fw-light h4 text-end pt-2'>Total Price <span className='h3 fw-semibold '>{price}</span></h4>
      </div>
      <div className='col-md-6'>
        <div className='d-flex justify-content-end'>
          <Link to='/onlinepayment'>
            <button className='btn btn-info text-light fw-semibold mx-2'>Checkout</button>
          </Link>
          <button className='btn btn-danger' onClick={clearProductCart}>Clear Cart</button>
        </div>
      </div>
    </div>
    <div className="col-md-11 bg-light shadow p-5 m-auto my-5 ">
          {data.length === 0 ? (
            <div className='d-flex justify-content-center align-items-center'>
             <img src={require('../../Assets/images/empty-cart.png.png')} 
             className=' w-50' 
             alt='Empty Shopping Cart' />  
            </div>
           
          ) : (
            data.map((pro) => (
              <div className="row border-bottom py-5" key={pro.id}>
                <div className='col-md-2'>
                  <img src={pro.product.imageCover} className='w-100' alt="cover" />
                </div>
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{pro.product.title}</h3>
                    <p className='fw-semibold '>Price <span className='fw-bold'>{pro.price}</span></p>
                    <button className='bg-transparent btn btn-outline-danger' 
                    onClick={() => { removeProduct(pro.product._id) }}>
                      <i className='fa-solid fa-trash-can bg-transparent text-danger'></i> Remove
                    </button>
                  </div>
                  <div>
                    <button className=' btn btn-outline-success fs-5 '
                     onClick={() => { updateProduct(pro.product._id, pro.count + 1) }}>+
                     </button>
                    <span className='mx-1 fw-bold'>{pro.count}</span>
                    <button className='btn btn-outline-danger fs-5'
                     onClick={() => { updateProduct(pro.product._id, pro.count - 1) }}>
                      -</button>
                  </div>
                </div>
               

              </div>
            ))
          )}
        </div>
        
      </div>
  
    </div>

  );
}
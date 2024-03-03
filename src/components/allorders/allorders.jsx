import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../Context/TokenContext';
import PuffLoader from 'react-spinners/PuffLoader';

export default function Allorders() {
  const { userId } = useContext(userContext);
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);

  async function getMyOrders() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      console.log(data);
      if (data?.length > 0) {
        setOrders(data);
      } else {
        setOrders(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className='container py-5'>
      <div>
        <h2 className='fw-bold p-3 text-start h1 border-bottom'>My Orders</h2>
      </div>
      <div>
        {isLoading ? (
          <div className='d-flex justify-content-center align-items-center'>
            <PuffLoader color='#16d7b7' />
          </div>
        ) : orders ? (
          orders.map((order) => (
            <div key={order.id} className='card mb-4 shadow row'>
              <div className='card-body bg-light shadow rounded-3'>
                <div className='row'>
                  {order.cartItems.map((item) => (
                    <div className='col-md-2' key={item.product._id}>
                      <img
                        className='w-100 img-fluid mb-2'
                        src={item.product.imageCover}
                        alt={item.product.title}
                      />
                      <h3 className='h6 text-success'>{item.product.category.name}</h3>
                      <h4 className='h6 fw-light text-dark'>
                        {item.product.title.split(' ').splice(0, 3).join(' ')}
                      </h4>
                      <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='h6 text-dark'>{item.product.price} EGP</h5>
                        <div className='d-flex align-items-center'>
                          <span className='h6 text-dark mr-1'>{item.product.ratingsAverage}</span>
                          <i className='fas fa-star text-warning'></i>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <h3 className='h5 card-title mt-3'>
                  <span className='fw-bold h4'>Client Details:{' '}</span>
                  Your city is{' '}
                  <span className='h5 text-info'> {order.shippingAddress.city}</span> @{' '}
                  {order.shippingAddress.details}, the logged phone number is{' '}
                  <span className='h5 text-info'>{order.shippingAddress.phone}</span>
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center fw-bold py-5 bg-light border shadow rounded-2'>
            <h4>There's no orders !!</h4>
          </div>
        )}
      </div>
    </div>
  );
}

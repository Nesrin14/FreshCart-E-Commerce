import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';

export default function OnlinePayment() {
 
  const { checkoutPayment,getCart } = useContext(cartContext);
  const [cardId,setCartId] = useState('')



  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      setCartId(data.data._id)
    })();
  }, []);


      async function payment(value) {
      let data = await checkoutPayment(cardId, value);
      if (data.data.status === "success") {
        console.log('hi')
        window.location=data.data.session.url
      }
    }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: payment,
  });

  return (
    <div className='my-4'>
      <h1 className='text-success display-5 fw-light my-4'>Payment Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row gy-4">
          <div className="col-md-8 bg-light rounded-4 shadow p-4 my-3 mx-auto">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="userDetails" className='fw-semibold'>
                  Details
                </label>
                <input
                  type="text"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  className='form-control'
                  id='userDetails'
                  name='details'
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="userNumber" className='fw-semibold'>
                  Phone
                </label>
                <input
                  type="number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className='form-control'
                  id='userNumber'
                  name='phone'
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="userCity" className='fw-semibold'>
                  City
                </label>
                <input
                  type="text"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  className='form-control'
                  id='userCity'
                  name='city'
                />
              </div>
              <div className="col-md-12 text-md-end my-3">
                <button className='btn btn-success text-light' type='submit' >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

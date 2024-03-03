import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function ForgotPass() {
  let [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Invalid Email'),
  });

 

  async function forgotPassSubmition(values) {
    setLoading(true);

    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
      navigate('/verify-code');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  } 
  
  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: forgotPassSubmition,
  });
  return (
    <div className="container py-5 my-3 mx-auto ">
      <h2 className='text-center'>Forgot Password</h2>
      {error ? (
        <div className="alert alert-danger px-2 py-1 text-center">{error}</div>
      ) : (
        ''
      )}
 
      <h1 className="h4 text-main text-center fw-bold"></h1>
      <form method="post" onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="fw-semibold">  Please Enter Your Email: </label>
        <input type="email"  value={formik.values.email} id="email" name="email" onChange={formik.handleChange} className="form-control my-2 py-2" onBlur={formik.handleBlur}/>
        {formik.errors.email ? (
          <div className="alert alert-danger p-2">{formik.errors.email}</div>
        ) : (
          ''
        )}
        {isLoading ? (
          <button type="button" className=" btn btn-outline-success px-3 rounded-2" > <i className="fa-spinner fa-solid fa-spin  mx-2"></i> </button>
        ) : (
          <button type="submit" className="btn btn-outline-success "> Submit </button>
        )}
      </form>
    </div>
  );
}

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/TokenContext';
export default function Signin() {
  let { setToken}= useContext(userContext)
  const [isLoading, setLoading] = useState(false);
  const [errmsg, setError] = useState(null);

  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, 'Invalid password format.'),
   
  });

  let signIn = async (value) => {
    setLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value);
      if (data.message === 'success') {
      navigate('/home');
      setError(null);
      setLoading(false);
      localStorage.setItem('userToken',data.token)
      setToken(data.token)
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: signIn,
  });

  return (
    <div className='my-4'>
      <h2 className='text-success fw-bolder h1 my-4'>Login Now!</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row gy-4">
          <div className="col-md-8 bg-light rounded-4 shadow p-4 my-3 mx-auto">
            <div className="row">
              
              <div className="col-md-12 mb-3">
                <label htmlFor="useremail" className='fw-semibold'>
                  Email:
                </label>
                <input type="email"  value={formik.values.email}  onBlur={formik.handleBlur}  onChange={formik.handleChange} className='form-control' id='useremail' name='email'
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className='text-danger fs-6'>{formik.errors.email}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="userpassword" className='fw-semibold'>
                  Password:
                </label>
                <input type="password"  value={formik.values.password}  onBlur={formik.handleBlur}  onChange={formik.handleChange} className='form-control' id='userpassword' name='password'
                />
                <p className='py-3'><Link className='fw-bold no-underline py-3' to='/forgotpassword'>Forgot Your Password?</Link></p>
                {formik.touched.password && formik.errors.password ? (
                  <p className='text-danger fs-6'>{formik.errors.password}</p>
                ) : (
                  ''
                )}
              </div>
               
               {errmsg !== null ? <p className='text-danger fw-semibold'>{errmsg}</p> : ''}
              <div className="col-md-12 d-flex justify-content-between text-md-end my-3">
              
                <button className='btn btn-success ' type='submit'>
                  LogIn
                  {isLoading ? (
                    <span>
                      <i className='fa-spinner fa-solid fa-spin text-light mx-2'></i>
                    </span>
                  ) : (
                    ''
                  )}
                </button>
              
              <p className='text-black fw-bold'>Don't have an account?<Link className='text-success fw-semibold' to="/signup"> Register</Link>
              </p>
            </div></div>
          </div>
        </div>
      </form>
    </div>
  );
}

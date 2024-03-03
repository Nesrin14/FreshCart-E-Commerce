import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Signup() {
  let navigate = useNavigate(); 
  const [isLoading, setLoading] = useState(false); 
  const [errmsg, setError] = useState(null);

  let validationSchema = Yup.object({  
    name: Yup.string().min(3, 'min length is 3').max(10, 'max length is 10').required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, 'Invalid password format.'),
    rePassword: Yup.string().required('Confirmation password is required').oneOf([Yup.ref('password'), 'passwords do not match']),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Phone is required'),
  });

  let signUp = async (value) => {  
    setLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value);
      if (data.message === 'success') {
        navigate('/signin');
        setError(null);
        setLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
    
  };

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: signUp,
  });

  return (
    <div className='my-4'>
      <h2 className='text-success h1 fw-bold  my-4'>Register Form</h2>
      <form onSubmit={formik.handleSubmit}> 
        <div className="row gy-4">
          <div className="col-md-8 bg-light rounded-4 shadow p-4 my-3 mx-auto">
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="username" className='fw-semibold'>
                  Name:
                </label>
                <input type="text"  value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' id='username' name='name'/>
                {formik.touched.name && formik.errors.name ? (
                  <p className='text-danger fs-6'>{formik.errors.name}</p>
                ) : ( '' )}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="useremail" className='fw-semibold'>
                  Email:
                </label>
                <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' id='useremail' name='email'/>
                {formik.touched.email && formik.errors.email ? (
                  <p className='text-danger fs-6'>{formik.errors.email}</p> )
                   : ('')}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="userpassword" className='fw-semibold'>
                  Password:
                </label>
                <input type="password"  value={formik.values.password} onBlur={formik.handleBlur}  onChange={formik.handleChange} className='form-control' id='userpassword' name='password'
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className='text-danger fs-6'>{formik.errors.password}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="userconfirmation" className='fw-semibold'>
                  Repassword:
                </label>
                <input type="password"  value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' id='userconfirmation'  name='rePassword'
                />
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <p className='text-danger fs-6'>{formik.errors.rePassword}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="userphone" className='fw-semibold'>
                  Phone:
                </label>
                <input type="tel" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' id='userphone' name='phone'/>
                {formik.touched.phone && formik.errors.phone ? (
                  <p className='text-danger fs-6'>{formik.errors.phone}</p>
                ) : (
                  ''
                )}
              </div> 
               {errmsg !== null ? <p className='text-danger fw-semibold'>{errmsg}</p>
                : ''
                }
              <div className="col-md-12 text-md-end my-3">
              
                <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-success text-light' type='submit'>
                  Register
                  {isLoading ? (
                    <span>
                      <i className='fa-spinner fa-solid fa-spin text-light mx-2'></i>
                    </span>
                  ) : (
                    ''
                  )}
                </button>
              </div>
              <p className='text-black fw-bold'>
                Already have an account? <Link className='text-success fw-semibold' to="/signin"> LogIn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

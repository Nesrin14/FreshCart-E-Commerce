import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ResetPass() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is Required').email('Invalid Email'),
    newPassword: Yup.string() .required('New Password is Required') .matches( /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must be at least 8 characters long and include at least one letter and one number.'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: resetPassword,
  });

  async function resetPassword(values) {
    setLoading(true);
    try {
      let {data} = await axios.put( 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      setLoading(false);
      // console.log(data);
      navigate('/signin')
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);  
    }
  }

  return (
    <div className="my-3 py-5 container mx-auto ">
      {error && (
        <div className="alert alert-danger p-2 text-center">{error}</div>
      )}

      <h1 className="h4 text-main text-center fw-bold mb-3">Reset Password</h1>
      <form method="post" onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className="fw-semibold">  Email: </label>
        <input type="email" name="email"  value={formik.values.email} onChange={formik.handleChange} id="email"  className="form-control p-2 my-3"   onBlur={formik.handleBlur}/>
        {formik.errors.email && (
          <div className="alert alert-danger px-2 py-1">{formik.errors.email}</div>
        )}
        <label htmlFor="newPassword" className="fw-semibold"> New Password: </label>
        <input type="password"  name="newPassword"  value={formik.values.newPassword}  onBlur={formik.handleBlur} id="newPassword"  className="form-control my-3 p-2"  onChange={formik.handleChange} />
        {formik.errors.newPassword && (
          <div className="alert alert-danger px-2 py-1">
            {formik.errors.newPassword}
          </div>
        )}
        {isLoading ? (
          <button type="button" className="btn btn-outline-success btn p-2 rounded-1" ><i className="fa-spinner fa-solid fa-spin  mx-2"></i> </button>
        ) : (
          <button type="submit" className="btn btn-outline-success "> Submit </button>
        )}
      </form>
    </div>
  );
}

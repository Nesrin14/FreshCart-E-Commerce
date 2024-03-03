import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
export default function VerifyCode() {
  
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let validationSchema = Yup.object({
    resetCode: Yup.string().required('Reset Code is required').matches(/^[0-9]+$/, 'Reset code is Invalid, it should contain only numbers.'),
  });
  
  async function resetCode(values) {
    setLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      navigate('/reset-password');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }
let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema : validationSchema,
    onSubmit: resetCode,
  });

  return (
    <div className="py-5 my-3 mx-auto container">
      <h2 className='h1 text-center'>Reset Code</h2>
      {error ? (
        <div className="alert alert-danger px-2 py-1 text-center">{error}</div>
      ) : (
        ''
      )}
      <form method="post" onSubmit={formik.handleSubmit}>
        <p className="text-center text-danger fs-5 fw-semibold">
        We've sent a reset code to your E-mail, please check it and enter the code.
        </p>
        <label htmlFor="resetCode" className="fw-semibold"> Enter Reset Code:  </label>
        <input type="text" name="resetCode" onBlur={formik.handleBlur} value={formik.values.resetCode} id="resetCode" onChange={formik.handleChange} className="form-control my-3" />
        
      {formik.errors.resetCode ? (
          <div className="alert alert-danger p-2">{formik.errors.resetCode}</div>
        ) : (
          ''
        )}
      {isLoading ? (
          <button type="button" className=" btn btn-outline-success px-3 rounded-2" >
            <i className="fa-spinner fa-solid fa-spin  mx-2"></i>
          </button>
        ) : (
          <button type="submit" className="btn btn-outline-success ">
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

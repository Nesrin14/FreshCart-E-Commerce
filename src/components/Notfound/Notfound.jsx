import React from 'react'

export default function Notfound() {
  return (
    <div className='container m-5 p-5'>
     <div className='row'>
      <div className="col-md-10 d-flex flex-column justify-content-center align-items-center">
        <h2 className='fw-bold'>Page Not Found </h2>
        <img src={require('../../Assets/images/404.png')} className='w-100' alt="" />
      </div>
     </div>
      

    </div>
  )
}

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const getBrands = async () => {
  const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  return response.data;
};
const Brands = () => {
  const { isError, error, isLoading, data } = useQuery('brands', getBrands);
  const [isLayer, setLayer] = useState(null);
  const [isClosed, setClosed] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (isLoading) return  <div className='d-flex justify-content-center align-items-center bg-white vh-100 '>
  <PuffLoader color="#16d7b7" />
</div>;
  if (isError) return <div>Error: {error.message}</div>;

  function handleClick(id) {
    setLayer(id);
    setClosed(false);
  }

  function handleClose() {
    setLayer(null);
    setClosed(true);
  }
  function handleHover(brand) {
    setHoveredProduct(brand);
  }

  return (
    <div className='row pb-5 g-4 position-relative'>
      <h2 className='text-center h1 text-success py-4'>All Brands</h2>
      {data.data.map((brand) => {
        return (
          <>
            <div className={`${hoveredProduct === brand ? 'border border-success rounded' : ''} p-2 col-md-3 rounded-2 `}  onMouseEnter={() => handleHover(brand)} onMouseLeave={() => handleHover(null)}>
              <img src={brand.image} className='w-100' alt={brand.name} onClick={() => handleClick(brand._id)} />
              <h6 className='text-center'>{brand.name}</h6>
            </div>
            {isLayer === brand._id && (
              <div className='layer position-absolute top-0 mx-auto bg-white w-100 p-4 border-2 border rounded-1'>
                <button className='position-absolute top-0 end-0 fs-4 px-4 btn-close' onClick={()=>{handleClose()}}></button>
                <div className='row position-relative'>
                  <div className='col-md-6'>
                    <h2 className='text-success'>{brand.name}</h2>
                    <p>{brand.name}</p>
                  </div>
                  < div className='col-md-6'>
                    <img src={brand.image} className='w-50' alt='' />
                  </div>
                  <div className='position-absolute bottom-0 end-0'>
                    <button className='btn btn-dark' onClick={handleClose}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Brands;
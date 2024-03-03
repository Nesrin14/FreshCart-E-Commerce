import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PuffLoader from 'react-spinners/PuffLoader';

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  async function getCategories() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data);
    setLoading(false);
  }

  async function getSubCategoryInCategory(id) {
    setLoading(true); 
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    setSubCategories(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (subCategories.length > 0) {
      document.getElementById('subCategoriesSection').scrollIntoView({ behavior: 'smooth' });
    }
  }, [subCategories]);

  function handleHover(category) {
    setHoveredProduct(category);
  }

  return (
    <div className='container my-5'>
      {isLoading && (
        <div className='d-flex justify-content-center align-items-center bg-white vh-100 '>
          <PuffLoader color="#16d7b7" />
        </div>
      )}
      <h2 className='my-4 text-center h1 text-success'>All Categories</h2>
      <div className='row g-4'>
        {category.map((category) => (
          <div
            className={`${hoveredProduct === category ? 'rounded shadow border-2 border' : ''} p-2 col-md-4 position-relative`}
            key={category._id}
            onMouseEnter={() => handleHover(category)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => getSubCategoryInCategory(category._id)}
          >
            <div className='card'>
              <img
                src={category.image}
                className='card-img-top'
                alt={category.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className='card-body'>
                <h3 className='text-center text-success text-semibold'>{category.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {subCategories.length > 0 && (
        <div className='subCategories my-5' id="subCategoriesSection">
          <h2 className='mb-4 text-center h2 text-success'>Subcategories</h2>
          <div className="row g-4">
            {subCategories.map((subCat) => (
              <div className="col-md-4 " key={subCat._id}>
                <div className="card border-success text-center ">
                  <div className="card-body">
                    <h4 className="card-title">{subCat.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

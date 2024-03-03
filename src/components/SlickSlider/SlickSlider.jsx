import slider1 from '../../Assets/images/slider-image-3.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-1.jpeg'
import banner1 from '../../Assets/images/grocery-banner-2.jpeg'
import banner2 from '../../Assets/images/grocery-banner.png'
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

export default function SlickSlider() {
  const [categoryList, setCategory] = useState([]);

  async function getCategory() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data);
    console.log(data);
  }
  

  useEffect(() => {
    getCategory();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  var settingsMain = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = categoryList.map((category) => {
    return {
      src: category.image,
      alt: category.name,
    };
  });

  return (<>
    <div className='row g-0 pt-3'>
      <div className='col-md-8 '>
      <Slider {...settingsMain}>
        <img src={slider1} className='w-100' height={500} alt="" />
        <img src={slider2} className='w-100' height={500} alt="" />
        <img src={slider3} className='w-100' height={500} alt="" />
        </Slider>
      </div>
      
      <div className='col-md-4'>
        <img src={banner1} className='w-100' height={250} alt='' />
        <img src={banner2} className='w-100' height={250} alt='' />
      </div>
    </div>
    <div>
         <Slider {...settings}>
          {slides.map((slide) => {
            return (
              <div className='py-5'>
                <img src={slide.src} className='w-100' height={325} alt={slide.alt} />
                <h4 className='h5 py-2 fw-semibold'>{slide.alt}</h4>
              </div>
            );
          })}
        </Slider>
    </div>
    
</>
  );
}

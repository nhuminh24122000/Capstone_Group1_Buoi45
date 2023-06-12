import React from 'react'
import { useSelector } from 'react-redux';
import '../../assets/sass/components/carousel/carousel.scss'
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';

import polygon1 from '../../assets/imgs/Polygon 1.svg'
import polygon2 from '../../assets/imgs/Polygon 2.svg'

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='next arrow' onClick={onClick}>
      <img className='w-100' src={polygon1} alt="..." />
    </div>
  );
}

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='prev arrow' onClick={onClick}>
      <img className='w-100' src={polygon2} alt="..." />
    </div>
  );
}

const Carou = () => {
  const { product } = useSelector(state => state.productReducer)
  const carousel = product?.filter(item => item.id === 1 || item.id === 2 || item.id === 3)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings} >
        {carousel?.map((item, i) => {
          return <div className='carousel' key={i}>
            <div className='px-4'>
              <div className='d-lg-flex d-md-flex d-sm-flex d-none'>
                <div className='item-left position-relative'>
                  <img className='w-100 position-absolute top-50 start-50 translate-middle' src={item.image} alt="..." />
                </div>
                <div className='item-right'>
                  <h3 className='name'>{item.name}</h3>
                  <p className='description'>{item.description}</p>
                  <NavLink to={`/detail/${item.id}`} className='btn'>Buy now</NavLink>
                </div>
              </div>
            </div>
          </div>
        })}
      </Slider>
    </div>
  );
}

export default Carou;
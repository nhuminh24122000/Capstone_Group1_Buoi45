import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/sass/components/productFeature/cardItem.scss'

const CardItem = ({ item }) => {
  const [style1, setStyle1] = useState('fa-regular fa-heart')
  const [style2, setStyle2] = useState('fa-solid fa-heart')

  return (
    <div className='card'>
      <img className='px-5 pt-4 w-100' src={item.image} alt="..." />
      <div className='heart-icon' onClick={() => {
        const i = style1
        setStyle1(style2)
        setStyle2(i)
      }}><i className={style1}></i></div>
      <div className='card-body'>
        <h5 className='card-title'>{item.name}</h5>
        <p className='card-text'>{item.shortDescription}</p>
      </div>
      <div className='d-flex text-center'>
        <NavLink className='buy-btn w-50 text-dark py-3' to={`/detail/${item.id}`}>Buy now</NavLink>
        <div className='price w-50 py-3'>{item.price}$</div>
      </div>
    </div>
  )
}

export default CardItem
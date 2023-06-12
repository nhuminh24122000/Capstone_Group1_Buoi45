import React from 'react'
import '../../assets/sass/components/productDetail/productDetail.scss'

const ProductDetail = ({ productDetail }) => {
  return (
    <div className='productDetail'>
      <div className='container'>
        <div className='d-lg-flex d-md-flex'>
          <div className='item-left p-5'>
            <div className='img-item p-3 w-100'>
              <img className='p-5 w-100' src={productDetail?.image} alt="..." />
            </div>
          </div>
          <div className='item-right p-5'>
            <div className='info'>
              <h3 className='name'>{productDetail?.name}</h3>
              <p className='description'>{productDetail?.description}</p>
              <div className='size'>
                <h4 className='title'>Available size</h4>
                <div className='size-list d-flex'>
                  {productDetail?.size.map((item, i) => {
                    return <button className='size-box mx-1 my-3 btn' key={i}>
                      {item}
                    </button>
                  })}
                </div>
                <div className='price'>
                  <h4>{productDetail?.price}$</h4>
                </div>
                <div className='input'>
                  <button className='btn num-box'>+</button>
                  <input className='input-num mx-2 text-center' type="number" min={0} />
                  <button className='btn num-box'>-</button>
                </div>
                <button className='btn add-box mt-3'>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
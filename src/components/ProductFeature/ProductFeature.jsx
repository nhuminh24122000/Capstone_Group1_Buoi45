import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import '../../assets/sass/components/productFeature/productFeature.scss'
import { getProductApi } from '../../redux/reducers/productReducer'
import CardItem from '../CardItem/CardItem'

const ProductFeature = () => {
  const { product } = useSelector(state => state.productReducer)
  const dispatch = useDispatch();

  const getArrProductApi = async () => {
    dispatch(getProductApi());
  }

  useEffect(() => {
    getArrProductApi()
  }, []);

  return (
    <div className='productFeature py-5'>
      <h2 className='title ps-5 py-2 text-light'>Product Feature</h2>
      <div className='container pt-5'>
        <div className='row g-5'>
          {product?.map((item, i) => {
            return (
              <div className='col col-lg-4 col-md-6 col-sm-6 col-12' key={i}>
                <CardItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductFeature
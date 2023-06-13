import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/sass/components/productDetail/productDetail.scss";
import { getUserCartAction } from "../../redux/reducers/cartReducer";

const ProductDetail = ({ productDetail }) => {
  const [isActive, setIsActive] = useState()
  const { userCart } = useSelector((state) => state.cartReducer);
  const [quantity, setQuatity] = useState(1);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { value } = e.target;
    if (value < 0 || value === null) {
      value = 0;
    }
    setQuatity(value);
  };
  const handleClick = (num) => {
    let value = Number(quantity) + num;
    if (value < 0) {
      value = 0;
    }
    setQuatity(value);
  };
  const handleCart = () => {
    const index = userCart.findIndex(
      (item) => item.product.id === productDetail.id
    );
    if (index === -1) {
      const action = getUserCartAction({
        product: productDetail,
        quantity: quantity,
      });
      dispatch(action);
    }
  };
  return (
    <div className="productDetail">
      <div className="container">
        <div className="d-lg-flex d-md-flex">
          <div className="item-left p-5">
            <div className="img-item w-100">
              <img className="p-5 w-100" src={productDetail?.image} alt="..." />
            </div>
          </div>
          <div className="item-right p-5">
            <div className="info w-100">
              <h3 className="name">{productDetail?.name}</h3>
              <p className="description">{productDetail?.description}</p>
              <div className="size">
                <h4 className="title">Available size</h4>
                <div className="size-list">
                  {productDetail?.size.map((item, i) => {
                    return (
                      <button className={`size-box mx-1 my-3 btn ${isActive === i ? 'active' : null}`} key={i} onClick={() => {
                        setIsActive(i)
                      }}>
                        {item}
                      </button>
                    );
                  })}
                </div>
                <div className="price">
                  <h4>{productDetail?.price}$</h4>
                </div>
                <div className="input">
                  <button
                    className="btn num-box"
                    onClick={() => {
                      handleClick(1);
                    }}
                  >
                    +
                  </button>
                  <input
                    className="input-num mx-2 py-2 text-center"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <button
                    className="btn num-box"
                    onClick={() => {
                      handleClick(-1);
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  className="btn add-box mt-3"
                  onClick={() => {
                    handleCart();
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

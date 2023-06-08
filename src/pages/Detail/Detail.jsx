import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetailApi } from "../../redux/reducers/productReducer";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import ProductDetail from "../../components/ProductDetail/ProductDetail";

const Detail = () => {
  const { productDetail } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    const actionAsync = getProductDetailApi(param.id);
    dispatch(actionAsync);
  }, [param.id]);

  return (
    <div className="detail">
      <ProductDetail productDetail={productDetail} />
      <RelatedProduct relatedProducts={productDetail?.relatedProducts} />
    </div>
  );
};

export default Detail;

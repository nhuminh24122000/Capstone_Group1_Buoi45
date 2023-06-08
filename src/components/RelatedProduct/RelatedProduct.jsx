import React from "react";
import CardItem from "../CardItem/CardItem";
import "../../assets/sass/components/relatedProducts/relatedProducts.scss";

const RelatedProduct = ({ relatedProducts }) => {
  return (
    <div className="relatedProducts pt-4 pb-5">
      <h1 className="title pb-5">- Realate Product -</h1>
      <div className="container py-5">
        <div className="row g-5">
          {relatedProducts?.map((item, i) => {
            return (
              <div className="col col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                <CardItem item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;

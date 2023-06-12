import React, { useState } from "react";
import CardItem from "../CardItem/CardItem";
import "../../assets/sass/components/search/searchResult.scss";
import { useSelector } from "react-redux";

const SearchResult = () => {
  const { productSearch } = useSelector((state) => state.productReducer);
  const [listStyle, setListStyle] = useState('desc')
  const renderProductList = () => {
    if (productSearch?.length !== 0 & (productSearch ? true : false)) {
      return [...productSearch].sort(compareValues('price', listStyle)).map((item, i) => {
        return (
          <div className="col col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
            <CardItem item={item} />
          </div>
        );
      });
    }
  };
  const compareValues = (key, order = 'asc') => {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // nếu không tồn tại
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  return (
    <div className="searchResult">
      <h1 className="title ps-5 py-2 text-light">Search result</h1>
      <div className="container">
        <form>
          <div className="title-form">Price</div>
          <select id="list" name='list' onClick={(e) => {
            const { value } = e.target
            switch (value) {
              case 'decrease': {
                setListStyle('desc')
                break
              }
              case 'ascending': {
                setListStyle('asc')
                break
              }
            }
          }}>
            <option value="decrease">Decrease</option>
            <option value="ascending">Ascending</option>
          </select>
        </form>
        <div className="list-product my-5">
          <div className="row g-5">{renderProductList()}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

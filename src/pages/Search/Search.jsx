import React from 'react'
import SearchResult from '../../components/SearchResult/SearchResult'
import { useDispatch, useSelector } from 'react-redux'
import { getProductSearch, getSearch } from '../../redux/reducers/productReducer'

import '../../assets/sass/components/search/search.scss'

const Search = () => {
  const { search, product, productSearch } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const value = e.target.value;
    const action = getSearch(value);
    dispatch(action);
  };
  
  const handleSubmit = () => {
    const action = getProductSearch(
      product?.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          search === ""
      )
    );
    dispatch(action);
  };
  
  return (
    <div className="search">
      <div className="container">
        <div className="search-box pt-5 pb-4">
          <div className="title">Search</div>
          <input
            className="px-3 py-1"
            type="text"
            name="input-search"
            placeholder="Product name..."
            onChange={handleChange}
            value={search}
          />
          <button
            className="btn ms-3 rounded-pill px-4"
            onClick={() => {
              handleSubmit();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <SearchResult productList={productSearch} />
    </div>
  );
};
export default Search;
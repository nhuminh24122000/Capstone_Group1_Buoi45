import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { USER_LOGIN, ACCESS_TOKEN, deleteKey } from "../../util/index";

import logoSVG from '../../assets/imgs/logo.svg'

import '../../assets/sass/components/header/header.scss'
import { getSearch } from "../../redux/reducers/productReducer";
import { resetUserProfile } from '../../redux/slices/User';

const Header = () => {
  const { userProfile } = useSelector(state => state.userReducer)
  const { userCart } = useSelector((state) => state.cartReducer);
	const navigate = useNavigate();

	const handleLogout = () => {
		// chuyen ve login, xoa localstorage, reset userProfile tren redux
		navigate('/login');
		deleteKey(ACCESS_TOKEN)
		const action = resetUserProfile();
		dispatch(action)

		// call 1 api cho ben server

	}

	const navigateToCart = () => {
		if (!userProfile.email) {
			alert('You must login')
			 navigate('/login')
       return
		}
    console.log('run')
		navigate('/cart')
	}

  const [styleInput, setStyleInput] = useState('d-none')
  const [styleButton, setStyleButton] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const value = e.target.value;
    const action = getSearch(value);
    dispatch(action);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-black">
        <div className="container">
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLink className="navbar-brand" to="/">
            <img src={logoSVG} alt="" />
          </NavLink>
          <div className="d-flex">
            <div className="d-sm-inline d-none">
              <div className="d-flex my-2 my-lg-0">
                <div className="search d-flex">
                  <button
                    className={`${styleButton} btn text-light`}
                    onClick={() => {
                      setStyleInput(
                        "form-control ps-5 bg-black text-light w-100"
                      );
                      setStyleButton("button-search");
                    }}
                  >
                    <i className="fa fa-search" />
                  </button>
                  <input
                    className={styleInput}
                    placeholder="Search"
                    onBlur={() => {
                      setStyleInput("d-none");
                      setStyleButton("");
                    }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <NavLink className="btn text-light" to="/search"> Search </NavLink>
              </div>
            </div>
            <div className="d-flex my-2 my-lg-0">
              <div className="btn text-light" >
                <i onClick={navigateToCart} className="fa fa-cart-arrow-down icon-cart">
                  <span className="ms-1">({userCart.length})</span>
                </i>
              </div>
              
              {/* Render ra các button tùy theo trạng thái người dùng có log in hay không */}
              {userProfile.email ? (
						<>
							<p onClick={() => {
								navigate('/profile')
							}} className='header-user'>Hello, {userProfile.email}</p>
							<button className='logout' onClick={handleLogout}>Logout</button>
						</>
					) : (
						<>
							<NavLink className={'btn text-light header-link'} to={'/login'}>
								Login
							</NavLink>
							<NavLink className={'btn text-light header-link'} to={'/register'}>
								Register
							</NavLink>
						</>
					)}
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <div className="d-sm-none">
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                />
                <NavLink className="btn text-light" to="/search">
                  Search
                </NavLink>
              </form>
            </div>
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" aria-current="page">
                  Men
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" aria-current="page">
                  Woman
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" aria-current="page">
                  Kid
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" aria-current="page">
                  Sport
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
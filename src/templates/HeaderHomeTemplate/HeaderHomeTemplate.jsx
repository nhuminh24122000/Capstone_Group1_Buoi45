import React, { Fragment } from 'react'
import { LogoIcon } from '../../assets/icons'
import SearchSvg from '/src/assets/imgs/searchIcon.svg'
import { NavLink, useNavigate, redirect } from 'react-router-dom'
import './HeaderHomeTemplate.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteKey } from '../../util'
import { ACCESS_TOKEN } from '../../constant'
import { resetUserProfile } from '../../redux/slices/User'

function HeaderHomeTemplate() {
	const { userProfile } = useSelector(state => state.UserReducer)
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
			return navigate('/login')
		}
		navigate('/carts')
	}

  return (
    <Fragment>
        <header className='header-home-template'>
            <LogoIcon />
            <div className='header-nav-right'>
					<div className='header-search'>
						{/* <img src={SearchSvg} />
						<p className='header-text-search'>Search</p> */}
						<i onClick={navigateToCart} className="fa-solid fa-cart-shopping icon-cart"></i>
					</div>
					{userProfile.email ? (
						<>
							<p onClick={() => {
								navigate('/profile')
							}} style={{ color: 'white', cursor: 'pointer',}}>{userProfile.email}</p>
							<button className='logout' onClick={handleLogout}>Logout</button>
						</>
					) : (
						<>
							<NavLink className={'header-link'} to={'/login'}>
								Login
							</NavLink>
							<NavLink className={'header-link'} to={'/register'}>
								Register
							</NavLink>
						</>
					)}

					
				</div>
        </header>
    </Fragment>
  )
}

export default HeaderHomeTemplate
import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Detail = lazy(() => import('./pages/Detail/Detail'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Search = lazy(() => import('./pages/Search/Search'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<HomeTemplate />}>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='detail'>
                        <Route path=':id' element={<Detail />} />
                    </Route>
                    <Route path='search' element={<Search />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

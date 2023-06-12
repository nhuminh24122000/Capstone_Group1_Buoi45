import React from 'react'
import './Login.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'Yup';
import axios from 'axios';
import { saveLocalStorage } from '../../util';
import { ACCESS_TOKEN } from '../../constant';
import LoginFacebook from '../../components/LoginFacebook/LoginFacebook';

const schemaLogin = Yup.object({
  email: Yup.string()
    .email()
    .required('Email must fill in this section'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be at least 2 characters')
    .max(10, 'Must be 10 characters or less'),
})

function Login() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: schemaLogin,

    

    onSubmit: async (values) => {
      try {
        const resp = await axios.post('https://shop.cyberlearn.vn/api/Users/signin', {
          email: values.email,
          password: values.password,
        })
        console.log({resp});

        //accessToken lưu vào localStorage
        saveLocalStorage(ACCESS_TOKEN, resp.data.content.accessToken);
        saveLocalStorage('data', resp.data.content)

        navigate('/profile');

      }
      catch (err) {
        alert('Wrong Password or UserName')
      }
    }

  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-left">
            <img src="./src/assets/imgs/shoes-login.png" alt="" />
            <NavLink to="/register">Create an account?</NavLink>
          </div>
          <div className="login-right">
            <h1>Login</h1>
            <div className='register-info'>
              <div className="register-icon">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="register-input">
                <input 
                type="email" 
                placeholder='Your Email' 
                name='email'
                {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email && <p className="error-message">{formik.errors.email}</p>}
              </div>
            </div>
            <div className='register-info'>
              <div className="register-icon">
                <i className="fa-solid fa-lock"></i>
              </div>
              <div className="register-input">
              <input 
              type="password" 
              placeholder='Your Password'
              name='password'
              {...formik.getFieldProps('password')}
              />
              {formik.errors.password && formik.touched.password && <span className="error-message">{formik.errors.password}</span>}
              </div>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <span className='remember'>Remember me</span>
            </div>
            <button type='submit' className="btn-sign-in">SIGN IN</button>
            <div className="login-fb">
              <LoginFacebook />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
import React, { useState } from 'react'
import './Register.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

//Yup để validate
import * as Yup from 'yup';
import axios from 'axios';

const schemaRegister = Yup.object({
  userName: Yup.string()
    .required('UserName must fill in this section')
    .min(2, 'Must be at least 2 characters')
    .max(10, 'Must be 10 characters or less'),
  email: Yup.string()
    .email()
    .required('Email must fill in this section'),
  phone: Yup.string()
    .required('Phone must fill in this section')
    .min(2, 'Must be at least 2 characters')
    .max(10, 'Must be 10 characters or less'),
  password: Yup.string()
    .required('password must fill in this section')
    .min(2, 'Must be at least 2 characters')
    .max(10, 'Must be 10 characters or less'),
  confirmPassword: Yup.string()
    .required('confirmPassword must fill in this section')
    .oneOf([Yup.ref('password')], 'Confirm Password must be matched')
    .min(6, 'Must be at least 2 characters')
    .max(10, 'Must be 10 characters or less'),
})

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      gender: true,
    },

    validationSchema: schemaRegister,

    onSubmit: async (values) => {
      try {
        
        const resp = await axios.post('https://shop.cyberlearn.vn/api/Users/signup', {
        name: values.userName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        gender: values.gender,
      })
      console.log(resp);
      // chuyen ve trang login
      alert('Register Successful!')

      navigate('/login');

      } catch (err) {
        console.log(err);
      }
    },
  })

  const handleChangeRadio = (name) => (e) => {
    formik.setFieldValue(name, Boolean(+e.target.value))
  }

  return (
    <form onSubmit={formik.handleSubmit} className='register-container'>
      <div className="register-wrapper">
        <h1>Register</h1>
        <div className="register-form">
          <div className="register-left">
            <div>
              <label>User Name:</label>
              <input 
              type="text" 
              placeholder='Your User Name'
              name='userName'
              // value={formik.values.userName} 
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur} 
              {...formik.getFieldProps('userName')}
              />
              {/* 
              - ta sử dụng formik để lấy ra errors
              - khi nào người dùng blur thì mới validate (touch) */}
              {formik.errors.userName && formik.touched.userName && <p className="error-message">{formik.errors.userName}</p>}
            </div>
            <div>
              <label>Email:</label>
              <input 
              type="email" 
              placeholder='Your Email' 
              name='email'
              {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && <p className="error-message">{formik.errors.email}</p>}
            </div>
            <div>
              <label>Phone:</label>
              <input 
              type="number" 
              placeholder='Your Number' 
              name='phone'
              {...formik.getFieldProps('phone')}
              />
              {formik.errors.phone && formik.touched.phone && <p className="error-message">{formik.errors.phone}</p>}
            </div>
          </div>
          <div className="register-right">
            <div>
              <label>Password:</label>
              <input 
              type="password" 
              placeholder='Your Password' 
              name='password'
              {...formik.getFieldProps('password')}
              />
              {formik.errors.password && formik.touched.password && <p className="error-message">{formik.errors.password}</p>}
            </div>
            <div>
              <label>Confirm Password:</label>
              <input 
              type="password" 
              placeholder='Confirm Password' 
              name='confirmPassword'
              {...formik.getFieldProps('confirmPassword')}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword && <p className="error-message">{formik.errors.confirmPassword}</p>}
            </div>
            <div className='register-gender'>
              <span>Gender:</span>
              <input 
                type="radio" 
                id="male" 
                name="gender" 
                value={1}
                checked={formik.values.gender === true}
                onChange={handleChangeRadio('gender')}
              />
              <label htmlFor="male">Male</label>
              <input 
                type="radio" 
                id="female" 
                onChange={handleChangeRadio('gender')}
                checked={formik.values.gender === false}
                name="gender" 
                value={0}
              />
              <label htmlFor="female">Female</label>
            </div>
              {formik.errors.gender && formik.touched.gender && <span className="error-message">{formik.errors.gender}</span>}
          </div>
        </div>
        <div className="register-agree">
          <input type="checkbox" name="" id="" />
          <span>I agree with all statements in <a href="#">Term of Services</a></span>
        </div>
        <button type='submit' className="btn-sign-up">SIGN UP</button>
        <span>Have already an account? <NavLink to='/login'>Login Here</NavLink>

        </span>
      </div>
    </form>
  )
}

export default Register
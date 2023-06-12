import React from 'react'
import FacebookLogin from 'react-facebook-login';
import './LoginFacebook.scss'


function LoginFacebook() {
    const responseFacebook = (response) => {
        console.log(response);
    }

  return (
    <div className='fb-login'>
        <FacebookLogin
            appId="605691948294423"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook} 
        />
    </div>
  )
}

export default LoginFacebook
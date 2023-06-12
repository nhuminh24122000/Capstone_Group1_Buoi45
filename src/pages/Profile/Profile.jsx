import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk } from "../../redux/slices/User";
import "./Profile.scss";
import * as Yup from 'Yup';
import { useFormik } from "formik";
import { axiosWithAuth } from "../../services/config.services";

const tabs = [
  "Account Settings",
  "Change Password",
  "Order History",
  "Favourite Products",
];

const schemaProfile = Yup.object({
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
})

function Profile() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.UserReducer);
  const [type, setType] = useState(tabs[0]);
  const [stateBtn, setStateBtn] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      password: '',
      gender: userProfile.gender,
    },

    validationSchema: schemaProfile,

    onSubmit: async (values) => {
      try {
        const resp = await axiosWithAuth.post('/Users/updateProfile', {
        name: values.userName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        gender: values.gender,
      })
      console.log(resp);
      } catch (err) {
        console.log(err);
      }
    },
  })

  // dispatch call api danh sách ng dùng
  useEffect(() => {
    const actionThunk = getProfileThunk();
    dispatch(actionThunk);
  }, []);

  const [avatar, setAvatar] = useState('');

  //Avatar
  useEffect(() => {
    setAvatar(userProfile.avatar)
  }, [userProfile])

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    file.preview = URL.createObjectURL(file);
    userProfile.avatar = file.preview;

    console.log(userProfile.avatar);
    setAvatar(userProfile.avatar);
  };

  const toggleTab = (tab) => {
    setType(tab);
  };

  const handleChangeBtn = (e) => {
    if (e.target.id === "update") {
      setStateBtn(true);
    } else {
      setStateBtn(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-left">
          <div className="profile-avatar">
          <input type="file" id="upload" onChange={handleAvatar} />
            {avatar && <img src={userProfile.avatar} style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
              }} />}
            <label style={{cursor: 'pointer'}} htmlFor="upload"><i className="fa-solid fa-plus"></i></label>
            <span>{formik.values.userName}</span>
          </div>
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab}
                onClick={() => toggleTab(tab)}
                className={type === tab ? "active-tab" : "tab"}
              >
                <i className="fa-solid fa-gear"></i>
                <span>{tab}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-right">
          <h1>Profile</h1>
          <h3>{type}</h3>
          <div className="profile-content">
            <form onSubmit={formik.handleSubmit}>
              <div
                className={
                  type === tabs[0] ? "content-child profile-account" : "d-none"
                }
              >
                <div className="account-child">
                  <label>User Name:</label>
                  <input
                    type="text"
                    name="userName"
                    disabled={stateBtn}
                    {...formik.getFieldProps('userName')}
                  />
                </div>
                <div className="account-child">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    disabled={stateBtn}
                    {...formik.getFieldProps('email')}
                  />
                </div>
                <div className="account-child">
                  <label>Password:</label>
                  <input
                    type="text"
                    name="password"
                    disabled={stateBtn}
                    {...formik.getFieldProps('password')}
                  />
                </div>
                <div className="account-child">
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    disabled={stateBtn}
                    {...formik.getFieldProps('phone')}
                  />
                </div>
                <div className="account-bottom">
                  <div className="account-gender">
                    <span>Gender:</span>
                    <div>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        checked={userProfile.gender}
                        value={false}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        checked={!userProfile.gender}
                        value={true}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                  <div className="account-button">
                    {stateBtn ? (
                      <button
                        type="submit"
                        id="edit"
                        className="account-btn"
                        onClick={handleChangeBtn}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        id="update"
                        type="button"
                        className="account-btn"
                        onClick={handleChangeBtn}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div
              className={
                type === tabs[1] ? "content-child profile-password" : "d-none"
              }
            >
              <div className="password-input">
                <label>New Password:</label>
                <input
                  type="password"
                  placeholder="Your Password"
                  name="password"
                />
              </div>
              <div className="password-input">
                <label>Confirm new Password:</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
              </div>
              <div className="password-button">
                <button>Edit</button>
                <button>Cancel</button>
              </div>
            </div>
            <div
              className={
                type === tabs[2] ? "content-child" : "d-none"
              }
            >
              <h1>Order History</h1>
            </div>
            <div
              className={
                type === tabs[3] ? "content-child" : "d-none"
              }
            >
              <h1>Favourite Products</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
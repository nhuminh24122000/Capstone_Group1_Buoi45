import React from "react";
import { NavLink } from "react-router-dom";

// SCSS
import "../../assets/sass/components/footer/footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="menu pt-5 pb-4">
        <div className="container">
          <div className="row g-4">
            <div className="col col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="px-5">
                <h5>GET HELP</h5>
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"}>Nike</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"}>Adidas</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"}>Contact</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="border-end border-start border-sencondary px-5">
                <h5>SUPPORT</h5>
                <ul>
                  <li>
                    <NavLink to="/">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Contact</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Help</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Phone</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="px-5">
                <h5>REGISTER</h5>
                <ul>
                  <li>
                    <NavLink to={"/register"}>Register</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/login"}>Login</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rectangle">
        <div className="text-center pt-3 pb-2">
          <p>
            © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
            Khải.
          </p>
        </div>
      </div>
    </footer>
  );
}
import React from "react";
import pictureProduct from "../../assets/imgs/image 5.svg";
import styles from "./CartBody.module.css";

export default function CartBody() {
  return (
    <table className="table">
      <thead
        style={{
          background: "#D9D9D9",
        }}
      >
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>id</th>
          <th>img</th>
          <th>name</th>
          <th>price</th>
          <th>quantity</th>
          <th>total</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>1</td>
          <td>
            <img src={pictureProduct} alt="" />
          </td>
          <td>Product 1</td>
          <td>1000</td>
          <td>
            <button className={styles["btn-quantity"]}>+</button>
            <span
              className="quantity"
              style={{
                background: "#D9D9D9",
                padding: "2px 30px",
              }}
            >
              1
            </span>
            <button className={styles["btn-quantity"]}>-</button>
          </td>
          <td>1000</td>
          <td>
            <button className={styles["btn-quantity"]}>Edit</button>
            <button className={styles["btn-delete"]}>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
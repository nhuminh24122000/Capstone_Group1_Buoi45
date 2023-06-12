import React from "react";
import CartBody from "../../components/CartBody/CartBody";
import styles from "./Cart.module.css";

export default function Cart() {
  return (
    <div className="container">
      <div className="row">
        <p className={styles["cart-title"]}>Carts</p>
      </div>
      <div className="row">
        <CartBody />
      </div>
      <div className="row">
        <button className={styles["btn-submit-order"]}>Submit Order</button>
      </div>
    </div>
  );
}
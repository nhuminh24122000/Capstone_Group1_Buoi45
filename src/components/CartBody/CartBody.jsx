import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCartAction,
  updateCartAction,
} from "../../redux/reducers/cartReducer";
import styles from "./CartBody.module.css";

export default function CartBody() {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.cartReducer);

  const handleUpdateCartQuantity = (idProduct, value) => {
    const action = updateCartAction({
      id: idProduct,
      value: value,
    });
    dispatch(action);
  };

  return (
    <>
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
          {userCart.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.product.id}</td>
                <td>
                  <img
                    src={item.product.image}
                    alt=""
                    style={{
                      width: "50px",
                    }}
                  />
                </td>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>
                  <button
                    className={styles["btn-quantity"]}
                    onClick={() => {
                      handleUpdateCartQuantity(item.product.id, 1);
                    }}
                  >
                    +
                  </button>
                  <span
                    className="quantity"
                    style={{
                      background: "#D9D9D9",
                      padding: "2px 30px",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    className={styles["btn-quantity"]}
                    onClick={() => {
                      handleUpdateCartQuantity(item.product.id, -1);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>{item.product.price * item.quantity}</td>
                <td>
                  <button className={styles["btn-quantity"]}>Edit</button>
                  <button
                    className={styles["btn-delete"]}
                    onClick={() => {
                      const action = deleteProductCartAction({
                        id: item.id,
                      });
                      dispatch(action);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className={styles["btn-submit-order"]}
      >
        Submit Order
      </button>
    </>
  );
}

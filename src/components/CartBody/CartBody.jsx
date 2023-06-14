import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCartAction,
  updateCartAction,
  submitOrderApi,
} from "../../redux/reducers/cartReducer";
import styles from "./CartBody.module.css";

export default function CartBody() {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.cartReducer);
  const { userProfile } = useSelector(state => state.userReducer)
  const [orders, setOrders] = useState();

  const renderOrderProduct = () => {
    let arrOrders = userCart.map((item) => {
      const productOrder = {
        productId: String(item.product.id),
        quantity: Number(item.quantity),
      };
      return productOrder;
    });
    const data = {
      orderDetail: arrOrders,
      email: String(userProfile.email),
    };
    setOrders(data);
  };

  const handleUpdateCartQuantity = (idProduct, value) => {
    const action = updateCartAction({
      id: idProduct,
      value: value,
    });
    dispatch(action);
  };

  useEffect(() => {
    renderOrderProduct();
  }, [userCart]);

  const handleSubmitOrder = () => {
    const actionAsync = submitOrderApi(orders);
    dispatch(actionAsync);
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
            <th>Id</th>
            <th>Img</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userCart.map((item, index) => {
            console.log(item)
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
                        id: item.product.id,
                      });
                      console.log(action)
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
        onClick={handleSubmitOrder}
      >
        Submit Order
      </button>
    </>
  );
}

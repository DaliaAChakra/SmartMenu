import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";
import { API_URL } from "./api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(orders);

 useEffect(() => {
    setLoading(true);
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000); // fetch new data every 5 seconds
    return () => clearInterval(intervalId); // cleanup function to clear the interval when the component unmounts
  }, []);

  function fetchOrders() {
    axios
      .get(`${API_URL}/restaurant/AdminOrders/`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function Kitchen(id) {
    axios
      .post(`${API_URL}/restaurant/AdminOrders/`, {
        pk: id,
        destination: "kitchen",
      })
      .then((response) => {
        console.log(response);
        // Semi-refresh the orders list by fetching the updated orders data
        axios
          .get(`${API_URL}/restaurant/AdminOrders/`)
          .then((response) => {
            setOrders(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Done(id) {
    axios
      .post(`${API_URL}/restaurant/AdminOrders/`, {
        pk: id,
        destination: "done",
      })
      .then((response) => {
        console.log(response);
        // Semi-refresh the orders list by fetching the updated orders data
        axios
          .get(`${API_URL}/restaurant/AdminOrders/`)
          .then((response) => {
            setOrders(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Admin Orders</h2>
      <ul className="orders">
        {orders.map((order) => (
          <li key={order.id} className="order">
            <div className="order-details">
              <span className="order-name">{order.name}</span>
              <span className="order-date">{order.table}</span>
              <span className="order-date">{order.order_date}</span>

              <span className="order-desc">{order.description}</span>
            </div>
            <div className="order-actions">
              <button onClick={() => Kitchen(order.id)} className="to-kitchen">
                To Kitchen
              </button>
              <button onClick={() => Done(order.id)} className="done">
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrders;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "./api";

function ChefOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOrders();
    const intervalId = setInterval(fetchOrders, 5000); // fetch new data every 5 seconds
    return () => clearInterval(intervalId); // cleanup function to clear the interval when the component unmounts
  }, []);

  function fetchOrders() {
    axios
      .get(`${API_URL}/restaurant/ChefOrders/`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function Done(id) {
    axios
      .post(`${API_URL}/restaurant/ChefOrders/`, {
        pk: id,
      })
      .then((response) => {
        console.log(response);
        setOrders(orders.filter((order) => order.id !== id)); // remove the completed order from the list
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: "#F6F7EB", padding: "2rem" }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontFamily: "cursive",
          fontSize: "2.5rem",
        }}
      >
        Chef Orders
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {orders.map((order) => (
          <motion.div
            key={order.id}
            style={{
              width: "100%",
              backgroundColor: "#F8F4E3",
              borderRadius: "10px",
              padding: "1rem",
              margin: "1rem",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "3px 3px 8px rgba(0,0,0,0.3)",
            }}
            transition={{ duration: 0.2 }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              {order.name}
            </p>
            <p style={{ fontStyle: "italic", fontFamily: "cursive" }}>
              {order.table}
            </p>
            <p style={{ fontSize: "1.2rem", fontFamily: "cursive" }}>
              {order.description}
            </p>
            <p style={{ fontStyle: "italic", fontFamily: "cursive" }}>
              {order.order_date}
            </p>

            <button
              style={{
                backgroundColor: "#5D737E",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                border: "none",
                fontFamily: "cursive",
              }}
              onClick={() => Done(order.id)}
            >
              Done
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ChefOrders;

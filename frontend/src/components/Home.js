import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css"; // Import custom CSS file
import { API_URL } from "./api";
import { Modal, Button } from "react-bootstrap";

function Home({ table }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  let currentDate = new Date();

  // Format the date as a string in ISO format
  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let day = ("0" + currentDate.getDate()).slice(-2);
  let dateString = `${year}-${month}-${day}`;
  console.log("Selected table:", table);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/restaurant/Menu/`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function handleOrderConfirmation() {
    axios
      .post(`${API_URL}/restaurant/Menu/`, {
        name: orderName,
        description: orderDescription,
        date: dateString,
        table: table,
      })
      .then((response) => {
        console.log(response);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleOrderButtonClick(name, description) {
    setOrderName(name);
    setShowModal(true);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="menu">
      <div className="container my-5">
        <h2 className="text-center mb-4">Menu</h2>
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6">
              <div className="card mb-3 menu-card">
                <div className="card-body">
                  <h5 className="card-title">{order.name}</h5>
                  <p className="card-text">{order.description}</p>
                  <p className="card-text">${order.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleOrderButtonClick(order.name, order.description)
                    }
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your desired order notes:</p>
          <input
            type="text"
            className="form-control"
            placeholder="Order notes"
            onChange={(e) => setOrderDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOrderConfirmation}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;

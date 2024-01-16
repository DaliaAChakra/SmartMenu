import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminOrders from "./components/AdminOrders";
import ChefOrders from "./components/ChefOrders";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [table, setTable] = useState("");

  const handleLogin = (selectedTable) => {
    setLoggedIn(true);
    setTable(selectedTable);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Home table={table} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/admin" element={<AdminOrders />} />
          <Route path="/chef" element={<ChefOrders />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

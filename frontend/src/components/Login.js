import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ onLogin }) {
  const [table, setTable] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (table) {
      onLogin(table);
    } else {
      setError("Please select a table");
    }
  };

  const handleTableChange = (event) => {
    setTable(event.target.value);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Table Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table-select" className="login-label">
            Please select your table:
          </label>
          <select
            className="form-control"
            id="table-select"
            value={table}
            onChange={handleTableChange}
          >
            <option value="">-- Please select --</option>
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option>
          </select>
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="btn btn-primary login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/Form.css";
import { useState } from "react";

const AddUserForm = ({ onClose, onAddUser }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    emp_code: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const roleOptions = ["admin", "employee", "carrier"];

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateUser()) {
      try {
        let response;
        const token = localStorage.getItem("token");
  
        if (!token) {
          Swal.fire("Error", "No token found", "error");
          return;
        }
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        // Create the payload for the request
        const userPayload = { ...user, password_confirmation: confirmPassword };
  
        if (user.id) {
          response = await axios.put(
            `http://127.0.0.1:8000/api/users/${user.id}`,
            userPayload,
            { headers }
          );
          Swal.fire(
            "Updated!",
            "User data has been updated successfully.",
            "success"
          );
        } else {
          response = await axios.post("http://127.0.0.1:8000/api/register", userPayload, {
            headers,
          });
          Swal.fire(
            "Saved!",
            "User data has been saved successfully.",
            "success"
          );
        }
  
        onAddUser(response.data);
        clearUserForm();
        onClose();
      } catch (error) {
        console.error(
          "Error saving/updating user:",
          error.response ? error.response.data : error.message
        );
        Swal.fire(
          "Error",
          "An error occurred while saving/updating the user.",
          "error"
        );
      }
    }
  };
  

  const validateUser = () => {
    const { name, username, email, password, role, emp_code } = user;
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !role ||
      !emp_code ||
      password !== confirmPassword
    ) {
      if (password !== confirmPassword) {
        Swal.fire("Validation Error", "Passwords do not match.", "error");
      } else {
        Swal.fire("Validation Error", "Please fill in all required fields.", "error");
      }
      return false;
    }
    return true;
  };

  const clearUserForm = () => {
    setUser({
      id: "",
      name: "",
      username: "",
      email: "",
      password: "",
      role: "",
      emp_code: "",
    });
    setConfirmPassword("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <fieldset className="form-section">
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              id="email"
              type="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              type="password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">User Role*</label>
            <select
              id="role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="">Select User Role</option>
              {roleOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="emp_code">Employee Code*</label>
            <input
              value={user.emp_code}
              onChange={(e) => setUser({ ...user, emp_code: e.target.value })}
              type="text"
              required
            />
          </div>
        </fieldset>
        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
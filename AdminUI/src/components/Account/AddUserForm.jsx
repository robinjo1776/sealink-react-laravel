import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/Form.css";
import { useState } from "react";

const AddUserForm = ({ onClose, onAddLead }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    emp_code: "",
  });

  const roleOptions = ["admin", "employee"];

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

        if (user.id) {
          response = await axios.put(
            `http://127.0.0.1:8000/api/users/${user.id}`,
            user,
            { headers }
          );
          Swal.fire(
            "Updated!",
            "User data has been updated successfully.",
            "success"
          );
        } else {
          response = await axios.post("http://127.0.0.1:8000/api/users", user, {
            headers,
          });
          Swal.fire(
            "Saved!",
            "User data has been saved successfully.",
            "success"
          );
        }

        onAddLead(response.data);
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
    } else {
      Swal.fire(
        "Validation Error",
        "Please fill in all required fields.",
        "error"
      );
    }
  };

  const validateUser = () => {
    return user.lead_no && user.lead_date && user.lead_type && user.lead_status;
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
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <fieldset className="form-section">
          <div className="form-group">
            <label htmlFor="leadNo">Name*</label>
            <input
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="leadDate">Username*</label>
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
            <label htmlFor="website">Confirm Password*</label>
            <input
              value={user.website}
              onChange={(e) => setUser({ ...user, website: e.target.value })}
              id="website"
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="equipmentType">User Role*</label>
            <select
              id="equipmentType"
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
            <label htmlFor="website">Employee Code*</label>
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

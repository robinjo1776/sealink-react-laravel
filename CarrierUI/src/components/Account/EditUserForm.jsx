import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditUserForm = ({ onClose, onUpdate, selectedUser }) => {
  const [formUser, setFormUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    emp_code: "",
  });

  // Update the form when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      setFormUser({
        id: selectedUser.id,
        name: selectedUser.name || "",
        username: selectedUser.username || "",
        email: selectedUser.email || "",
        password: "",
        role: selectedUser.role || "",
        emp_code: selectedUser.emp_code || "",
      });
    }
  }, [selectedUser]);

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
        });
        return;
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${formUser.id}`,
        formUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "User data has been updated successfully.",
      });

      onUpdate(response.data);
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response && error.response.status === 401
            ? "Unauthorized. Please log in again."
            : "Failed to update user.",
      });
    }
  };

  const roleOptions = ["admin", "employee"];

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser();
        }}
        className="form-main"
      >
        <fieldset className="form-section">
          <div className="form-group">
            <label htmlFor="leadNo">Name*</label>
            <input
              value={formUser.name}
              onChange={(e) =>
                setFormUser({ ...formUser, name: e.target.value })
              }
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="leadDate">Username*</label>
            <input
              value={formUser.username}
              onChange={(e) =>
                setFormUser({ ...formUser, username: e.target.value })
              }
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              value={formUser.email}
              onChange={(e) =>
                setFormUser({ ...formUser, email: e.target.value })
              }
              id="email"
              type="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              value={formUser.password}
              onChange={(e) =>
                setFormUser({ ...formUser, password: e.target.value })
              }
              type="password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Confirm Password*</label>
            <input
              value={formUser.website}
              onChange={(e) =>
                setFormUser({ ...formUser, website: e.target.value })
              }
              id="website"
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="equipmentType">User Role*</label>
            <select
              id="equipmentType"
              value={formUser.role}
              onChange={(e) =>
                setFormUser({ ...formUser, role: e.target.value })
              }
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
              value={formUser.emp_code}
              onChange={(e) =>
                setFormUser({ ...formUser, emp_code: e.target.value })
              }
              type="text"
              required
            />
          </div>
        </fieldset>

        <button type="submit" className="btn-submit">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;

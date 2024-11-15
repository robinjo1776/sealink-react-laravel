import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditUserForm from "./EditUserForm"; // Ensure this component exists
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const perPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load users.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Failed to delete the user.", "error");
      }
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const headers = [
    { key: "name", label: "Name" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "created_at", label: "Created At" },
    { key: "updated_at", label: "Updated At" },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteUser(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <Link to="/register" className="add-button">
          New User
        </Link>
        <div className="search-container">
          <input
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <Table
        data={paginatedData}
        headers={headers}
        handleSort={handleSort}
        sortBy={sortBy}
        sortDesc={sortDesc}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit User"
      >
        {selectedUser && (
          <EditUserForm
            userId={selectedUser.id} // Pass the userId to the EditUserForm
            onClose={closeEditModal}
            onUpdate={updateUser}
          />
        )}
      </Modal>
    </div>
  );
};

export default UserTable;

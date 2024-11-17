import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../../UserProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditLeadFollowupForm from "./EditLeadFollowupForm";
import AddLeadFollowupForm from "./AddLeadFollowupForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LeadFollowupTable = () => {
  const { currentUser, loading: userLoading } = useContext(UserContext);
  const [followUps, setFollowUps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFollowup, setSelectedFollowup] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();
  const perPage = 8;

  // Fetch lead follow-ups
  const fetchFollowUps = useCallback(async () => {
    if (!currentUser || !currentUser.id) {
      console.error("No valid currentUser available");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Follow-ups:", data);
      setFollowUps(data);
      setIsLoading(false); // Data is fetched, set loading to false
    } catch (error) {
      console.error("Error loading followups:", error);
      if (error.response && error.response.status === 401) {
        console.log("Token expired or invalid");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load followups.",
        });
      }
      setIsLoading(false); // If error occurs, stop the loading state
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!userLoading) {
      fetchFollowUps();
    }
  }, [currentUser, userLoading, fetchFollowUps]);

  // Handle delete action
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No token found",
      });
      return;
    }

    try {
      // Send DELETE request to the backend
      await axios.delete(`http://127.0.0.1:8000/api/lead-followup/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted follow-up from the local state
      setFollowUps(followUps.filter((followup) => followup.id !== id));

      Swal.fire({
        icon: "success",
        title: "Follow-up Deleted",
        text: "The follow-up has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting follow-up:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete follow-up.",
      });
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

  const openEditModal = (followUp) => {
    setSelectedFollowup(followUp);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedFollowup(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const addFollowup = async (newFollowup) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No token found",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/lead-followup",
        newFollowup,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowUps([...followUps, data]);
      Swal.fire({
        icon: "success",
        title: "Follow-up Added",
        text: "Your new follow-up has been added successfully.",
      });
      closeAddModal();
    } catch (error) {
      console.error("Error adding follow-up:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add follow-up.",
      });
    }
  };

  // Sorting the follow-ups based on the column and order
  const sortedFollowUps = followUps.sort((a, b) => {
    const valA = sortBy === "lead_date" ? new Date(a[sortBy]).getTime() : a[sortBy];
    const valB = sortBy === "lead_date" ? new Date(b[sortBy]).getTime() : b[sortBy];
    return sortDesc ? valB - valA : valA - valB;
  });

  // Paginate the sorted data
  const paginatedData = sortedFollowUps.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(followUps.length / perPage);

  const headers = [
    { key: "lead_no", label: "Lead#" },
    { key: "lead_date", label: "Date" },
    { key: "customer_name", label: "Customer Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteFollowup (item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="lead-followup-table">
       <div className="header-container">
        <button onClick={openAddModal} className="add-button">
          Add Follow-up
        </button>
        <div className="search-container">
          <input
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            placeholder="Search..."
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <span>Loading...</span>
        </div>
      ) : (
        <Table
          data={paginatedData}
          headers={headers}
          onSort={handleSort}
          sortBy={sortBy}
          sortDesc={sortDesc}
          onEdit={openEditModal}
          onDelete={handleDelete} // Pass the handleDelete function here
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Follow-up">
          <EditLeadFollowupForm followup={selectedFollowup} onSave={handleSaveEdit} />
        </Modal>
      )}
      {isAddModalOpen && (
        <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
          <AddLeadFollowupForm onSave={addFollowup} />
        </Modal>
      )}
    </div>
  );
};

export default LeadFollowupTable;

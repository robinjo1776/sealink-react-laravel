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
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFollowup, setselectedFollowup] = useState(null);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const navigate = useNavigate();
  const perPage = 8;
  useEffect(() => {
  // Fetch lead follow-ups
  const fetchFollowUps = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }
  
      const { data } = await axios.get("http://127.0.0.1:8000/api/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (data && Array.isArray(data)) {
        console.log("Fetched Follow-ups:", data);
        setFollowUps(data); // Ensure followUps is always an array
      } else {
        console.error("Unexpected data structure:", data);
        setFollowUps([]); // Set empty array if the data is invalid
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error loading followups:", error);
      if (error.response && error.response.status === 401) {
        console.log("Token expired or invalid");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        navigate("/login");
      }
      setFollowUps([]); // Ensure followUps is always an array in case of error
      setLoading(false);
    }
  };
  
    fetchFollowUps();
  }, []);
  


  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const openEditModal = (followUp) => {
    setselectedFollowup(followUp);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setselectedFollowup(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const updateFollowup = (updatedFollowup) => {
    setFollowUps((prevFollowups) =>
      prevFollowups.map((followUp) =>
        followUp.id === updatedFollowup.id
          ? { ...followUp, ...updatedFollowup }
          : followUp
      )
    );
  };

  const deleteFollowup = async (id) => {
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
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.delete(
          `http://127.0.0.1:8000/api/lead-followup/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Delete Response:", response);
        setFollowUps((prevFollowups) =>
          prevFollowups.filter((followUp) => followUp.id !== id)
        );
        Swal.fire("Deleted!", "The follow-up has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting follow-up:", error);

        if (error.response) {
          if (error.response.status === 401) {
            // Token is invalid or expired
            Swal.fire({
              icon: "error",
              title: "Unauthorized",
              text: "Your session has expired. Please log in again.",
            });

            // Optionally, redirect to login page here
            // navigate('/login');
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete the follow-up.",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An unexpected error occurred.",
          });
        }
      }
    }
  };
  // Search filtering
  const filteredFollowUps = followUps.filter(
    (followUp) =>
      followUp.customer_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      followUp.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedFollowUps = filteredFollowUps.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = ""; // Replace null/undefined with an empty string for comparison
    if (valB == null) valB = ""; // Replace null/undefined with an empty string for comparison

    if (sortBy === "lead_date" || sortBy === "next_follow_up_date") {
      // Handle date sorting by comparing timestamps
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (typeof valA === "string") {
      // Sort strings alphabetically
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    // Default number sorting
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedFollowUps.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredFollowUps.length / perPage);

  const headers = [
    { key: "lead_no", label: "Lead#" },
    { key: "lead_date", label: "Date" },
    { key: "customer_name", label: "Customer Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "lead_type", label: "Lead Type" },    
    {
      key: "lead_status",
      label: "Status",
      render: (item) => (
        <span className={`badge ${getStatusClass(item.lead_status)}`}>
          {item.lead_status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button
            onClick={() => deleteFollowup(item.id)}
            className="btn-delete"
          >
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "badge-new";
      case "In Progress":
        return "badge-in-progress";
      case "Completed":
        return "badge-completed";
      case "On Hold":
        return "badge-on-hold";
      case "Lost":
        return "badge-lost";
      default:
        return "badge-default";
    }
  };
  return (
    <div className="lead-followup-table">
      {loading ? (
        <div className="loading-indicator">
          <span>Loading follow-ups...</span>
        </div>
      ) : (
        <>
          <div className="header-container">
            <button onClick={openAddModal} className="add-button">
              Add Follow-up
            </button>
            <div className="search-container">
              <input
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>

          {followUps.length === 0 ? (
            <div className="no-data-message">No follow-up data available</div>
          ) : (
            <Table
              data={paginatedData}
              headers={headers.map((header) => ({
                ...header,
                label: (
                  <div
                    className="sortable-header"
                    onClick={() => handleSort(header.key)}
                  >
                    {header.label}
                    {sortBy === header.key && (
                      <span className="sort-icon">{sortDesc ? "▲" : "▼"}</span>
                    )}
                  </div>
                ),
              }))}
              handleSort={handleSort}
              sortBy={sortBy}
              sortDesc={sortDesc}
              currentPage={currentPage}
              totalPages={totalPages}
              searchQuery={searchQuery}
              setCurrentPage={setCurrentPage}
              onEditClick={openEditModal}
            />
          )}
        </>
      )}

      {/* Add Followup Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Followup"
      >
        <AddLeadFollowupForm
          onClose={closeAddModal}
          onAddFollowup={(newFollowup) => {
            setFollowUps((prevFollowups) => [...prevFollowups, newFollowup]);
            closeAddModal();
          }}
        />
      </Modal>

      {/* Edit Followup Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Followup"
      >
        {selectedFollowup && (
          <EditLeadFollowupForm
            followUp={selectedFollowup}
            onClose={closeEditModal}
            onUpdate={updateFollowup}
          />
        )}
      </Modal>
    </div>
  );
};

export default LeadFollowupTable;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditLeadForm from "./EditLeadForm";
import AddLeadFollowupForm from "./AddLeadFollowupForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserContext } from "../../UserProvider"; // Adjust the import as needed

const LeadTable = () => {
  const users = useContext(UserContext);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFollowup, setselectedFollowup] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const perPage = 8;

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "Unknown"; // Fallback if user not found
  };

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token dynamically
        if (!token) {
          throw new Error("No token found");
        }

        setLoading(true);  // Set loading to true before fetching
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/lead-followup",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowUps(data);
      } catch (error) {
        console.error("Error loading followups:", error);
        handleFetchError(error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchFollowUps();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You need to log in to access this resource.",
      });
      // Optionally redirect to login page
      // navigate('/login'); // Uncomment if using useNavigate
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load followups.",
      });
    }
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
        await axios.delete(`http://127.0.0.1:8000/api/lead-followup/${id}`);
        setFollowUps((prevFollowups) =>
          prevFollowups.filter((followUp) => followUp.id !== id)
        );
        Swal.fire("Deleted!", "The follow up has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting follow up:", error);
        Swal.fire("Error!", "Failed to delete the follow up.", "error");
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

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredFollowUps = followUps.filter((followUp) =>
    Object.values(followUp).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  const sortedFollowUps = filteredFollowUps.sort((a, b) => {
    const valA =
      sortBy === "lead_date" ? new Date(a[sortBy]).getTime() : a[sortBy];
    const valB =
      sortBy === "lead_date" ? new Date(b[sortBy]).getTime() : b[sortBy];
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
    { key: "customer_name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "next_follow_up_date", label: "Next Follow Up" },
    {
      key: "lead_status",
      label: "Status",
      render: (item) => (
        <span className={`badge ${getStatusClass(item.lead_status)}`}>
          {item.lead_status}
        </span>
      ),
    },
    { key: "remarks", label: "Remarks" },
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
    <div>
      {/* Loading state: Show a loading indicator */}
      {loading ? (
        <div className="loading-indicator">
          <span>Loading follow-ups...</span>
        </div>
      ) : (
        <>
          {/* Header with Add Followup button and search input */}
          <div className="header-container">
            <button onClick={openAddModal} className="add-button">
              Add Followup
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

          {/* Table component */}
          <Table
            data={paginatedData}
            headers={headers}
            handleSort={handleSort}
            sortBy={sortBy}
            sortDesc={sortDesc}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            onEditClick={openEditModal}
          />
        </>
      )}

      {/* Edit Followup Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Followup"
      >
        {selectedFollowup && (
          <EditLeadForm
            lead={selectedFollowup}
            onClose={closeEditModal}
            onUpdate={updateFollowup}
          />
        )}
      </Modal>

      {/* Add Followup Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Followup"
      >
        <AddLeadFollowupForm
          onClose={closeAddModal}
          onAddLeadFollowup={(newFollowup) => {
            setFollowUps((prevFollowups) => [...prevFollowups, newFollowup]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default LeadTable;

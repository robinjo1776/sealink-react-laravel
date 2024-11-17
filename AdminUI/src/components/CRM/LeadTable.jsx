import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditLeadForm from "./EditLeadForm";
import AddLeadForm from "./AddLeadForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserContext } from '../../UserProvider'; // Adjust the import as needed

const LeadTable = () => {
  const users = useContext(UserContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const perPage = 8;

  const getUserNameById = (id) => {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'Unknown'; // Fallback if user not found
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token dynamically
        if (!token) {
          throw new Error("No token found");
        }

        setLoading(true);  // Set loading to true before fetching
        const { data } = await axios.get("http://127.0.0.1:8000/api/lead", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeads(data);
      } catch (error) {
        console.error("Error loading leads:", error);
        handleFetchError(error);
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchLeads();
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
        text: "Failed to load leads.",
      });
    }
  };

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead))
    );
  };

  const deleteLead = async (id) => {
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
        await axios.delete(`http://127.0.0.1:8000/api/lead/${id}`);
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
        Swal.fire("Deleted!", "The lead has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting lead:", error);
        Swal.fire("Error!", "Failed to delete the lead.", "error");
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

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedLead(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  const sortedLeads = filteredLeads.sort((a, b) => {
    const valA = sortBy === "lead_date" ? new Date(a[sortBy]).getTime() : a[sortBy];
    const valB = sortBy === "lead_date" ? new Date(b[sortBy]).getTime() : b[sortBy];
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedLeads.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredLeads.length / perPage);

  const headers = [
    { key: "lead_no", label: "Lead#" },
    { key: "lead_date", label: "Date" },
    { key: "follow_up_date", label: "Follow Up" },
    { key: "customer_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "equipment_type", label: "Equipment Type" },
    { key: "state", label: "Province/State" },
    { key: "lead_type", label: "Type" },
    { key: "assigned_to", label: "Assigned To" },
    {
      key: "lead_status",
      label: "Status",
      render: (item) => (
        <span className={`badge ${getStatusClass(item.lead_status)}`} >
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
          <button onClick={() => deleteLead(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Prospect customer": return "badge-prospect";
      case "Lanes discussed": return "badge-lanes";
      case "Product/Equipment discussed": return "badge-product";
      case "E-mail sent to concerned person": return "badge-email";
      case "Carrier portal registration": return "badge-carrier";
      case "Quotations": return "badge-quotation";
      case "Fob/Have broker": return "badge-broker";
      case "Voicemail/No answer": return "badge-voicemail";
      case "Different Department": return "badge-different";
      case "No answer/Callback/Voicemail": return "badge-callback";
      case "Not interested reason provided in notes": return "badge-not-interested";
      case "Asset based only": return "badge-asset";
      default: return "badge-default";
    }
  };

  return (
    <div>
      {/* Header with Add Lead button and search input */}
      <div className="header-container">
        <button onClick={openAddModal} className="add-button">
          Add Lead
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

      {/* Loading state: Show a loading indicator */}
      {loading ? (
        <div className="loading-indicator">
          <span>Loading leads...</span>
        </div>
      ) : (
        // Table will show only once data is fetched
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
      )}

      {/* Edit Lead Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Lead">
        {selectedLead && (
          <EditLeadForm lead={selectedLead} onClose={closeEditModal} onUpdate={updateLead} />
        )}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Lead">
        <AddLeadForm
          onClose={closeAddModal}
          onAddLead={(newLead) => {
            setLeads((prevLeads) => [...prevLeads, newLead]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default LeadTable;

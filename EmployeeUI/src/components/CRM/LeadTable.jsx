import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditLeadForm from "./EditLeadForm";
import AddLeadForm from "./AddLeadForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserContext } from '../../UserProvider'; // Assuming this provides the current user context
import LeadFollowupTable from "./LeadFollowupTable"; // Import your LeadFollowupTable

const LeadTable = () => {
  const currentUser = useContext(UserContext); // Get current user from context
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]); // To store the list of users
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);  // Selected lead for follow-up
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isFollowupModalOpen, setFollowupModalOpen] = useState(false); // State for Follow-up Modal
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const perPage = 8;

  // Fetch leads and users from API
  useEffect(() => {
    const fetchLeadsAndUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token found");
        }

        const leadsResponse = await axios.get("http://127.0.0.1:8000/api/lead", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersResponse = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeads(leadsResponse.data);
        setUsers(usersResponse.data); // Store users data
        setIsLoading(false); // Data is fetched, set loading to false

      } catch (error) {
        console.error("Error loading data:", error);
        handleFetchError(error);
      } finally {
        setLoading(false); // Data has been loaded (or error occurred)
      }
    };

    fetchLeadsAndUsers();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You need to log in to access this resource.",
      });
      // Optionally redirect to login page
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
        setIsLoading(false); // Data is fetched, set loading to false

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

  const openFollowupModal = (lead) => {
    console.log("openFollowupModal called"); // Log to check if this is triggered
    if (!lead) {
      console.log("No lead selected"); // Log if no lead is selected
      Swal.fire({
        icon: 'warning',
        title: 'No lead selected',
        text: 'Please select a lead to view follow-ups.',
      });
      return;
    }
    
    setSelectedLead(lead);  // Set selected lead
    console.log("Selected Lead:", lead); // Log selected lead
    setFollowupModalOpen(true); // Open the Follow-up modal
  };

  const closeFollowupModal = () => {
    setFollowupModalOpen(false);
    setSelectedLead(null);
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

  // Filter leads where assigned_to matches users.name
  const filteredAndSortedLeads = filteredLeads
    .filter((lead) => {
      const assignedToName = lead.assigned_to; // This should be the name in your `Lead` data

      // Safeguard to check if `assigned_to` and `user.name` are not null/undefined before calling toLowerCase
      if (!assignedToName) return false; // Return false if `assigned_to` is null/undefined
      return users.some(user => {
        const userName = user.name;
        return userName && assignedToName.toLowerCase() === userName.toLowerCase(); // Only compare if both are valid
      });
    })
    .sort((a, b) => {
      const valA = sortBy === "lead_date" ? new Date(a[sortBy]).getTime() : a[sortBy];
      const valB = sortBy === "lead_date" ? new Date(b[sortBy]).getTime() : b[sortBy];
      return sortDesc ? valB - valA : valA - valB;
    });

  const paginatedData = filteredAndSortedLeads.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredAndSortedLeads.length / perPage);

  const headers = [
    { key: "lead_no", label: "Lead#" },
    { key: "lead_date", label: "Date" },
    { key: "follow_up_date", label: "Follow Up" },
    { key: "customer_name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "equipment_type", label: "Equipment Type" },
    { key: "address", label: "Address" },
    { key: "lead_type", label: "Type" },
    {
      key: "assigned_to",
      label: "Assigned To",
      render: (item) => getAssignedToName(item.assigned_to), // Map assigned_to Name to user Name
    },
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
          <button onClick={() => deleteLead(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
     
        </>
      ),
    },
  ];

  const getAssignedToName = (assignedToName) => {
    if (!assignedToName) return 'Unknown'; // Safeguard against null/undefined
    const user = users.find(user => user.name === assignedToName);
    return user ? user.name : "Unknown";
  };

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
    <div className="header-container">
        <button onClick={openFollowupModal} className="add-button">
          Follow-ups
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

      <Table headers={headers} data={paginatedData} />
    )}
      {/* Follow-up Modal */}
      <Modal isOpen={isFollowupModalOpen} onClose={closeFollowupModal} title="Lead Follow-ups">
        <LeadFollowupTable lead={selectedLead} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Lead">
        <EditLeadForm lead={selectedLead} updateLead={updateLead}  />
      </Modal>

    </div>
  );
};

export default LeadTable;

// src/components/LeadTable.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditEmpLeadForm from "./EditEmpLeadForm";
import { UserContext } from "../../UserProvider"; // Adjust path as necessary

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EmpLeadTable = ({ userRole }) => {
  console.log("Rendering EmpLeadTable with userRole:", userRole);
  const { currentUser } = useContext(UserContext); // Access current user
  const userName = currentUser.name; // Ensure this is valid
  console.log('Current User Name:', userName); // Log the user name


  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const perPage = 8;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/lead");
        setLeads(data);
        console.log('Leads fetched:', JSON.stringify(data, null, 2)); // Inspect entire data
      } catch (error) {
        console.error("Error loading leads:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load leads.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, []);

  const normalizedSearchQuery = searchQuery.toLowerCase();

  // Check assigned_to values and their presence
  leads.forEach((lead, index) => {
    console.log(`Lead ${index}:`, lead.assigned_to);
    console.log(`Trimmed Lead ${index} assigned_to:`, lead.assigned_to?.trim());
  });

  const filteredLeads = leads.filter((lead) =>
    lead.assigned_to?.trim().toLowerCase() === userName.trim().toLowerCase() &&
    Object.values(lead).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  console.log('Filtered Leads:', filteredLeads);
  const assignedLeads = leads.filter(lead => lead.assigned_to?.trim() === userName.trim());
  console.log('Assigned Leads:', assignedLeads);
  
  if (filteredLeads.length === 0) {
    return <div>No leads found.</div>; // Message for no leads
  }

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
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
    setEditModalOpen(false); // Corrected: setEditModalOpen instead of setModalOpen
    setSelectedLead(null); // Clear the selected lead
  };

  const openAddModal = () => {
    setAddModalOpen(true); // Open the AddLeadForm modal
  };

  const closeAddModal = () => {
    setAddModalOpen(false); // Close the AddLeadForm modal
  };

  const sortedLeads = filteredLeads.sort((a, b) => {
    const valA =
      sortBy === "lead_date" ? new Date(a[sortBy]).getTime() : a[sortBy];
    const valB =
      sortBy === "lead_date" ? new Date(b[sortBy]).getTime() : b[sortBy];
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
    { key: "address", label: "Address" },
    { key: "lead_type", label: "Type" },
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

  const getStatusClass = (status) => {
    switch (status) {
      case "Prospect customer":
        return "badge-prospect";
      case "Lanes discussed":
        return "badge-lanes";
      case "Product/Equipment discussed":
        return "badge-product";
      case "E-mail sent to concerned person":
        return "badge-email";
      case "Carrier portal registration":
        return "badge-carrier";
      case "Quotations":
        return "badge-quotation";
      case "Fob/Have broker":
        return "badge-broker";
      case "Voicemail/No answer":
        return "badge-voicemail";
      case "Different Department":
        return "badge-different";
      case "No answer/Callback/Voicemail":
        return "badge-callback";
      case "Not interested reason provided in notes":
        return "badge-not-interested";
      case "Asset based only":
        return "badge-asset";
      default:
        return "badge-default";
    }
  };

  return (
    <div>
      <style>
        {`
          .badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
          }
          .badge-prospect { background-color: #f0ad4e; }
          .badge-lanes { background-color: #5bc0de; }
          .badge-product { background-color: #5cb85c; }
          .badge-email { background-color: #d9534f; }
          .badge-carrier { background-color: #5e5e5e; }
          .badge-quotation { background-color: #ffc107; }
          .badge-broker { background-color: #d43f15; }
          .badge-voicemail { background-color: #6f5499; }
          .badge-different { background-color: #337ab7; }
          .badge-callback { background-color: #f7e05b; }
          .badge-not-interested { background-color: #c9302c; }
          .badge-asset { background-color: #5bc0de; }
          .badge-default { background-color: #ccc; }
        `}
      </style>
      <div className="header-container">
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
        onEditClick={openEditModal}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Lead"
      >
        {selectedLead && (
          <EditEmpLeadForm
            lead={selectedLead}
            onClose={closeEditModal}
            onUpdate={updateLead}
          />
        )}
      </Modal>
    </div>
  );
};

export default EmpLeadTable;

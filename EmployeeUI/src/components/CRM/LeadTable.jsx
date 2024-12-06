import { useState, useEffect,  } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditLeadForm from "./EditLeadForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LeadFollowupTable from "./LeadFollowupTable"; // Import your LeadFollowupTable

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("lead_date");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isFollowupModalOpen, setFollowupModalOpen] = useState(false);
  const [isFollowupLoading, setFollowupLoading] = useState(false);
  const [followupData, setFollowupData] = useState([]);

  const perPage = 8;

  // Fetch leads from the API
  // Fetch leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const leadsResponse = await axios.get(
          "http://127.0.0.1:8000/api/employee-lead",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLeads(leadsResponse.data);
        setLoading(false);
      } catch (error) {
        handleFetchError(error);
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
    }
  };

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
      )
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
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.delete(
          `http://127.0.0.1:8000/api/lead/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Delete Response:", response);
        setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
        Swal.fire("Deleted!", "The lead has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting lead:", error);

        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Unauthorized",
              text: "Your session has expired. Please log in again.",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to delete the lead.",
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
  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  // Filter leads based on search query
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
    // Handle sorting for different data types
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = "";
    if (valB == null) valB = "";

    if (sortBy === "lead_date" || sortBy === "follow_up_date") {
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

  const paginatedData = sortedLeads.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filteredLeads.length / perPage);

  const openFollowupModal = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You need to log in to access follow-up data.",
      });
      return; // Exit early if token is not available
    }

    setFollowupLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowupData(response.data);
    } catch (error) {
      console.error("Error fetching follow-up data:", error);
    }

    setFollowupModalOpen(true); // Open the modal after fetching the data
  };

  const closeFollowupModal = () => {
    setFollowupModalOpen(false);
  };
  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedLead(null);
  };

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
      <div className="header-container">
        <button onClick={openFollowupModal} className="add-button">
          Follow-ups
        </button>

        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search leads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table component to display leads */}
      <Table
        data={paginatedData}
        headers={headers.map((header) => ({
          ...header,
          label: header.render ? (
            header.label
          ) : (
            <span onClick={() => handleSort(header.key)}>
              {header.label}{" "}
              {sortBy === header.key ? (sortDesc ? "↓" : "↑") : ""}
            </span>
          ),
        }))}
        loading={loading}
        handleSort={handleSort}
        sortBy={sortBy}
        sortDesc={sortDesc}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onEditClick={openEditModal}
      />

      {/* Edit Lead Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Lead"
      >
        {selectedLead && (
          <EditLeadForm
            lead={selectedLead}
            onClose={closeEditModal}
            onUpdate={updateLead}
          />
        )}
      </Modal>

      {/* Modal for follow-up */}
      <Modal isOpen={isFollowupModalOpen} onClose={closeFollowupModal}>
        <LeadFollowupTable
          followupData={followupData}
          loading={isFollowupLoading}
        />
      </Modal>
    </div>
  );
};

export default LeadTable;

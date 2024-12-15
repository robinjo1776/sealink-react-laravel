import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import AddCarrierForm from "./AddCarrier/AddCarrierForm";
import EditCarrierForm from "./EditCarrier/EditCarrierForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CarrierTable = () => {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const perPage = 8;

  // Fetch customer data on component mount
  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You are not logged in.",
          });
          return;
        }

        setLoading(true);
        const { data } = await axios.get("http://127.0.0.1:8000/api/carrier", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCarriers(data);
      } catch (error) {
        console.error("Error loading carriers:", error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarriers();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You need to log in to access this resource.",
      });
      window.location.href = "/login";
    }
  };

  const updateCarrier = (updatedCarrier) => {
    setCarriers((prevCarriers) =>
      prevCarriers.map((carrier) =>
        carrier.id === updatedCarrier.id
          ? { ...carrier, ...updatedCarrier }
          : carrier
      )
    );
  };

  const deleteCarrier = async (id) => {
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
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You are not logged in.",
          });
          return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/carrier/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCarriers((prevCarriers) =>
          prevCarriers.filter((carrier) => carrier.id !== id)
        );
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting carrier:", error);
        Swal.fire("Error!", "Failed to delete the carrier.", "error");
      }
    }
  };

  // Sorting logic
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  // Search filtering
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredCarriers = carriers.filter((carrier) =>
    Object.values(carrier).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  const sortedCarriers = filteredCarriers.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = ""; // Replace null/undefined with an empty string for comparison
    if (valB == null) valB = ""; // Replace null/undefined with an empty string for comparison

    if (typeof valA === "string") {
      // Sort strings alphabetically
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    // Default number sorting
    return sortDesc ? valB - valA : valA - valB;
  });
  // Pagination logic
  const paginatedData = sortedCarriers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filteredCarriers.length / perPage);

  // Table headers
  const headers = [
    { key: "dba", label: "DBA" },
    { key: "legal_name", label: "Name" },
    { key: "primary_phone", label: "Phone" },
    { key: "advertise_email", label: "Email" },
    { key: "equipment", label: "Equipment" },
    {
      key: "advertise",
      label: "Advertise",
      render: (item) => (
        <span className={`badge ${getStatusClass(item.advertise)}`}>
          {item.advertise ? "Advertised" : "Not Advertised"}
        </span>
      ),
    },

    { key: "primary_address", label: "Address" },
    { key: "primary_city", label: "City" },
    { key: "primary_state", label: "State" },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteCarrier(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];
  const getStatusClass = (status) => {
    if (status === true) {
      return "badge-true"; // Green or whatever color you want for "true"
    } else if (status === false) {
      return "badge-false"; // Yellow or whatever color you want for "false"
    }
    return "badge-default"; // Default grey if status is undefined or null
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openEditModal = (carrier) => {
    setSelectedCarrier(carrier);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCarrier(null);
  };

  return (
    <div>
      {/* Header with Add Customer button and search input */}
      <div className="header-container">
        <button onClick={openAddModal} className="add-button">
          Add Carrier
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

      {/* Loading state */}
      {loading ? (
        <div className="loading-indicator">
          <span>Loading carriers...</span>
        </div>
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
                  <span className="sort-icon">
                    {sortDesc ? "▲" : "▼"}{" "}
                    {/* Render Asc/Desc icon based on the sort order */}
                  </span>
                )}
              </div>
            ),
          }))}
          handleSort={handleSort}
          sortBy={sortBy}
          sortDesc={sortDesc}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Carrier"
      >
        <AddCarrierForm
          onClose={closeAddModal}
          onAddCarrier={(newCarrier) => {
            setCarriers((prevCarriers) => [...prevCarriers, newCarrier]);
            closeAddModal();
          }}
        />
      </Modal>

      {/* Edit Carrier Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Carrier"
      >
        {selectedCarrier && (
          <EditCarrierForm
            customer={selectedCarrier}
            onClose={closeEditModal}
            onUpdate={updateCarrier}
          />
        )}
      </Modal>
    </div>
  );
};

export default CarrierTable;

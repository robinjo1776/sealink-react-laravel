import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Table from "../common/Table";
import Modal from "../common/Modal";
import EditCustomerForm from "./EditCustomerForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("cust_name");
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const perPage = 8;

  // Fetch customer data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
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
        const { data } = await axios.get("http://127.0.0.1:8000/api/customer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomers(data);
      } catch (error) {
        console.error("Error loading customers:", error);
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
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

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id
          ? { ...customer, ...updatedCustomer }
          : customer
      )
    );
  };

  const deleteCustomer = async (id) => {
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

        await axios.delete(`http://127.0.0.1:8000/api/customer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== id)
        );
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting customer:", error);
        Swal.fire("Error!", "Failed to delete the customer.", "error");
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
  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  const sortedCustomers = filteredCustomers.sort((a, b) => {
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
  const paginatedData = sortedCustomers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filteredCustomers.length / perPage);

  // Table headers
  const headers = [
    { key: "cust_name", label: "Name" },
    { key: "cust_type", label: "Type" },
    { key: "cust_email", label: "Email" },
    { key: "cust_contact_no", label: "Contact No" },
    { key: "cust_primary_address", label: "Primary Address" },
    { key: "cust_primary_city", label: "Primary City" },
    { key: "cust_primary_state", label: "Primary State" },
    { key: "cust_primary_country", label: "Primary Country" },
    {
      key: "cust_credit_status",
      label: "Status",
      render: (item) => (
        <span className={`badge ${getStatusClass(item.cust_credit_status)}`}>
          {item.cust_credit_status}
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
            onClick={() => deleteCustomer(item.id)}
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
      case "Approved":
        return "badge-product";
      case "Not Approved":
        return "badge-lanes";

      default:
        return "badge-default";
    }
  };
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div>
      {/* Header with Add Customer button and search input */}
      <div className="header-container">
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
          <span>Loading customers...</span>
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

      {/* Edit Customer Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Customer"
      >
        {selectedCustomer && (
          <EditCustomerForm
            customer={selectedCustomer}
            onClose={closeEditModal}
            onUpdate={updateCustomer}
          />
        )}
      </Modal>
    </div>
  );
};

export default CustomerTable;

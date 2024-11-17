import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Table from "../common/Table"; // Assuming you have a Table component for rendering the table
import Modal from "../common/Modal";
import EditCustomerForm from "./EditCustomerForm"; // Assuming you have an EditCustomerForm component
import AddCustomerForm from "./AddCustomerForm"; // Assuming you have an AddCustomerForm component

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("cust_name"); // Default sorting by name
  const [sortDesc, setSortDesc] = useState(true); // Default descending order
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
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

        setLoading(true);  // Set loading to true before fetching
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
        setLoading(false);  // Set loading to false once data is fetched
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
      window.location.href = '/login'; // Redirect to login page
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load customers.",
      });
    }
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id ? { ...customer, ...updatedCustomer } : customer
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
        const token = localStorage.getItem("authToken");

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

        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
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

  // Sorting based on selected column
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    return sortDesc ? (valB > valA ? 1 : -1) : valA > valB ? 1 : -1;
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
    { key: "cust_credit_status", label: "Credit Status" },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            Edit
          </button>
          <button onClick={() => deleteCustomer(item.id)} className="btn-delete">
            Delete
          </button>
        </>
      ),
    },
  ];

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div>
      {/* Header with Add Customer button and search input */}
      <div className="header-container">
        <button onClick={openAddModal} className="add-button">
          Add Customer
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
          <span>Loading customers...</span>
        </div>
      ) : (
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
      )}



      {/* Edit Customer Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Customer">
        {selectedCustomer && (
          <EditCustomerForm
            customer={selectedCustomer}
            onClose={closeEditModal}
            onUpdate={updateCustomer}
          />
        )}
      </Modal>

      {/* Add Customer Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Customer">
        <AddCustomerForm
          onClose={closeAddModal}
          onAddCustomer={(newCustomer) => {
            setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default CustomerTable;

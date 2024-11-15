import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Table from "../common/Table";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("cust_name"); // Default sorting by name
  const [sortDesc, setSortDesc] = useState(true); // Descending order
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/customer");
        setCustomers(data);
      } catch (error) {
        console.error("Error loading customers:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load customers.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true); // Sort descending when changing the column
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/customer/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Customer data has been deleted successfully.",
      });
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete data.",
      });
    }
  };

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
    const valA = a[sortBy];
    const valB = b[sortBy];
    return sortDesc ? (valB > valA ? 1 : -1) : valA > valB ? 1 : -1;
  });

  const paginatedData = sortedCustomers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filteredCustomers.length / perPage);

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
  ];

  return (
    <div>
      <div className="header-container">
        <Link to="/customer/add-customer" className="add-button">
          Add Customer
        </Link>
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
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        editFormType="customer" // Specify the edit form type
      />
    </div>
  );
};

export default CustomerTable;

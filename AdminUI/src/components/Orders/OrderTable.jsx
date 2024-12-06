import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Table from "../common/Table";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("customer"); // Default sorting by customer
  const [sortDesc, setSortDesc] = useState(true); // Descending order
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/order");
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load orders.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
      await axios.delete(`http://127.0.0.1:8000/api/order/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Order data has been deleted successfully.",
      });
      setOrders(orders.filter((order) => order.id !== id));
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
  const filteredOrders = orders.filter((order) =>
    Object.values(order).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(normalizedSearchQuery)
    )
  );

  const sortedOrders = filteredOrders.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    return sortDesc ? (valB > valA ? 1 : -1) : valA > valB ? 1 : -1;
  });

  const paginatedData = sortedOrders.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filteredOrders.length / perPage);

  const headers = [
    { key: "customer", label: "Customer" },
    { key: "equipment", label: "Equipment" },
    { key: "pickup_date", label: "Pickup Date" },
    { key: "delivery_date", label: "Delivery Date" },
    { key: "base_price", label: "Base Price" },
    { key: "final_price", label: "Final Price" },
    { key: "notes", label: "Notes" },
  ];

  return (
    <div>
      <div className="header-container">
        <Link to="/order/add-order" className="add-button">
          Add Order
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
        editFormType="order" // Specify the edit form type
      />
    </div>
  );
};

export default OrderTable;

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditShipmentForm from './EditShipment/EditShipmentForm';
import AddShipmentForm from './AddShipment/AddShipmentForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ShipmentTable = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipment, setselectedShipment] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const perPage = 8;

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token dynamically
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true); // Set loading to true before fetching
        const { data } = await axios.get('http://127.0.0.1:8000/api/shipment', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched Shipments:', data); // Debugging the fetched data
        setShipments(data);
      } catch (error) {
        console.error('Error loading shipments:', error);
        handleFetchError(error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchShipments();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You need to log in to access this resource.',
      });
    }
  };

  const updateShipment = (updatedShipment) => {
    setShipments((prevShipments) =>
      prevShipments.map((shipment) => (shipment.id === updatedShipment.id ? { ...shipment, ...updatedShipment } : shipment))
    );
  };

  const deleteShipment = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.delete(`http://127.0.0.1:8000/api/shipment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setShipments((prevShipments) => prevShipments.filter((shipment) => shipment.id !== id));
        Swal.fire('Deleted!', 'The shipment has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting shipment:', error);

        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'Your session has expired. Please log in again.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Failed to delete the shipment.',
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An unexpected error occurred.',
          });
        }
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
    setselectedShipment(lead);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setselectedShipment(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredShipments = shipments.filter((shipment) =>
    Object.values(shipment).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedShipments = filteredShipments.sort((a, b) => {
    // Handle sorting for different data types
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (typeof valA === 'string') {
      // Sort strings alphabetically
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    // Default number sorting
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedShipments.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredShipments.length / perPage);

  const headers = [
    { key: 'ship_load_date', label: 'Load Date' },
    { key: 'ship_pickup_location', label: 'Pickup Location' },
    { key: 'ship_delivery_location', label: 'Delivery Location' },
    { key: 'ship_driver', label: 'Driver' },
    { key: 'ship_weight', label: 'Weight' },
    { key: 'ship_ftl_ltl', label: 'FTL/LTL' },
    {
      key: 'ship_tarp',
      label: 'TARP',
      render: (item) => <span className={item.ship_tarp ? 'tarp-yes' : 'tarp-no'}>{item.ship_tarp ? 'Yes' : 'No'}</span>,
    },
    { key: 'ship_equipment', label: 'Equipment' },
    { key: 'ship_price', label: 'Price' },
    { key: 'ship_notes', label: 'Notes' },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteShipment(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search shipments..." />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          data={paginatedData}
          headers={headers.map((header) => ({
            ...header,
            label: (
              <div className="sortable-header" onClick={() => handleSort(header.key)}>
                {header.label}
                {sortBy === header.key && (
                  <span className="sort-icon">
                    {sortDesc ? '▲' : '▼'} {/* Render Asc/Desc icon based on the sort order */}
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
          onEditClick={openEditModal}
        />
      )}

      {/* Edit Lead Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Shipment">
        {selectedShipment && <EditShipmentForm shipment={selectedShipment} onClose={closeEditModal} onUpdate={updateShipment} />}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Shipment">
        <AddShipmentForm
          onClose={closeAddModal}
          onAddShipment={(newShipment) => {
            setShipments((prevShipments) => [...prevShipments, newShipment]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default ShipmentTable;

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserContext } from '../../UserProvider';
import AddQuoteForm from './AddQuote/AddQuoteForm';
import EditQuoteForm from './EditQuote/EditQuoteForm';

const QuoteTable = () => {
  const users = useContext(UserContext);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const perPage = 8;

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : 'Unknown';
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token dynamically
        if (!token) {
          throw new Error('No token found');
        }

        setLoading(true); // Set loading to true before fetching
        const { data } = await axios.get('http://127.0.0.1:8000/api/quote', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched Quotes:', data); // Debugging the fetched data
        setQuotes(data);
      } catch (error) {
        console.error('Error loading quotes:', error);
        handleFetchError(error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchQuotes();
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

  const updateQuote = (updatedQuote) => {
    setQuotes((prevQuotes) => prevQuotes.map((quote) => (quote.id === updatedQuote.id ? { ...quote, ...updatedQuote } : quote)));
  };

  const deleteQuote = async (id) => {
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

        const response = await axios.delete(`http://127.0.0.1:8000/api/quote/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Delete Response:', response);
        setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
        Swal.fire('Deleted!', 'The quote has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting quote:', error);

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
              text: 'Failed to delete the lead.',
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
    setSelectedQuote(lead);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedQuote(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredQuotes = quotes.filter((quote) =>
    Object.values(quote).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedQuotes = filteredQuotes.sort((a, b) => {
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

  const paginatedData = sortedQuotes.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalPages = Math.ceil(filteredQuotes.length / perPage);

  const headers = [
    { key: 'quote_type', label: 'Type' },
    { key: 'quote_customer', label: 'Customer' },
    { key: 'quote_cust_ref_no', label: 'Customer Ref#' },
    { key: 'quote_booked_by', label: 'Booked by' },

    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
          <button onClick={() => deleteQuote(item.id)} className="btn-delete">
            <DeleteOutlined />
          </button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="header-container">
        <button onClick={openAddModal} className="add-button">
          Create Quote
        </button>
        <div className="search-container">
          <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search quotes..." />
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
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Quote">
        {selectedQuote && <EditQuoteForm quote={selectedQuote} onClose={closeEditModal} onUpdate={updateQuote} />}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Create Quote">
        <AddQuoteForm
          onClose={closeAddModal}
          onAddQuote={(newQuote) => {
            setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
            closeAddModal();
          }}
        />
      </Modal>
    </div>
  );
};

export default QuoteTable;

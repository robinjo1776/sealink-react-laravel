import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import FollowupProductForm from './FollowupProductForm';
import FollowupContactForm from './FollowupContactForm';

const EditLeadFollowupForm = ({ followUp, onClose, onUpdate }) => {
  const [followupEdit, setfolloupEdit] = useState({
    id: '',
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    unit_no: '',
    lead_type: '',
    contact_person: '',
    notes: '',
    next_follow_up_date: '',
    followup_type: '',
    products: [],
    lead_status: '',
    remarks: '',
    equipment: '',
    contacts: [],
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (followUp) {
      const parsedContacts = Array.isArray(followUp.contacts) ? followUp.contacts : JSON.parse(followUp.contacts || '[]');
      const parsedProducts = Array.isArray(followUp.products) ? followUp.products : JSON.parse(followUp.products || '[]');
      setfolloupEdit({
        ...followUp,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
        products: parsedProducts.length > 0 ? parsedProducts : [],
      });
    }
  }, [followUp]);

  const validateFollowup = () => {
    return followupEdit.lead_no && followupEdit.lead_date && followupEdit.lead_status;
  };

  const updateFollowup = async () => {
    if (validateFollowup()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in. Please log in again.',
          });
          return;
        }

        // Log the followupEdit payload to check if it's in the correct format
        console.log('Payload to be sent:', followupEdit);

        const response = await axios.put(`http://127.0.0.1:8000/api/lead-followup/${followupEdit.id}`, followupEdit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Follow-up data has been updated successfully.',
        });

        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating follow-up:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update follow-up.',
        });
      }
    }
  };

  const handleAddContact = () => {
    setfolloupEdit((prevFollowup) => ({
      ...prevFollowup,
      contacts: [...prevFollowup.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  const handleRemoveContact = (index) => {
    setfolloupEdit((prevFollowup) => ({
      ...prevFollowup,
      contacts: prevFollowup.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = followupEdit.contacts.map((contact, i) => (i === index ? updatedContact : contact));
    setfolloupEdit({
      ...followupEdit,
      contacts: updatedContacts,
    });
  };

  const handleAddProduct = () => {
    setfolloupEdit((prevFollowup) => ({
      ...prevFollowup,
      products: [...prevFollowup.products, { name: '', quantity: '' }],
    }));
  };

  const handleRemoveProduct = (index) => {
    setfolloupEdit((prevFollowup) => ({
      ...prevFollowup,
      products: prevFollowup.products.filter((_, i) => i !== index),
    }));
  };

  const handleProductChange = (index, updatedProduct) => {
    const updatedProducts = followupEdit.products.map((product, i) => (i === index ? updatedProduct : product));
    setfolloupEdit({
      ...followupEdit,
      products: updatedProducts,
    });
  };

  const leadStatusOptions = ['New', 'In Progress', 'Completed', 'On Hold', 'Lost'];

  const equipmentTypeOptions = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];

  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address || '';

    setfolloupEdit((prevLead) => ({
      ...prevLead,
      address: formattedAddress,
      city: getComponent('locality', '', addressComponents),
      state: getComponent('administrative_area_level_1', '', addressComponents),
      country: getComponent('country', '', addressComponents),
      postal_code: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFollowup();
        }}
        className="form-main"
      >
        <fieldset className="form-section">
          <legend>Follow-up Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadNo">Lead No*</label>
              <input
                type="text"
                value={followupEdit.lead_no}
                onChange={(e) => setfolloupEdit({ ...followupEdit, lead_no: e.target.value })}
                id="leadNo"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadDate">Lead Date*</label>
              <input
                type="date"
                value={followupEdit.lead_date}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    lead_date: e.target.value,
                  })
                }
                id="leadDate"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                value={followupEdit.customer_name}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    customer_name: e.target.value,
                  })
                }
                id="customerName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" value={followupEdit.phone} onChange={(e) => setfolloupEdit({ ...followupEdit, phone: e.target.value })} id="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={followupEdit.email}
                onChange={(e) => setfolloupEdit({ ...followupEdit, email: e.target.value })}
                id="email"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Address Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                value={followupEdit.address}
                onChange={(e) => setfolloupEdit({ ...followupEdit, address: e.target.value })}
                id="address"
                ref={addressRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" value={followupEdit.city} onChange={(e) => setfolloupEdit({ ...followupEdit, city: e.target.value })} id="city" />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input type="text" value={followupEdit.state} onChange={(e) => setfolloupEdit({ ...followupEdit, state: e.target.value })} id="state" />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value={followupEdit.country}
                onChange={(e) => setfolloupEdit({ ...followupEdit, country: e.target.value })}
                id="country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                value={followupEdit.postal_code}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    postal_code: e.target.value,
                  })
                }
                id="postalCode"
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitNo">Unit No</label>
              <input
                type="text"
                value={followupEdit.unit_no}
                onChange={(e) => setfolloupEdit({ ...followupEdit, unit_no: e.target.value })}
                id="unitNo"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Lead Type and Contact</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadType">Lead Type</label>
              <input
                type="text"
                value={followupEdit.lead_type}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    lead_type: e.target.value,
                  })
                }
                id="leadType"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                value={followupEdit.contact_person}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    contact_person: e.target.value,
                  })
                }
                id="contactPerson"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Follow Up Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nextFollowUpDate">Next Follow-Up Date</label>
              <input
                type="date"
                value={followupEdit.next_follow_up_date}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    next_follow_up_date: e.target.value,
                  })
                }
                id="nextFollowUpDate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadStatus">Lead Status*</label>
              <select
                value={followupEdit.lead_status}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    lead_status: e.target.value,
                  })
                }
                id="leadStatus"
                required
              >
                <option value="">Select Lead Status</option>
                {leadStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupEdit.products.map((product, index) => (
              <FollowupProductForm
                key={index}
                product={product}
                formFollowup={followupEdit}
                setformFollowup={setfolloupEdit}
                onChange={handleProductChange}
                onRemove={handleRemoveProduct}
              />
            ))}
            <button type="button" onClick={handleAddProduct} className="add">
              Add Product
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followupEdit.contacts.map((contact, index) => (
              <FollowupContactForm
                key={index}
                contact={contact}
                formFollowup={followupEdit}
                setformFollowup={setfolloupEdit}
                onChange={handleContactChange}
                onRemove={handleRemoveContact}
              />
            ))}
            <button type="button" onClick={handleAddContact} className="add">
              Add Contact
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Additional Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea value={followupEdit.remarks} onChange={(e) => setfolloupEdit({ ...followupEdit, remarks: e.target.value })} id="remarks" />
            </div>
            <div className="form-group">
              <label htmlFor="equipment">Equipment</label>
              <select
                id="equipment"
                value={followupEdit.equipment}
                onChange={(e) =>
                  setfolloupEdit({
                    ...followupEdit,
                    equipment: e.target.value,
                  })
                }
              >
                <option value="">Select Equipment Type</option>
                {equipmentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea value={followupEdit.notes} onChange={(e) => setfolloupEdit({ ...followupEdit, notes: e.target.value })} id="notes" />
            </div>
          </div>
        </fieldset>
        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLeadFollowupForm;

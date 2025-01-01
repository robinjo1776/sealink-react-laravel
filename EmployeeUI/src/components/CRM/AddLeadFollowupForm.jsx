import { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../UserProvider';
import '../../styles/Form.css';
import FollowupProductForm from './FollowupProductForm';
import FollowupContactForm from './FollowupContactForm';
import LeadInfo from './AddFollowup/LeadInfo';
import LeadType from './AddFollowup/LeadType';
import FollowupDetails from './AddFollowup/FollowupDetails';
import AddressDetails from './AddFollowup/AddressDetails';
import AdditionalInfo from './AddFollowup/AdditionalInfo';

const AddLeadFollowupForm = ({ onClose, onAddFollowup }) => {
  const { currentUser } = useContext(UserContext);
  const [followupData, setFollowupData] = useState({
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedFollowupData = {
      ...followupData,
      products: JSON.stringify(followupData.products),
      contacts: JSON.stringify(followupData.contacts),
    };

    console.log('Lead data before submission:', formattedFollowupData);

    const validateLead = () => {
      return followupData.lead_no && followupData.lead_date && followupData.lead_type && followupData.lead_status;
    };

    if (validateLead()) {
      try {
        let response;
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire('Error', 'No token found', 'error');
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (followupData.id) {
          response = await axios.put(`http://127.0.0.1:8000/api/lead-followup/${followupData.id}`, formattedFollowupData, { headers });
          Swal.fire('Updated!', 'Follow-up data has been updated successfully.', 'success');
        } else {
          response = await axios.post('http://127.0.0.1:8000/api/lead-followup', formattedFollowupData, { headers });
          Swal.fire('Saved!', 'Follow-up data has been saved successfully.', 'success');
        }

        onAddFollowup(response.data);
        clearFollowupForm();
        onClose();
      } catch (error) {
        console.error('Error saving/updating follow-up:', error.response ? error.response.data : error.message);
        Swal.fire('Error', 'An error occurred while saving/updating the follow-up.', 'error');
      }
    } else {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
    }
  };

  const clearFollowupForm = () => {
    setFollowupData({
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
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        {/* Lead Information */}
        <LeadInfo followupData={followupData} setFollowupData={setFollowupData} />
        {/* Address Details */}
        <AddressDetails followupData={followupData} setFollowupData={setFollowupData} />
        {/* Lead Type & Contact */}
        <LeadType followupData={followupData} setFollowupData={setFollowupData} />

        {/* Follow-up Details */}
        <FollowupDetails followupData={followupData} setFollowupData={setFollowupData} />

        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupData.products.map((product, index) => (
              <FollowupProductForm
                key={index}
                product={product}
                formFollowup={followupData}
                setformFollowup={setFollowupData}
                onChange={(updatedProduct) => {
                  const updatedProducts = [...followupData.products];
                  updatedProducts[index] = updatedProduct;
                  setFollowupData({
                    ...followupData,
                    products: updatedProducts,
                  });
                }}
                onRemove={() => {
                  const updatedProducts = followupData.products.filter((_, i) => i !== index);
                  setFollowupData({
                    ...followupData,
                    products: updatedProducts,
                  });
                }}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFollowupData((prevFollowup) => ({
                  ...prevFollowup,
                  products: [...prevFollowup.products, { name: '', quantity: '' }],
                }))
              }
              className="add"
            >
              Add Product
            </button>
          </div>
        </fieldset>

        {/* Contacts Section */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followupData.contacts.map((contact, index) => (
              <FollowupContactForm key={index} contact={contact} formFollowup={followupData} setformFollowup={setFollowupData} />
            ))}
            <button
              type="button"
              onClick={() =>
                setFollowupData((prevFollowup) => ({
                  ...prevFollowup,
                  contacts: [...prevFollowup.contacts, { name: '', phone: '' }],
                }))
              }
              className="add"
            >
              Add Contact
            </button>
          </div>
        </fieldset>
        {/* Additional Info */}
        <AdditionalInfo followupData={followupData} setFollowupData={setFollowupData} />

        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLeadFollowupForm;

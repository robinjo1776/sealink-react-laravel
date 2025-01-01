import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../../UserProvider';
import LeadContactForm from './LeadContactForm';
import EditLeadDetails from './EditLead/EditLeadDetails';
import EditAddressDetails from './EditLead/EditAddressDetails';
import EditAdditionalInfo from './EditLead/EditAdditionalInfo';

const EditLeadQuotesForm = ({ lead, onClose, onUpdate }) => {
  const users = useContext(UserContext);

  const [formLead, setFormLead] = useState({
    id: '',
    lead_no: '',
    lead_date: '',
    customer_name: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    unit_no: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    equipment_type: '',
    lead_type: '',
    lead_status: '',
    follow_up_date: '',
    assigned_to: '',
    contacts: [{ name: '', phone: '', email: '' }],
  });

  useEffect(() => {
    if (lead) {
      const parsedContacts = Array.isArray(lead.contacts) ? lead.contacts : JSON.parse(lead.contacts || '[]');
      setFormLead({
        ...lead,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
      });
    }
  }, [lead]);

  const validateLeadQuotes = () => {
    return formLead.lead_no && formLead.lead_date && formLead.lead_status;
  };

  const updateLead = async () => {
    if (validateLeadQuotes()) {
      try {
        // Get the token from localStorage or from the UserContext
        const token = localStorage.getItem('token');

        if (!token) {
          // If no token is found, show an alert and exit the function
          Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You are not logged in. Please log in again.',
          });
          return;
        }

        // Make the PUT request with the Authorization header
        const response = await axios.put(`http://127.0.0.1:8000/api/lead/${formLead.id}`, formLead, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Lead data has been updated successfully.',
        });

        // Call onUpdate to update the lead data in the parent component
        onUpdate(response.data);
        onClose();
      } catch (error) {
        console.error('Error updating lead:', error);

        // Handle different errors, including the 401 Unauthorized
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response && error.response.status === 401 ? 'Unauthorized. Please log in again.' : 'Failed to update lead.',
        });
      }
    }
  };

  const handleAddContact = () => {
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: [...prevLead.contacts, { name: '', phone: '', email: '' }],
    }));
  };

  const handleRemoveContact = (index) => {
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: prevLead.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = formLead.contacts.map((contact, i) => (i === index ? updatedContact : contact));
    setFormLead((prevLead) => ({
      ...prevLead,
      contacts: updatedContacts,
    }));
  };

  const equipmentTypeOptions = ['Van', 'Reefer', 'Flatbed', 'Triaxle', 'Maxi', 'Btrain', 'Roll tite'];

  const leadTypeOptions = ['AB', 'BC', 'BDS', 'CA', 'DPD MAGMA', 'MB', 'ON', 'Super Leads', 'TBAB', 'USA'];

  const leadStatusOptions = [
    'Prospect customer',
    'Lanes discussed',
    'Product/Equipment discussed',
    'E-mail sent to concerned person',
    'Carrier portal registration',
    'Quotations',
    'Fob/Have broker',
    'Voicemail/No answer',
    'Different Department',
    'No answer/Callback/Voicemail',
    'Not interested reason provided in notes',
    'Asset based only',
  ];

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateLead();
        }}
        className="form-main"
      >
        <EditLeadDetails formLead={formLead} setFormLead={setFormLead} />

        <EditAddressDetails formLead={formLead} setFormLead={setFormLead} />

        <fieldset className="form-section">
          <legend>Equipment & Lead Type</legend>
          <div className="form-group">
            <label htmlFor="equipmentType">Equipment Type</label>
            <select id="equipmentType" value={formLead.equipment_type} onChange={(e) => setFormLead({ ...formLead, equipment_type: e.target.value })}>
              <option value="">Select Equipment Type</option>
              {equipmentTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leadType">Lead Type</label>
            <select id="leadType" value={formLead.lead_type} onChange={(e) => setFormLead({ ...formLead, lead_type: e.target.value })}>
              <option value="">Select Lead Type</option>
              {leadTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leadStatus">Lead Status*</label>
            <select id="leadStatus" value={formLead.lead_status} onChange={(e) => setFormLead({ ...formLead, lead_status: e.target.value })} required>
              <option value="">Select Lead Status</option>
              {leadStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* Additional Fields */}
        <EditAdditionalInfo formLead={formLead} setFormLead={setFormLead} />

        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {formLead.contacts.map((contact, index) => (
              <LeadContactForm key={index} contact={contact} index={index} onChange={handleContactChange} onRemove={handleRemoveContact} />
            ))}
            <button type="button" onClick={handleAddContact} className="add">
              Add Contact
            </button>
          </div>
        </fieldset>

        <button type="submit" className="btn-submit">
          Update Lead
        </button>
      </form>
    </div>
  );
};

export default EditLeadQuotesForm;

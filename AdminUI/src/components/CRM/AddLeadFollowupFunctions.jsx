import axios from 'axios';
import Swal from 'sweetalert2';

// AddLeadFollowupFunctions.jsx
export const handleSubmit = async (e, followupData, setFollowupData) => {
  e.preventDefault();

  if (validateFollowup(followupData)) {
    try {
      const dataToSubmit = {
        ...followupData,
        products: JSON.stringify(followupData.products),
        contacts: JSON.stringify(followupData.contacts),
        remarks: followupData.remarks,
        equipment: followupData.equipment,
      };

      await axios.post('http://127.0.0.1:8000/api/lead-followup', dataToSubmit);
      Swal.fire('Success!', 'Lead follow-up saved.', 'success');
      clearForm(setFollowupData);
    } catch (error) {
      console.error('Error saving lead follow-up:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'An error occurred while saving the lead follow-up.', 'error');
    }
  } else {
    Swal.fire('Validation Error', 'Please fill in all required fields.', 'error');
  }
};

const validateFollowup = (data) => {
  return data.lead_no && data.lead_status && data.customer_name; // Ensure required fields
};

const clearForm = (setFollowupData) => {
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

export const loadGoogleMapsApi = (addressRef, setFollowupData) => {
  if (window.google && window.google.maps) {
    initializeAutocomplete(addressRef, setFollowupData);
    return;
  }

  const script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDc8xuE7HdQjIgnjngyE1uUZhw9tt0JMd8&libraries=places"; // Replace with your API key
  script.async = true;
  script.defer = true;
  script.onload = () => initializeAutocomplete(addressRef, setFollowupData);
  document.head.appendChild(script);
};

const initializeAutocomplete = (addressRef, setFollowupData) => {
  const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
    types: ['address'],
    componentRestrictions: { country: 'us' }
  });
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    updateAddressFields(place, setFollowupData);
  });
};

const updateAddressFields = (place, setFollowupData) => {
  const addressComponents = place.address_components;
  const formattedAddress = place.formatted_address || '';

  setFollowupData(prevData => ({
    ...prevData,
    address: formattedAddress,
    city: getComponent('locality', addressComponents),
    state: getComponent('administrative_area_level_1', addressComponents),
    country: getComponent('country', addressComponents),
    postal_code: getComponent('postal_code', addressComponents),
  }));
};

const getComponent = (type, components) => {
  const component = components.find(c => c.types.includes(type));
  return component ? component.long_name : '';
};

// Product functions
export const handleProductChange = (index, field, value, followupData, setFollowupData) => {
  const updatedProducts = [...followupData.products];
  updatedProducts[index][field] = value;
  setFollowupData({ ...followupData, products: updatedProducts });
};

export const addProduct = (setFollowupData, followupData) => {
  setFollowupData(prevData => ({
    ...prevData,
    products: [...prevData.products, { name: '', quantity: '' }]
  }));
};

export const removeProduct = (index, followupData, setFollowupData) => {
  const updatedProducts = followupData.products.filter((_, i) => i !== index);
  setFollowupData({ ...followupData, products: updatedProducts });
};

// Contact functions
export const addContact = (setFollowupData, followupData) => {
  setFollowupData(prevData => ({
    ...prevData,
    contacts: [...prevData.contacts, { name: '', phone: '' }]
  }));
};

export const removeContact = (index, followupData, setFollowupData) => {
  const updatedContacts = followupData.contacts.filter((_, i) => i !== index);
  setFollowupData({ ...followupData, contacts: updatedContacts });
};

export const handleContactChange = (index, field, value, followupData, setFollowupData) => {
  const updatedContacts = [...followupData.contacts];
  updatedContacts[index][field] = value;
  setFollowupData({ ...followupData, contacts: updatedContacts });
};

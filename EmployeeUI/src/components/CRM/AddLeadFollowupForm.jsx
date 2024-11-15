import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditContactForm from "./EditContactForm";
import "../../styles/Form.css";

const AddLeadFollowupForm = ({ onClose, onAddLead }) => {
  const [followUp, setFollowUp] = useState({
    id: "",
    lead_no: "",
    lead_date: "",
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    unit_no: "",
    lead_type: "",
    contact_person: "",
    notes: "",
    next_follow_up_date: "",
    followup_type: "",
    products: [],
    lead_status: "",
    remarks: "",
    equipment: "",
    contacts: [],
  });

  const leadStatusOptions = [
    "New",
    "In Progress",
    "Completed",
    "On Hold",
    "Lost",
  ];
  const leadTypeOptions = [
    "AB",
    "BC",
    "BDS",
    "CA",
    "DPD MAGMA",
    "MB",
    "ON",
    "Super Leads",
    "TBAB",
    "USA",
  ];
  const equipmentTypeOptions = [
    "Van",
    "Reefer",
    "Flatbed",
    "Triaxle",
    "Maxi",
    "Btrain",
    "Roll tite",
  ];

  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDc8xuE7HdQjIgnjngyE1uUZhw9tt0JMd8&libraries=places";
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

useEffect(() => {
  const fetchFollowUps = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const { data } = await axios.get("http://127.0.0.1:8000/api/lead-followup", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Follow-ups:", data);

      // Set the fetched follow-ups data
      setFollowUp(data);
    } catch (error) {
      console.error("Error loading followups:", error);
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchFollowUps();
}, [users]); 

  
  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressRef.current,
      {
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address || "";

    setFollowUp((prevLead) => ({
      ...prevLead,
      address: formattedAddress,
      city: getComponent("locality", "", addressComponents),
      state: getComponent("administrative_area_level_1", "", addressComponents),
      country: getComponent("country", "", addressComponents),
      postal_code: getComponent("postal_code", "", addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  // Make handleSubmit async to work with await
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Authentication Error",
        text: "You are not authenticated. Please log in again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Ensure the products and contacts fields are serialized as strings
    const leadData = {
      ...followUp,
      products: followUp.products ? JSON.stringify(followUp.products) : "",
      contacts: followUp.contacts ? JSON.stringify(followUp.contacts) : "",
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/lead-followup",
        leadData,
        { headers }
      );

      console.log("Follow-up submitted successfully:", response.data);
      Swal.fire({
        title: "Success!",
        text: "The lead follow-up has been submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      onAddLead(response.data); // Update parent component with the new lead
      clearLeadForm(); // Clear the form after successful submission
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error saving/updating follow-up:", error.response.data);
        Swal.fire({
          title: "Error!",
          text: `Error: ${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        console.error("Unknown error:", error);
        Swal.fire({
          title: "Unknown Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const validateLead = () => {
    return (
      followUp.lead_no &&
      followUp.lead_date &&
      followUp.lead_type &&
      followUp.lead_status
    );
  };

  const clearLeadForm = () => {
    setFollowUp({
      id: "",
      lead_no: "",
      lead_date: "",
      customer_name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      unit_no: "",
      lead_type: "",
      contact_person: "",
      notes: "",
      next_follow_up_date: "",
      followup_type: "",
      products: [],
      lead_status: "",
      remarks: "",
      equipment: "",
      contacts: [],
    });
  };

  const onChange  = (e) => {
    const { name, value } = e.target;
    setFollowUp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)} className="form-main">
        {/* Lead Details */}
        <fieldset className="form-section">
          <legend>Lead Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadNo">Lead No*</label>
              <input
                type="text"
                value={followUp.lead_no}
                onChange={(e) =>
                  setFollowUp({ ...followUp, lead_no: e.target.value })
                }
                id="leadNo"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadDate">Lead Date</label>
              <input
                type="date"
                value={followUp.lead_date}
                onChange={(e) =>
                  setFollowUp({ ...followUp, lead_date: e.target.value })
                }
                id="leadDate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                value={followUp.customer_name}
                onChange={(e) =>
                  setFollowUp({ ...followUp, customer_name: e.target.value })
                }
                id="customerName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                value={followUp.phone}
                onChange={(e) =>
                  setFollowUp({ ...followUp, phone: e.target.value })
                }
                id="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={followUp.email}
                onChange={(e) =>
                  setFollowUp({ ...followUp, email: e.target.value })
                }
                id="email"
              />
            </div>
          </div>
        </fieldset>
        {/* Address Details */}
        <fieldset className="form-section">
          <legend>Address Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                value={followUp.address}
                onChange={(e) =>
                  setFollowUp({ ...followUp, address: e.target.value })
                }
                id="address"
                ref={addressRef}
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitNo">Unit No</label>
              <input
                type="text"
                value={followUp.unit_no}
                onChange={(e) =>
                  setFollowUp({ ...followUp, unit_no: e.target.value })
                }
                id="unitNo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                value={followUp.city}
                onChange={(e) =>
                  setFollowUp({ ...followUp, city: e.target.value })
                }
                id="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                value={followUp.state}
                onChange={(e) =>
                  setFollowUp({ ...followUp, state: e.target.value })
                }
                id="state"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value={followUp.country}
                onChange={(e) =>
                  setFollowUp({ ...followUp, country: e.target.value })
                }
                id="country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                value={followUp.postal_code}
                onChange={(e) =>
                  setFollowUp({ ...followUp, postal_code: e.target.value })
                }
                id="postalCode"
              />
            </div>
          </div>
        </fieldset>
        {/* Lead Type */}
        <fieldset className="form-section">
          <legend>Lead Type and Contact</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadType">Lead Type</label>
              <select
                id="leadType"
                value={followUp.lead_type}
                onChange={(e) =>
                  setFollowUp({ ...followUp, lead_type: e.target.value })
                }
                required
              >
                <option value="">Select Lead Type</option>
                {leadTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                value={followUp.contact_person}
                onChange={(e) =>
                  setFollowUp({
                    ...followUp,
                    contact_person: e.target.value,
                  })
                }
                id="contactPerson"
              />
            </div>
          </div>
        </fieldset>
        {/* Lead Status */}
        <fieldset className="form-section">
          <legend>Follow Up Details</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nextFollowUpDate">Next Follow-Up Date</label>
              <input
                type="date"
                value={followUp.next_follow_up_date}
                onChange={(e) =>
                  setFollowUp({
                    ...followUp,
                    next_follow_up_date: e.target.value,
                  })
                }
                id="nextFollowUpDate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadStatus">Lead Status</label>
              <select
                id="leadStatus"
                value={followUp.lead_status}
                onChange={(e) =>
                  setFollowUp({ ...followUp, lead_status: e.target.value })
                }
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

        {/* Products */}
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followUp.contacts.map((contact, index) => (
              <EditContactForm
                key={index}
                contact={contact}
                onChange={(updatedContact) => {
                  const updatedContacts = [...followUp.contacts];
                  updatedContacts[index] = updatedContact;
                  setFollowUp({ ...followUp, contacts: updatedContacts });
                }}
                onRemove={() => {
                  const updatedContacts = followUp.contacts.filter(
                    (_, i) => i !== index
                  );
                  setFollowUp({ ...followUp, contacts: updatedContacts });
                }}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFollowUp((prevLead) => ({
                  ...prevLead,
                  contacts: [
                    ...prevLead.contacts,
                    { name: "", phone: "", email: "" },
                  ],
                }))
              }
              className="add"
            >
              Add Contact
            </button>
          </div>
        </fieldset>
        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followUp.contacts.map((contact, index) => (
              <EditContactForm
                key={index}
                contact={contact}
                onChange={(updatedContact) => {
                  const updatedContacts = [...followUp.contacts];
                  updatedContacts[index] = updatedContact;
                  setFollowUp({ ...followUp, contacts: updatedContacts });
                }}
                onRemove={() => {
                  const updatedContacts = followUp.contacts.filter(
                    (_, i) => i !== index
                  );
                  setFollowUp({ ...followUp, contacts: updatedContacts });
                }}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setFollowUp((prevLead) => ({
                  ...prevLead,
                  contacts: [
                    ...prevLead.contacts,
                    { name: "", phone: "", email: "" },
                  ],
                }))
              }
              className="add"
            >
              Add Contact
            </button>
          </div>
        </fieldset>
        {/* Additional Fields */}
        <fieldset className="form-section">
          <legend>Additional Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                value={followUp.remarks}
                onChange={(e) =>
                  setFollowUp({ ...followUp, remarks: e.target.value })
                }
                id="remarks"
              />
            </div>
            <div className="form-group">
              <label htmlFor="equipmentType">Equipment Type</label>
              <select
                id="equipmentType"
                value={followUp.equipment_type}
                onChange={(e) =>
                  setFollowUp({ ...followUp, equipment_type: e.target.value })
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
              <textarea
                value={followUp.notes}
                onChange={(e) =>
                  setFollowUp({ ...followUp, notes: e.target.value })
                }
                id="notes"
              />
            </div>
          </div>
        </fieldset>
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

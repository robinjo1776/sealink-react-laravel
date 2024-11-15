import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EditContactForm from "./EditContactForm";
import "../../styles/Form.css";

const LeadForm = ({ onClose, onAddLead }) => {
  const [lead, setLead] = useState({
    id: "",
    lead_no: "",
    lead_date: "",
    customer_name: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    unit_no: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    lead_type: "",
    contact_person: "",
    notes: "",
    lead_status: "",
    follow_up_date: "",
    equipment_type: "",
    contacts: [],
  });

  const equipmentTypeOptions = [
    "Van",
    "Reefer",
    "Flatbed",
    "Triaxle",
    "Maxi",
    "Btrain",
    "Roll tite",
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
  const leadStatusOptions = [
    "Prospect customer",
    "Lanes discussed",
    "Product/Equipment discussed",
    "E-mail sent to concerned person",
    "Carrier portal registration",
    "Quotations",
    "Fob/Have broker",
    "Voicemail/No answer",
    "Different Department",
    "No answer/Callback/Voicemail",
    "Not interested reason provided in notes",
    "Asset based only",
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

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: "us" }, // Adjust to your country if needed
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

    setLead((prevLead) => ({
      ...prevLead,
      address: formattedAddress, // Full address
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Lead data before submission:", lead); // Debugging log
  
    if (validateLead()) {
      try {
        let response;
        if (lead.id) {
          response = await axios.put(`http://127.0.0.1:8000/api/lead/${lead.id}`, lead);
          Swal.fire("Updated!", "Lead data has been updated successfully.", "success");
        } else {
          response = await axios.post("http://127.0.0.1:8000/api/lead", lead);
          Swal.fire("Saved!", "Lead data has been saved successfully.", "success");
        }
        
        // Call onAddLead to pass the newly created/updated lead data back
        onAddLead(response.data); 
        clearLeadForm();
        onClose(); // Close the modal after submission
      } catch (error) {
        console.error("Error saving/updating lead:", error.response ? error.response.data : error.message);
        Swal.fire("Error", "An error occurred while saving/updating the lead.", "error");
      }
    } else {
      Swal.fire("Validation Error", "Please fill in all required fields.", "error");
    }
  };
  

  const validateLead = () => {
    return lead.lead_no && lead.lead_date && lead.lead_type && lead.lead_status;
  };

  const clearLeadForm = () => {
    setLead({
      id: "",
      lead_no: "",
      lead_date: "",
      customer_name: "",
      phone: "",
      email: "",
      website: "",
      address: "",
      unit_no: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      lead_type: "",
      contact_person: "",
      notes: "",
      lead_status: "",
      follow_up_date: "",
      equipment_type: "",
      contacts: [],
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        {/* Lead Details */}
        <fieldset className="form-section">
          <legend>Lead Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadNo">Lead No*</label>
              <input
                type="text"
                value={lead.lead_no}
                onChange={(e) => setLead({ ...lead, lead_no: e.target.value })}
                id="leadNo"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadDate">Lead Date</label>
              <input
                type="date"
                value={lead.lead_date}
                onChange={(e) =>
                  setLead({ ...lead, lead_date: e.target.value })
                }
                id="leadDate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                value={lead.customer_name}
                onChange={(e) =>
                  setLead({ ...lead, customer_name: e.target.value })
                }
                id="customerName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                id="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                value={lead.website}
                onChange={(e) => setLead({ ...lead, website: e.target.value })}
                id="website"
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
                value={lead.address}
                onChange={(e) => setLead({ ...lead, address: e.target.value })}
                id="address"
                ref={addressRef}
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitNo">Unit No</label>
              <input
                type="text"
                value={lead.unit_no}
                onChange={(e) => setLead({ ...lead, unit_no: e.target.value })}
                id="unitNo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                value={lead.city}
                onChange={(e) => setLead({ ...lead, city: e.target.value })}
                id="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                value={lead.state}
                onChange={(e) => setLead({ ...lead, state: e.target.value })}
                id="state"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value={lead.country}
                onChange={(e) => setLead({ ...lead, country: e.target.value })}
                id="country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                value={lead.postal_code}
                onChange={(e) =>
                  setLead({ ...lead, postal_code: e.target.value })
                }
                id="postalCode"
              />
            </div>
          </div>
        </fieldset>
        {/* Lead Type */}
        <fieldset className="form-section">
          <legend>Lead Type</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadType">Lead Type</label>
              <select
                id="leadType"
                value={lead.lead_type}
                onChange={(e) =>
                  setLead({ ...lead, lead_type: e.target.value })
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
          </div>
        </fieldset>
        {/* Lead Status */}
        <fieldset className="form-section">
          <legend>Lead Status</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadStatus">Lead Status</label>
              <select
                id="leadStatus"
                value={lead.lead_status}
                onChange={(e) =>
                  setLead({ ...lead, lead_status: e.target.value })
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
        {/* Additional Fields */}
        <fieldset className="form-section">
          <legend>Additional Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                value={lead.contact_person}
                onChange={(e) =>
                  setLead({ ...lead, contact_person: e.target.value })
                }
                id="contactPerson"
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                value={lead.notes}
                onChange={(e) => setLead({ ...lead, notes: e.target.value })}
                id="notes"
              />
            </div>
            <div className="form-group">
              <label htmlFor="follow_up_date">Next Follow-Up Date</label>
              <input
                type="date"
                value={lead.follow_up_date}
                onChange={(e) =>
                  setLead({ ...lead, follow_up_date: e.target.value })
                }
                id="follow_up_date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="equipmentType">Equipment Type</label>
              <select
                id="equipmentType"
                value={lead.equipment_type}
                onChange={(e) =>
                  setLead({ ...lead, equipment_type: e.target.value })
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
          </div>
        </fieldset>
        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {lead.contacts.map((contact, index) => (
              <EditContactForm
                key={index}
                contact={contact}
                onChange={(updatedContact) => {
                  const updatedContacts = [...lead.contacts];
                  updatedContacts[index] = updatedContact;
                  setLead({ ...lead, contacts: updatedContacts });
                }}
                onRemove={() => {
                  const updatedContacts = lead.contacts.filter(
                    (_, i) => i !== index
                  );
                  setLead({ ...lead, contacts: updatedContacts });
                }}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setLead((prevLead) => ({
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
        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;

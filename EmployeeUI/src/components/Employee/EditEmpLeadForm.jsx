import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditEmpLeadForm = ({ lead, onClose, onUpdate }) => {
  const [formLead, setFormLead] = useState({
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
    equipment_type: "",
    lead_type: "",
    lead_status: "",
    follow_up_date: "",
    contacts: [{ name: "", phone: "", email: "" }],
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

  useEffect(() => {
    if (lead) {
      // Parse the contacts if it's a string
      const parsedContacts = Array.isArray(lead.contacts)
        ? lead.contacts 
        : JSON.parse(lead.contacts || '[]'); // Parse contacts string to an array
  
      setFormLead({
        ...lead,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
      });
    }
  }, [lead]);
  
  

  const addressRef = useRef(null);
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
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
      types: ["address"],
      componentRestrictions: { country: "us" }, // Adjust as needed
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address || "";

    setFormLead((prevLead) => ({
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

  
  const updateLead = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/lead/${formLead.id}`, formLead);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Lead data has been updated successfully.",
      });
      onUpdate(response.data); // Call the function passed from LeadTable
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating lead:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update lead.",
      });
    }
  };

  const handleAddContact = () => {
    setFormLead((prev) => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        { name: "", contact_no: "", email: "" },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setFormLead((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = formLead.contacts.map((contact, i) =>
      i === index ? { ...contact, [name]: value } : contact
    );
    setFormLead((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateLead();
        }}
        className="form-main"
      >
        <fieldset className="form-section">
          <legend>Lead Details</legend>
          <div className="form-group">
            <label htmlFor="leadNo">Lead No*</label>
            <input
              value={formLead.lead_no}
              onChange={(e) =>
                setFormLead({ ...formLead, lead_no: e.target.value })
              }
              id="leadNo"
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="leadDate">Lead Date</label>
            <input
              value={formLead.lead_date}
              onChange={(e) =>
                setFormLead({ ...formLead, lead_date: e.target.value })
              }
              id="leadDate"
              type="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              value={formLead.customer_name}
              onChange={(e) =>
                setFormLead({ ...formLead, customer_name: e.target.value })
              }
              id="customerName"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              value={formLead.phone}
              onChange={(e) =>
                setFormLead({ ...formLead, phone: e.target.value })
              }
              id="phone"
              type="tel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={formLead.email}
              onChange={(e) =>
                setFormLead({ ...formLead, email: e.target.value })
              }
              id="email"
              type="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              value={formLead.website}
              onChange={(e) =>
                setFormLead({ ...formLead, website: e.target.value })
              }
              id="website"
              type="text"
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Address Details</legend>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              ref={addressRef}
              value={formLead.address}
              onChange={(e) =>
                setFormLead({ ...formLead, address: e.target.value })
              }
              id="address"
              type="text"
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitNo">Unit No</label>
            <input
              value={formLead.unit_no}
              onChange={(e) =>
                setFormLead({ ...formLead, unit_no: e.target.value })
              }
              id="unitNo"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              value={formLead.city}
              onChange={(e) =>
                setFormLead({ ...formLead, city: e.target.value })
              }
              id="city"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              value={formLead.state}
              onChange={(e) =>
                setFormLead({ ...formLead, state: e.target.value })
              }
              id="state"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              value={formLead.country}
              onChange={(e) =>
                setFormLead({ ...formLead, country: e.target.value })
              }
              id="country"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              value={formLead.postal_code}
              onChange={(e) =>
                setFormLead({ ...formLead, postal_code: e.target.value })
              }
              id="postalCode"
              type="text"
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Equipment Details</legend>
          <div className="form-group">
            <label htmlFor="equipmentType">Equipment Type</label>
            <select
              id="equipmentType"
              value={formLead.equipment_type}
              onChange={(e) =>
                setFormLead({ ...formLead, equipment_type: e.target.value })
              }
            >
              {equipmentTypeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Lead Status</legend>
          <div className="form-group">
            <label htmlFor="leadType">Lead Type</label>
            <select
              id="leadType"
              value={formLead.lead_type}
              onChange={(e) =>
                setFormLead({ ...formLead, lead_type: e.target.value })
              }
            >
              {leadTypeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leadStatus">Lead Status</label>
            <select
              id="leadStatus"
              value={formLead.lead_status}
              onChange={(e) =>
                setFormLead({ ...formLead, lead_status: e.target.value })
              }
            >
              {leadStatusOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="followUpDate">Follow Up Date</label>
            <input
              value={formLead.follow_up_date}
              onChange={(e) =>
                setFormLead({ ...formLead, follow_up_date: e.target.value })
              }
              id="followUpDate"
              type="date"
            />
          </div>
        </fieldset>

        <fieldset>
        <legend>Contacts</legend>
        {formLead.contacts.length > 0 ? (
          formLead.contacts.map((contact, index) => (
            <div key={index} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={(e) => handleContactChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="contact_no"
                  value={contact.phone}
                  onChange={(e) => handleContactChange(index, e)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={contact.email}
                  onChange={(e) => handleContactChange(index, e)}
                />
              </div>
              <button type="button" onClick={() => handleRemoveContact(index)} className="remove">
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
        <button type="button" onClick={handleAddContact} className="add">
          Add Contact
        </button>
      </fieldset>



        <button type="submit" className="btn-submit">
          Update Lead
        </button>
      </form>
    </div>
  );
};

export default EditEmpLeadForm;

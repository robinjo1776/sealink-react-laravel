import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EditContactForm from "./EditContactForm";

const EditLeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addressRef = useRef(null);

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
    equipment_type: "",
    lead_type: "",
    lead_status: "",
    follow_up_date: "",
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

  useEffect(() => {
    fetchLead(id);
    loadGoogleMapsApi();
  }, [id]);

  const loadGoogleMapsApi = () => {
    if (window.google && window.google.maps) {
      initializeAutocomplete();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initializeAutocomplete";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressRef.current,
      { types: ["address"], componentRestrictions: { country: "us" } }
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

  const fetchLead = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/lead/${id}`);
      const data = response.data;

      let contacts = [];
      if (data.contacts) {
        try {
          contacts = JSON.parse(data.contacts);
        } catch (error) {
          console.error("Error parsing contacts:", error);
        }
      }

      setLead({
        ...lead,
        id: data.id || "",
        lead_no: data.lead_no || "",
        lead_date: data.lead_date || "",
        customer_name: data.customer_name || "",
        phone: data.phone || "",
        email: data.email || "",
        website: data.website || "",
        address: data.address || "",
        unit_no: data.unit_no || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country || "",
        postal_code: data.postal_code || "",
        equipment_type: data.equipment_type || "",
        lead_type: data.lead_type || "",
        lead_status: data.lead_status || "",
        follow_up_date: data.follow_up_date || "",
        contacts,
      });
    } catch (error) {
      console.error("Error fetching lead:", error);
    }
  };

  const updateLead = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/lead/${lead.id}`, lead);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Lead data has been updated successfully.",
      });
      navigate("/leads");
    } catch (error) {
      console.error("Error updating lead:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update lead.",
      });
    }
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = [...lead.contacts];
    updatedContacts[index] = updatedContact;
    setLead((prevLead) => ({ ...prevLead, contacts: updatedContacts }));
  };

  const handleAddContact = () => {
    setLead((prevLead) => ({
      ...prevLead,
      contacts: [...prevLead.contacts, { name: "", contact_no: "", email: "" }],
    }));
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = lead.contacts.filter((_, i) => i !== index);
    setLead((prevLead) => ({ ...prevLead, contacts: updatedContacts }));
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Edit Lead</h1>
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
              value={lead.lead_no}
              onChange={(e) => setLead({ ...lead, lead_no: e.target.value })}
              id="leadNo"
              type="text"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="leadDate">Lead Date</label>
            <input
              value={lead.lead_date}
              onChange={(e) => setLead({ ...lead, lead_date: e.target.value })}
              id="leadDate"
              type="date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              value={lead.customer_name}
              onChange={(e) => setLead({ ...lead, customer_name: e.target.value })}
              id="customerName"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              id="phone"
              type="tel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              id="email"
              type="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              value={lead.website}
              onChange={(e) => setLead({ ...lead, website: e.target.value })}
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
              value={lead.address}
              onChange={(e) => setLead({ ...lead, address: e.target.value })}
              id="address"
              type="text"
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitNo">Unit No</label>
            <input
              value={lead.unit_no}
              onChange={(e) => setLead({ ...lead, unit_no: e.target.value })}
              id="unitNo"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              value={lead.city}
              onChange={(e) => setLead({ ...lead, city: e.target.value })}
              id="city"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              value={lead.state}
              onChange={(e) => setLead({ ...lead, state: e.target.value })}
              id="state"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              value={lead.country}
              onChange={(e) => setLead({ ...lead, country: e.target.value })}
              id="country"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              value={lead.postal_code}
              onChange={(e) => setLead({ ...lead, postal_code: e.target.value })}
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
              value={lead.equipment_type}
              onChange={(e) => setLead({ ...lead, equipment_type: e.target.value })}
            >
              {equipmentTypeOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
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
              value={lead.lead_type}
              onChange={(e) => setLead({ ...lead, lead_type: e.target.value })}
            >
              {leadTypeOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="leadStatus">Lead Status</label>
            <select
              id="leadStatus"
              value={lead.lead_status}
              onChange={(e) => setLead({ ...lead, lead_status: e.target.value })}
            >
              {leadStatusOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="followUpDate">Follow Up Date</label>
            <input
              value={lead.follow_up_date}
              onChange={(e) => setLead({ ...lead, follow_up_date: e.target.value })}
              id="followUpDate"
              type="date"
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Contacts</legend>
          {lead.contacts.map((contact, index) => (
            <EditContactForm
              key={index}
              contact={contact}
              onContactChange={(updatedContact) => handleContactChange(index, updatedContact)}
              onRemoveContact={() => handleRemoveContact(index)}
            />
          ))}
          <button type="button" onClick={handleAddContact}>Add Contact</button>
        </fieldset>

        <button type="submit" className="form-submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditLeadForm;

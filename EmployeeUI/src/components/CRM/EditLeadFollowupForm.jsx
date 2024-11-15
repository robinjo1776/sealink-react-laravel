import React, { useState, useEffect, useRef, useContext } from "react"; // Add useContext here
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from '../../UserProvider'; // Adjust import as needed

const EditLeadForm = ({ lead, onClose, onUpdate }) => {
  const users = useContext(UserContext); // Accessing users from context

  const [formLead, setFormLead] = useState({
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
    next_follow_up_date: "",
    lead_status: "",
    products: "",
    contacts: [{ name: "", phone: "", email: "" }],
    remarks: "",
    equipment: "",
    notes: "",
  });


  const leadTypeOptions = ["Inquiry", "Quote", "Follow-up", "Closed"];
  const leadStatusOptions = ["New", "In Progress", "Completed", "On Hold"];
  const [employees, setEmployees] = useState([]); // State to hold employees

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Or wherever you're storing the token
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        const employees = response.data.filter(user => user.role === "employee");
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    

    fetchUsers();

    if (lead) {
      const parsedContacts = Array.isArray(lead.contacts) ? lead.contacts : (lead.contacts ? JSON.parse(lead.contacts) : []);
      setFormLead({
        ...lead,
        contacts: parsedContacts,
      });
    }
  }, [lead]);

  const updateLead = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/lead-followup/${formLead.id}`, formLead);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Follow-up data has been updated successfully.",
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating Follow-up:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update Follow-up.",
      });
    }
  };

  const handleAddContact = () => {
    setFormLead((prev) => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        { name: "", phone: "", email: "" },
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

  const addressRef = useRef(null);
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"; // Replace with your API key
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
        <legend>Lead Type and Status</legend>

          <div className="form-group">
            <label htmlFor="leadType">Lead Type</label>
            <select
              id="leadType"
              value={formLead.lead_type}
              onChange={(e) =>
                setFormLead({ ...formLead, lead_type: e.target.value })
              }
            >
              <option value="">Select Lead Type</option>
              {leadTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
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
              <option value="">Select Lead Status</option>
              {leadStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="form-section">
        <legend>Contact Person and Follow-Up</legend>
        <div className="form-group">
        <label htmlFor="nextFollowUpDate">Next Follow-Up Date</label>
        <input
              value={formLead.next_follow_up_date}
              onChange={(e) =>
                setFormLead({ ...formLead, next_follow_up_date: e.target.value })
              }
              id="nextFollowUpDate"
              type="date"
            />
          </div>
   
        </fieldset>
        <fieldset className="form-section">
          <legend>Products and Equipment</legend>
          <div className="form-group">
            <label htmlFor="products">Products</label>
            <input
              value={formLead.products}
              onChange={(e) => setFormLead({ ...formLead, products: e.target.value })}
              id="products"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="equipment">Equipment</label>
            <input
              value={formLead.equipment}
              onChange={(e) => setFormLead({ ...formLead, equipment: e.target.value })}
              id="equipment"
              type="text"
            />
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          {Array.isArray(formLead.contacts) && formLead.contacts.map((contact, index) => (
  <div key={index} className="contact-group">
    <input
      name="name"
      placeholder="Name"
      value={contact.name}
      onChange={(e) => handleContactChange(index, e)}
    />
    <input
      name="phone"
      placeholder="Phone"
      value={contact.phone}
      onChange={(e) => handleContactChange(index, e)}
    />
    <input
      name="email"
      placeholder="Email"
      value={contact.email}
      onChange={(e) => handleContactChange(index, e)}
    />
    <button type="button" onClick={() => handleRemoveContact(index)}>
      Remove
    </button>
  </div>
))}
          <button type="button" onClick={handleAddContact}>
            Add Contact
          </button>
        </fieldset>
        <fieldset className="form-section">
          <legend>Remarks and Notes</legend>
          <div className="form-group">
            <label htmlFor="remarks">Remarks</label>
            <textarea
              value={formLead.remarks}
              onChange={(e) => setFormLead({ ...formLead, remarks: e.target.value })}
              id="remarks"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              value={formLead.notes}
              onChange={(e) => setFormLead({ ...formLead, notes: e.target.value })}
              id="notes"
            />
          </div>
        </fieldset>
        <button type="submit" className="btn-submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditLeadForm;

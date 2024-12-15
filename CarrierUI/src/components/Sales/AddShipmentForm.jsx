import { useContext, useState } from "react";
import { UserContext } from "../../UserProvider";
import axios from "axios";
import Swal from "sweetalert2";
import LeadContactForm from "./LeadContactForm";
import "../../styles/Form.css";


const AddShipmentForm = ({ onClose, onAddLead }) => {
  const { currentUser } = useContext(UserContext);
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

  const handleContactChange = (index, updatedContact) => {
    // When a contact changes, update the specific contact in the contacts array
    const updatedContacts = [...lead.contacts];
    updatedContacts[index] = updatedContact;
    setLead({ ...lead, contacts: updatedContacts }); // Set the updated contacts back into the state
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = lead.contacts.filter((_, i) => i !== index);
    setLead({ ...lead, contacts: updatedContacts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateLead()) {
      try {
        let response;
        const token = localStorage.getItem("token");

        if (!token) {
          Swal.fire("Error", "No token found", "error");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        if (lead.id) {
          response = await axios.put(
            `http://127.0.0.1:8000/api/lead/${lead.id}`,
            lead,
            { headers }
          );
          Swal.fire(
            "Updated!",
            "Lead data has been updated successfully.",
            "success"
          );
        } else {
          response = await axios.post("http://127.0.0.1:8000/api/lead", lead, {
            headers,
          });
          Swal.fire(
            "Saved!",
            "Lead data has been saved successfully.",
            "success"
          );
        }

        onAddLead(response.data);
        clearLeadForm();
        onClose();
      } catch (error) {
        console.error(
          "Error saving/updating lead:",
          error.response ? error.response.data : error.message
        );
        Swal.fire(
          "Error",
          "An error occurred while saving/updating the lead.",
          "error"
        );
      }
    } else {
      Swal.fire(
        "Validation Error",
        "Please fill in all required fields.",
        "error"
      );
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
      
        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShipmentForm;

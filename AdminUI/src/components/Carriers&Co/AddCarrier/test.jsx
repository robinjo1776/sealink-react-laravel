import { useContext, useState } from "react";
import { UserContext } from "../../../UserProvider";
import axios from "axios";
import Swal from "sweetalert2";
import "../../../styles/Form.css";
import General from "./General";
import CarrierDetails from "./CarrierDetails";
import LiabilityInsurance from "./LiabilityInsurance";
import CargoInsurance from "./CargoInsurance";
import PrimaryAddress from "./PrimaryAddress";
import MailingAddress from "./MailingAddress";
import CarrierContact from "../CarrierContact";
import CarrierEquipment from "../CarrierEquipment";
import CarrierLane from "../CarrierLane";

const AddCarrierForm = ({ onClose, onAddCarrier }) => {
  const { currentUser } = useContext(UserContext);
  const [carrier, setCarrier] = useState({
    id: "",
    dba: "",
    legal_name: "",
    remit_name: "",
    acc_no: "",
    branch: "",
    website: "",
    fed_id_no: "",
    pref_curr: "",
    pay_terms: "",
    form_1099: false,
    advertise: false,
    advertise_email: "",
    carr_type: "",
    rating: "",
    brok_carr_aggmt: null,
    docket_no: "",
    dot_number: "",
    wcb_no: "",
    ca_bond_no: "",
    us_bond_no: "",
    scac: "",
    csa_approved: false,
    hazmat: false,
    smsc_code: "",
    approved: false,
    li_provider: "",
    li_policy_no: "",
    li_coverage: "",
    li_start_date: "",
    li_end_date: "",
    ci_provider: "",
    ci_policy_no: "",
    ci_coverage: "",
    ci_start_date: "",
    ci_end_date: "",
    coi_cert: null,
    primary_address: "",
    primary_city: "",
    primary_state: "",
    primary_country: "",
    primary_postal: "",
    primary_phone: "",
    mailing_address: "",
    mailing_city: "",
    mailing_state: "",
    mailing_country: "",
    mailing_postal: "",
    mailing_phone: "",
    int_notes: "",
    contact: [],
    equipment: [],
    lane: [],
  });

  // Handle changes in contacts, equipment, or lanes
  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = [...carrier.contact];
    updatedContacts[index] = updatedContact;
    setCarrier({ ...carrier, contact: updatedContacts });
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = carrier.contact.filter((_, i) => i !== index);
    setCarrier({ ...carrier, contact: updatedContacts });
  };

  const handleEquipmentChange = (index, updatedEquipment) => {
    const updatedEquipments = [...carrier.equipment];
    updatedEquipments[index] = updatedEquipment;
    setCarrier({ ...carrier, equipment: updatedEquipments });
  };

  const handleRemoveEquipment = (index) => {
    const updatedEquipments = carrier.equipment.filter((_, i) => i !== index);
    setCarrier({ ...carrier, equipment: updatedEquipments });
  };

  const handleLaneChange = (index, updatedLane) => {
    const updatedLanes = [...carrier.lane];
    updatedLanes[index] = updatedLane;
    setCarrier({ ...carrier, lane: updatedLanes });
  };

  const handleRemoveLane = (index) => {
    const updatedLanes = carrier.lane.filter((_, i) => i !== index);
    setCarrier({ ...carrier, lane: updatedLanes });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("dba", carrier.dba);
    form.append("legal_name", carrier.legal_name);
    form.append("primary_phone", carrier.primary_phone);
    form.append("advertise", carrier.advertise);

    // Handle COI cert URL
    if (carrier.coi_cert && !isValidUrl(carrier.coi_cert)) {
      alert("Invalid COI cert URL.");
      return;
    }
    if (carrier.brok_carr_aggmt && !isValidUrl(carrier.brok_carr_aggmt)) {
      alert("Invalid Broker Carrier Agreement URL.");
      return;
    }

    if (carrier.coi_cert) form.append("coi_cert", carrier.coi_cert);
    if (carrier.brok_carr_aggmt) form.append("brok_carr_aggmt", carrier.brok_carr_aggmt);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      // Safely retrieve CSRF token
      const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
      const csrfToken = csrfTokenElement
        ? csrfTokenElement.getAttribute("content")
        : null;

      if (!csrfToken) {
        alert("CSRF token is missing. Please refresh the page or contact support.");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/carrier", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken, // Include CSRF token
        },
        body: form,
      });

      // Handle response
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText); // Log detailed error
        if (response.status === 302) {
          alert("Session expired or not authenticated.");
          return;
        }
        throw new Error(`Failed to save carrier: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      alert("Carrier created successfully!");
      onAddCarrier(data); // Notify parent component about the new carrier
      onClose(); // Close the form
    } catch (error) {
      console.error("Error saving carrier:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateCarrier = () => {
    return carrier.dba && carrier.legal_name; // Ensure essential fields are filled out
  };

  const clearCarrierForm = () => {
    setCarrier({
      id: "",
      dba: "",
      legal_name: "",
      remit_name: "",
      acc_no: "",
      branch: "",
      website: "",
      fed_id_no: "",
      pref_curr: "",
      pay_terms: "",
      form_1099: false,
      advertise: false,
      advertise_email: "",
      carr_type: "",
      rating: "",
      brok_carr_aggmt: "",
      docket_no: "",
      dot_number: "",
      wcb_no: "",
      ca_bond_no: "",
      us_bond_no: "",
      scac: "",
      csa_approved: false,
      hazmat: false,
      smsc_code: "",
      approved: false,
      li_provider: "",
      li_policy_no: "",
      li_coverage: "",
      li_start_date: "",
      li_end_date: "",
      ci_provider: "",
      ci_policy_no: "",
      ci_coverage: "",
      ci_start_date: "",
      ci_end_date: "",
      coi_cert: "",
      primary_address: "",
      primary_city: "",
      primary_state: "",
      primary_country: "",
      primary_postal: "",
      primary_phone: "",
      mailing_address: "",
      mailing_city: "",
      mailing_state: "",
      mailing_country: "",
      mailing_postal: "",
      mailing_phone: "",
      int_notes: "",
      contact: [],
      equipment: [],
      lane: [],
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        {/* Other fieldset components */}
        <General carrier={carrier} setCarrier={setCarrier} />
        <CarrierDetails carrier={carrier} setCarrier={setCarrier} />
        <LiabilityInsurance carrier={carrier} setCarrier={setCarrier} />
        <CargoInsurance carrier={carrier} setCarrier={setCarrier} />
        <PrimaryAddress carrier={carrier} setCarrier={setCarrier} />
        <MailingAddress carrier={carrier} setCarrier={setCarrier} />
        {/* Contact Section */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {carrier.contact.map((contact, index) => (
              <CarrierContact
                key={index}
                contact={contact}
                index={index}
                onChange={handleContactChange}
                onRemove={handleRemoveContact}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setCarrier((prevCarrier) => ({
                  ...prevCarrier,
                  contact: [
                    ...prevCarrier.contact,
                    { name: "", phone: "", email: "", fax: "", designation: "" },
                  ],
                }))
              }
              className="add"
            >
              Add Contact
            </button>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Equipment</legend>
          <div className="form-row">
            {carrier.equipment.map((equipment, index) => (
              <CarrierEquipment
                key={index}
                equipment={equipment}
                index={index}
                onChange={handleEquipmentChange}
                onRemove={handleRemoveEquipment}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setCarrier((prevCarrier) => ({
                  ...prevCarrier,
                  equipment: [
                    ...prevCarrier.equipment,
                    { equipment_type: "", quantity: "", details: "" },
                  ],
                }))}
              className="add"
            >
              Add Equipment
            </button>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>Lanes</legend>
          <div className="form-row">
            {carrier.lane.map((lane, index) => (
              <CarrierLane
                key={index}
                lane={lane}
                index={index}
                onChange={handleLaneChange}
                onRemove={handleRemoveLane}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setCarrier((prevCarrier) => ({
                  ...prevCarrier,
                  lane: [
                    ...prevCarrier.lane,
                    { origin: "", destination: "", lane_type: "" },
                  ],
                }))}
              className="add"
            >
              Add Lane
            </button>
          </div>
        </fieldset>

        <div className="form-buttons">
          <button type="submit" className="submit-button" disabled={!validateCarrier()}>
            Submit Carrier
          </button>
          <button type="button" onClick={clearCarrierForm} className="cancel-button">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarrierForm;

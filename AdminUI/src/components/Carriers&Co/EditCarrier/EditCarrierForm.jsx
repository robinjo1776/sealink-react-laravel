import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../../UserProvider";
import EditGeneral from "./EditGeneral";
import EditCarrierDetails from "./EditCarrierDetails";
import EditLiabilityInsurance from "./EditLiabilityInsurance";
import EditCargoInsurance from "./EditCargoInsurance";
import EditPrimaryAddress from "./EditPrimaryAddress";
import EditMailingAddress from "./EditMailingAddress";
import CarrierContact from "../CarrierContact";
import CarrierEquipment from "../CarrierEquipment";
import CarrierLane from "../CarrierLane";

function EditCarrierForm({ carrier, onClose, onUpdate }) {
  const users = useContext(UserContext);
  const [formCarrier, setformCarrier] = useState({
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
    contact: [{ name: "", phone: "", email: "", fax: "", designation: "" }],
    equipment: [{ equipment: "" }],
    lane: [{ from: "", to: "" }],
  });

  useEffect(() => {
    if (carrier) {
      const parsedContacts = Array.isArray(carrier.contact)
        ? carrier.contact
        : JSON.parse(carrier.contact || "[]");
      const parsedEquipment = Array.isArray(carrier.equipment)
        ? carrier.equipment
        : JSON.parse(carrier.equipment || "[]");
      const parsedLane = Array.isArray(carrier.lane)
        ? carrier.lane
        : JSON.parse(carrier.lane || "[]");
      setformCarrier({
        ...carrier,
        contact: parsedContacts.length > 0 ? parsedContacts : [],
        equipment: parsedEquipment.length > 0 ? parsedEquipment : [],
        lane: parsedLane.length > 0 ? parsedLane : [],
      });
    }
  }, [carrier]);

  const validateCarrier = () => {
    return formCarrier.dba;
  };

  const updateCarrier = async () => {
    if (validateCarrier()) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
        });
        return;
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/carrier/${formCarrier.id}`,
        formCarrier,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Carrier data has been updated successfully.",
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating carrier:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response && error.response.status === 401
            ? "Unauthorized. Please log in again."
            : "Failed to update carrier.",
      });
    }
  };
  }
  
  const handleAddContact = () => {
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      contact: [
        ...(prevCarrier.contact || []),
        { name: "", phone: "", email: "", fax: "", designation: "" },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      contact: (prevCarrier.contact || []).filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = (formCarrier.contact || []).map((contact, i) =>
      i === index ? updatedContact : contact
    );
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      contact: updatedContacts,
    }));
  };

  const handleAddEquipment = () => {
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      equipment: [...prevCarrier.equipment, { equipment: "" }],
    }));
  };

  const handleRemoveEquipment = (index) => {
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      equipment: prevCarrier.equipment.filter((_, i) => i !== index),
    }));
  };

  const handleEquipmentChange = (index, updatedEquipment) => {
    const updatedEquipments = formCarrier.equipment.map((equipment, i) =>
      i === index ? updatedEquipment : equipment
    );
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      equipment: updatedEquipments,
    }));
  };

  const handleAddLane = () => {
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      lane: [...(prevCarrier.lane || []), { from: "", to: "" }],
    }));
  };

  const handleRemoveLane = (index) => {
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      lane: (prevCarrier.lane || []).filter((_, i) => i !== index),
    }));
  };

  const handleLaneChange = (index, updatedLane) => {
    const updatedLanes = (formCarrier.lane || []).map((lane, i) =>
      i === index ? updatedLane : lane
    );
    setformCarrier((prevCarrier) => ({
      ...prevCarrier,
      lane: updatedLanes,
    }));
  };
  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCarrier();
        }}
        className="form-main"
      >
        <EditGeneral
          formCarrier={formCarrier}
          setformCarrier={setformCarrier}
        />
        <EditCarrierDetails
          formCarrier={formCarrier}
          setformCarrier={setformCarrier}
        />
        <EditLiabilityInsurance
          formCarrier={formCarrier}
          setformCarrier={setformCarrier}
        />
        <EditCargoInsurance
          formCarrier={formCarrier}
          setformCarrier={setformCarrier}
        />
        <EditPrimaryAddress
          formCarrier={formCarrier}
          setformCarrier={setformCarrier}
        />
        <EditMailingAddress
          formCarrier={formCarrier}
          setformCarrier={setformCarrier}
        />
        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {Array.isArray(formCarrier.contact) &&
            formCarrier.contact.length > 0 ? (
              formCarrier.contact.map((contact, index) => (
                <CarrierContact
                  key={index}
                  contact={contact}
                  index={index}
                  onChange={handleContactChange}
                  onRemove={handleRemoveContact}
                />
              ))
            ) : (
              <p>No contacts available</p>
            )}
            <button type="button" onClick={handleAddContact} className="add">
              Add Contact
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Equipments</legend>
          <div className="form-row">
            {Array.isArray(formCarrier.equipment) &&
            formCarrier.equipment.length > 0 ? (
              formCarrier.equipment.map((equipment, index) => (
                <CarrierEquipment
                  key={index}
                  equipment={equipment}
                  index={index}
                  onChange={handleEquipmentChange}
                  onRemove={handleRemoveEquipment}
                />
              ))
            ) : (
              <p>No equipment available</p>
            )}
            <button type="button" onClick={handleAddEquipment} className="add">
              Add Equipment
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Lane</legend>
          <div className="form-row">
            {Array.isArray(formCarrier.lane) && formCarrier.lane.length > 0 ? (
              formCarrier.lane.map((lane, index) => (
                <CarrierLane
                  key={index}
                  lane={lane}
                  index={index}
                  onChange={handleLaneChange}
                  onRemove={handleRemoveLane}
                />
              ))
            ) : (
              <p>No lanes available</p>
            )}
            <button type="button" onClick={handleAddLane} className="add">
              Add Lane
            </button>
          </div>
        </fieldset>

        <button type="submit" className="btn-submit">
          Update Carrier
        </button>
      </form>
    </div>
  );
}

export default EditCarrierForm;

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../../UserProvider";
import CustomerInfo from "./CustomerInfo";
import PrimaryAddress from "./PrimaryAddress";
import MailingAddress from "./MailingAddress";
import AccountsPayable from "./AccountsPayable";
import CustomBroker from "./CustomBroker";
import CustomerCredit from "./CustomerCredit";
import CustomerContact from "./CustomerContact";
import CustomerEquipment from "./CustomerEquipment";

function EditCustomerForm({ customer, onClose, onUpdate }) {
  const users = useContext(UserContext);
  const [formCustomer, setformCustomer] = useState({
    id: "",
    cust_type: "",
    cust_name: "",
    cust_ref_no: "",
    cust_website: "",
    cust_email: "",
    cust_contact_no: "",
    cust_contact_no_ext: "",
    cust_tax_id: "",
    cust_primary_address: "",
    cust_primary_city: "",
    cust_primary_state: "",
    cust_primary_country: "",
    cust_primary_postal: "",
    cust_primary_unit_no: "",
    sameAsPrimary: false,
    cust_mailing_address: "",
    cust_mailing_city: "",
    cust_mailing_state: "",
    cust_mailing_country: "",
    cust_mailing_postal: "",
    cust_mailing_unit_no: "",
    cust_ap_name: "",
    cust_ap_address: "",
    cust_ap_city: "",
    cust_ap_state: "",
    cust_ap_country: "",
    cust_ap_postal: "",
    cust_ap_unit_no: "",
    cust_ap_email: "",
    cust_ap_phone: "",
    cust_ap_phone_ext: "",
    cust_ap_fax: "",
    cust_broker_name: "",
    cust_bkp_notes: "",
    cust_bkspl_notes: "",
    cust_credit_status: "",
    cust_credit_mop: "",
    cust_credit_appd: "",
    cust_credit_expd: "",
    cust_credit_terms: "",
    cust_credit_limit: "",
    cust_credit_notes: "",
    cust_credit_application: false,
    cust_credit_currency: "",
    cust_sbk_agreement: "",
    cust_credit_agreement: "",
    cust_contact: [
      { name: "", phone: "", ext: "", email: "", fax: "", designation: "" },
    ],
    cust_equipment: [{ equipment: "" }],
  });

  useEffect(() => {
    if (customer) {
      const parsedContacts = Array.isArray(customer.cust_contact)
        ? customer.cust_contact
        : JSON.parse(customer.cust_contact || "[]");
      const parsedEquipment = Array.isArray(customer.cust_equipment)
        ? customer.cust_equipment
        : JSON.parse(customer.cust_equipment || "[]");
      setformCustomer({
        ...customer,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
        cust_equipment: parsedEquipment.length > 0 ? parsedEquipment : [],
      });
    }
  }, [customer]);

  const updateCustomer = async () => {
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
        `http://127.0.0.1:8000/api/customer/${formCustomer.id}`,
        formCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Customer data has been updated successfully.",
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response && error.response.status === 401
            ? "Unauthorized. Please log in again."
            : "Failed to update customer.",
      });
    }
  };

  const handleAddContact = () => {
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_contact: [
        ...(prevCustomer.cust_contact || []),
        { name: "", phone: "", ext: "", email: "", fax: "", designation: "" },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_contact: (prevCustomer.cust_contact || []).filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = (formCustomer.cust_contact || []).map(
      (contact, i) => (i === index ? updatedContact : contact)
    );
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_contact: updatedContacts,
    }));
  };

  const handleAddEquipment = () => {
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_equipment: [...prevCustomer.cust_equipment, { equipment: "" }],
    }));
  };

  const handleRemoveEquipment = (index) => {
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_equipment: prevCustomer.cust_equipment.filter((_, i) => i !== index),
    }));
  };

  const handleEquipmentChange = (index, updatedEquipment) => {
    const updatedEquipments = formCustomer.cust_equipment.map((equipment, i) =>
      i === index ? updatedEquipment : equipment
    );
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_equipment: updatedEquipments,
    }));
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCustomer();
        }}
        className="form-main"
      >
        <CustomerInfo
          formCustomer={formCustomer}
          setformCustomer={setformCustomer}
        />
        <PrimaryAddress
          formCustomer={formCustomer}
          setformCustomer={setformCustomer}
        />
        <MailingAddress
          formCustomer={formCustomer}
          setformCustomer={setformCustomer}
        />
        <AccountsPayable
          formCustomer={formCustomer}
          setformCustomer={setformCustomer}
        />
        <CustomBroker
          formCustomer={formCustomer}
          setformCustomer={setformCustomer}
        />
        <CustomerCredit
          formCustomer={formCustomer}
          setformCustomer={setformCustomer}
        />
        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {Array.isArray(formCustomer.cust_contact) &&
            formCustomer.cust_contact.length > 0 ? (
              formCustomer.cust_contact.map((contact, index) => (
                <CustomerContact
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
            {Array.isArray(formCustomer.cust_equipment) &&
            formCustomer.cust_equipment.length > 0 ? (
              formCustomer.cust_equipment.map((equipment, index) => (
                <CustomerEquipment
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
        <button type="submit" className="btn-submit">
          Update Customer
        </button>
      </form>
    </div>
  );
}

export default EditCustomerForm;

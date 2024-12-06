import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CustomerContactForm from "./Contact";
import { UserContext } from "../../UserProvider"; 

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
    cust_credit_currency: "",
    cust_credit_application: "",
    cust_credit_agreement: "",
    cust_sbk_agreement: "",
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
        // If no token is found, show an alert and exit the function
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
        });
        return;
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/customer/${formCustomer.id}`,
        customer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Customer data has been updated successfully.",
      });
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      // Handle different errors, including the 401 Unauthorized
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
        ...prevCustomer.cust_contact,
        { name: "", phone: "", ext: "", email: "", fax: "", designation: "" },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_contact: prevCustomer.cust_contact.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = formCustomer.cust_contact.map((contact, i) =>
      i === index ? updatedContact : contact
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

  const customerTypeOptions = [
    "Manufacturer",
    "Trader",
    "Distributor",
    "Retailer",
    "Freight Forwarder",
  ];
  const creditStatusOptions = ["Approved", "Not Approved"];
  const modeOfPaymentOptions = ["Direct Deposit", "Wire Transfer", "Visa"];
  const customBrokerOptions = ["Broker 1", "Broker 2", "Broker 3"];
  const currencyOptions = ["USD", "CAD"];


  const addressRef = useRef(null);
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"; // Replace with your API key
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

    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
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
          updateCustomer();
        }}
        className="form-main"
      >
        <fieldset>
          <legend>Customer Information</legend>

          <div className="form-group">
            <label htmlFor="customerType">Customer Type</label>
            <select
              value={formCustomer.cust_type}
              onChange={(e) =>
                setformCustomer({ ...formCustomer, cust_type: e.target.value })
              }
            >
              {customerTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="customerName">Customer Name*</label>
            <input
              type="text"
              value={formCustomer.cust_name}
              onChange={(e) =>
                setformCustomer({ ...formCustomer, cust_name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerRefNo">Customer Ref No.</label>
            <input
              type="text"
              value={formCustomer.cust_ref_no}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ref_no: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              value={formCustomer.cust_website}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_website: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={formCustomer.cust_email}
              onChange={(e) =>
                setformCustomer({ ...formCustomer, cust_email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNo">Contact No</label>
            <input
              type="text"
              value={formCustomer.cust_contact_no}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_contact_no: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactNoExt">Contact No Ext</label>
            <input
              type="text"
              value={formCustomer.cust_contact_no_ext}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_contact_no: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="taxId">Tax ID</label>
            <input
              type="text"
              value={formCustomer.cust_tax_id}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_contact_no: e.target.value,
                })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Primary Address</legend>

          <div className="form-group">
            <label htmlFor="primaryAddressStreet">Street</label>
            <input
              type="text"
              ref={addressRef}
              value={formCustomer.cust_primary_address}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_primary_address: e.target.value,
                })
              }
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressCity">City</label>
            <input
              type="text"
              value={formCustomer.cust_primary_city}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_primary_city: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressState">State</label>
            <input
              type="text"
              value={formCustomer.cust_primary_state}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_primary_state: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressCountry">Country</label>
            <input
              type="text"
              value={formCustomer.cust_primary_country}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_primary_country: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressPostalCode">Postal Code</label>
            <input
              type="text"
              value={formCustomer.cust_primary_postal}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_primary_postal: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressUnitNo">Unit No</label>
            <input
              type="text"
              value={formCustomer.cust_primary_unit_no}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_primary_unit_no: e.target.value,
                })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Mailing Address</legend>

          <div className="form-group">
            <label htmlFor="mailingAddressSame">
              <input
                type="checkbox"
                checked={formCustomer.sameAsPrimary || false}
                onChange={(e) =>
                  setformCustomer({
                    ...formCustomer,
                    cust_contact_no: e.target.value,
                  })
                }
              />
              Same as Primary Address
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressStreet">Street</label>
            <input
              type="text"
              ref={addressRef}
              value={formCustomer.cust_mailing_address}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_mailing_address: e.target.value,
                })
              }
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressCity">City</label>
            <input
              type="text"
              value={formCustomer.cust_mailing_city}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_mailing_city: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressState">State</label>
            <input
              type="text"
              value={formCustomer.cust_mailing_state}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_mailing_state: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressCountry">Country</label>
            <input
              type="text"
              value={formCustomer.cust_mailing_country}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_mailing_country: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressPostalCode">Postal Code</label>
            <input
              type="text"
              value={formCustomer.cust_mailing_postal}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_mailing_postal: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressUnitNo">Unit No</label>
            <input
              type="text"
              value={formCustomer.cust_mailing_unit_no}
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_mailing_unit_no: e.target.value,
                })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Accounts Payable</legend>

          <div className="form-group">
            <label htmlFor="accountsPayableName">Name</label>
            <input
              type="text"
              id="accountsPayableName"
              value={formCustomer.cust_ap_name} // Use fallback if name is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_name: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              ref={addressRef}
              value={formCustomer.cust_ap_address} // Use fallback if street is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_address: e.target.value,
                })
              }
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={formCustomer.cust_ap_city} // Use fallback if city is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_city: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={formCustomer.cust_ap_state} // Use fallback if state is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_state: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={formCustomer.cust_ap_country} // Use fallback if country is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_country: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              value={formCustomer.cust_ap_postal} // Use fallback if postalCode is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_postal: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitNo">Unit No</label>
            <input
              type="text"
              id="unitNo"
              value={formCustomer.cust_ap_unit_no} // Use fallback if unitNo is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_unit_no: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formCustomer.cust_ap_email} // Use fallback if email is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_email: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={formCustomer.cust_ap_phone} // Use fallback if phone is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_phone: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneExt">Phone Ext</label>
            <input
              type="text"
              id="phoneExt"
              value={formCustomer.cust_ap_phone_ext} // Use fallback if phoneExt is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_phone_ext: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="fax">Fax</label>
            <input
              type="text"
              id="fax"
              value={formCustomer.cust_ap_fax} // Use fallback if fax is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_ap_fax: e.target.value,
                })
              }
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Custom Broker</legend>

          <div className="form-group">
            <label htmlFor="broker">Broker</label>
            <select
              id="broker"
              value={formCustomer.cust_broker_name} // Use fallback to empty string if broker is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_broker_name: e.target.value,
                })
              }
            >
              <option value="">Select...</option>
              <option value="broker1">Broker 1</option>
              <option value="broker2">Broker 2</option>
              <option value="broker3">Broker 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="paymentNotes">Payment Notes</label>
            <input
              type="text"
              id="paymentNotes"
              value={formCustomer.cust_bkp_notes} // Fallback to empty string if paymentNotes is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_bkp_notes: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialNotes">
              Special Notes for Confirmation Doc
            </label>
            <textarea
              id="specialNotes"
              value={formCustomer.cust_bkspl_notes} // Fallback to empty string if specialNotes is undefined
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_bkspl_notes: e.target.value,
                })
              }
              rows="4"
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Customer Credit</legend>

          <div className="form-group">
            <label htmlFor="creditStatus">Credit Status</label>
            <select
              name="creditStatus"
              value={formCustomer.cust_credit_status} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_status: e.target.value,
                })
              }
            >
              <option value="">Select..</option>
              {creditStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="modeOfPayment">Mode of Payment</label>
            <select
              name="modeOfPayment"
              value={formCustomer.cust_credit_mop} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_mop: e.target.value,
                })
              }
            >
              <option value="">Select..</option>
              {modeOfPaymentOptions.map((payment) => (
                <option key={payment} value={payment}>
                  {payment}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              name="currency"
              value={formCustomer.cust_credit_currency} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_currency: e.target.value,
                })
              }
            >
              <option value="">Select..</option>
              {currencyOptions.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="approvalDate">Approval Date</label>
            <input
              type="date"
              name="approvalDate"
              value={formCustomer.cust_credit_appd} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_appd: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formCustomer.cust_credit_expd} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_expd: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="terms">Terms (Days)</label>
            <input
              type="number"
              name="terms"
              value={formCustomer.cust_credit_terms} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_terms: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="limit">Limit</label>
            <input
              type="number"
              name="limit"
              value={formCustomer.cust_credit_limit} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_limit: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              value={formCustomer.cust_credit_notes} // Fallback
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_notes: e.target.value,
                })
              }
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="creditApplication"
                checked={formCustomer.creditApplication || false} // Fallback to false
                onChange={(e) =>
                  setformCustomer({
                    ...formCustomer,
                    cust_contact_no: e.target.value,
                  })
                }
              />
              Credit Application
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="creditAgreement">Credit Agreement</label>
            <input
              type="file"
              name="creditAgreement"
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_credit_agreement: e.target.value,
                })
              }
            />
            <span>
              {formCustomer.cust_credit_agreement
                ? formCustomer.cust_credit_agreement.name
                : "No file chosen"}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="shipperBrokerAgreement">
              Shipper Broker Agreement
            </label>
            <input
              type="file"
              name="shipperBrokerAgreement"
              onChange={(e) =>
                setformCustomer({
                  ...formCustomer,
                  cust_sbk_agreement: e.target.value,
                })
              }
            />
            <span>
              {formCustomer.cust_sbk_agreement
                ? formCustomer.cust_sbk_agreement.name
                : "No file chosen"}
            </span>
          </div>
        </fieldset>
        {/* Contacts */}
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {Array.isArray(formCustomer.cust_contact) &&
            formCustomer.cust_contact.length > 0 ? (
              formCustomer.cust_contact.map((contact, index) => (
                <CustomerContactForm
                  key={index}
                  contact={contact}
                  index={index} // Pass index for identification
                  onChange={handleContactChange} // Update function
                  onRemove={handleRemoveContact} // Remove function
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
            {formCustomer.cust_equipment.map((equipment, index) => (
              <CustomerContactForm
                key={index}
                equipment={equipment}
                index={index} // Pass index for identification
                onChange={handleEquipmentChange} // Update function
                onRemove={handleRemoveEquipment} // Remove function
              />
            ))}
            <button type="button" onClick={handleAddEquipment} className="add">
              Add Contact
            </button>
          </div>
        </fieldset>
        <button type="submit" className="btn-submit">Update Customer</button>
      </form>
    </div>
  );
}

export default EditCustomerForm;

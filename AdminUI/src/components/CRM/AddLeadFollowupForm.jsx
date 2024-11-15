import { useState, useEffect, useRef } from "react";
import {
  handleSubmit,
  loadGoogleMapsApi,
  handleProductChange,
  addProduct,
  removeProduct,
  handleContactChange,
  addContact,
  removeContact,
} from "./AddLeadFollowupFunctions"; // Adjust the path as necessary

const AddLeadFollowupForm = () => {
  const [followupData, setFollowupData] = useState({
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

  const addressRef = useRef(null);

  const leadStatusOptions = [
    { value: "", label: "Select Status" },
    { value: "new", label: "New" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "on_hold", label: "On Hold" },
    { value: "lost", label: "Lost" },
  ];

  const equipmentOptions = [
    { value: "", label: "Select Equipment" },
    { value: "equipment1", label: "Equipment 1" },
    { value: "equipment2", label: "Equipment 2" },
    { value: "equipment3", label: "Equipment 3" },
  ];

  useEffect(() => {
    loadGoogleMapsApi(addressRef, setFollowupData);
  }, []);

  const onSubmit = (e) => {
    handleSubmit(e, followupData, setFollowupData);
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="form-main">
        <fieldset className="form-section">
          <legend>Lead Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadNo">Lead No*</label>
              <input
                type="text"
                value={followupData.lead_no}
                onChange={(e) =>
                  setFollowupData({ ...followupData, lead_no: e.target.value })
                }
                id="leadNo"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadDate">Lead Date</label>
              <input
                type="date"
                value={followupData.lead_date}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    lead_date: e.target.value,
                  })
                }
                id="leadDate"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                value={followupData.customer_name}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    customer_name: e.target.value,
                  })
                }
                id="customerName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                value={followupData.phone}
                onChange={(e) =>
                  setFollowupData({ ...followupData, phone: e.target.value })
                }
                id="phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={followupData.email}
                onChange={(e) =>
                  setFollowupData({ ...followupData, email: e.target.value })
                }
                id="email"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Address Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                value={followupData.address}
                onChange={(e) =>
                  setFollowupData({ ...followupData, address: e.target.value })
                }
                id="address"
                ref={addressRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                value={followupData.city}
                onChange={(e) =>
                  setFollowupData({ ...followupData, city: e.target.value })
                }
                id="city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                value={followupData.state}
                onChange={(e) =>
                  setFollowupData({ ...followupData, state: e.target.value })
                }
                id="state"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                value={followupData.country}
                onChange={(e) =>
                  setFollowupData({ ...followupData, country: e.target.value })
                }
                id="country"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                value={followupData.postal_code}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    postal_code: e.target.value,
                  })
                }
                id="postalCode"
              />
            </div>
            <div className="form-group">
              <label htmlFor="unitNo">Unit No</label>
              <input
                type="text"
                value={followupData.unit_no}
                onChange={(e) =>
                  setFollowupData({ ...followupData, unit_no: e.target.value })
                }
                id="unitNo"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Lead Type and Contact</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leadType">Lead Type</label>
              <input
                type="text"
                value={followupData.lead_type}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    lead_type: e.target.value,
                  })
                }
                id="leadType"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                value={followupData.contact_person}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    contact_person: e.target.value,
                  })
                }
                id="contactPerson"
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Follow Up Details</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nextFollowUpDate">Next Follow-Up Date</label>
              <input
                type="date"
                value={followupData.next_follow_up_date}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    next_follow_up_date: e.target.value,
                  })
                }
                id="nextFollowUpDate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="leadStatus">Lead Status*</label>
              <select
                value={followupData.lead_status}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    lead_status: e.target.value,
                  })
                }
                id="leadStatus"
                required
              >
                <option value="">Select Lead Status</option>
                {leadStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Products</legend>
          {followupData.products.map((product, index) => (
            <div key={index} className="product-item">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(
                    index,
                    "name",
                    e.target.value,
                    followupData,
                    setFollowupData
                  )
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(
                    index,
                    "quantity",
                    e.target.value,
                    followupData,
                    setFollowupData
                  )
                }
              />
              <button
                type="button"
                onClick={() =>
                  removeProduct(index, followupData, setFollowupData)
                }
                className="remove"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addProduct(setFollowupData, followupData)}
            className="add"
          >
            Add Product
          </button>
        </fieldset>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          {followupData.contacts.map((contact, index) => (
            <div key={index} className="contact-item">
              <input
                type="text"
                placeholder="Contact Name"
                value={contact.name}
                onChange={(e) =>
                  handleContactChange(
                    index,
                    "name",
                    e.target.value,
                    followupData,
                    setFollowupData
                  )
                }
              />
              <input
                type="tel"
                placeholder="Contact Phone"
                value={contact.phone}
                onChange={(e) =>
                  handleContactChange(
                    index,
                    "phone",
                    e.target.value,
                    followupData,
                    setFollowupData
                  )
                }
              />
              <button
                type="button"
                onClick={() =>
                  removeContact(index, followupData, setFollowupData)
                }
                className="remove"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addContact(setFollowupData, followupData)}
            className="add"
          >
            Add Contact
          </button>
        </fieldset>
        <fieldset className="form-section">
          <legend>Additional Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                value={followupData.remarks}
                onChange={(e) =>
                  setFollowupData({ ...followupData, remarks: e.target.value })
                }
                id="remarks"
              />
            </div>
            <div className="form-group">
              <label htmlFor="equipment">Equipment</label>
              <select
                value={followupData.equipment}
                onChange={(e) =>
                  setFollowupData({
                    ...followupData,
                    equipment: e.target.value,
                  })
                }
                id="equipment"
              >
                {equipmentOptions.map((equipment) => (
                  <option key={equipment.value} value={equipment.value}>
                    {equipment.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                value={followupData.notes}
                onChange={(e) =>
                  setFollowupData({ ...followupData, notes: e.target.value })
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

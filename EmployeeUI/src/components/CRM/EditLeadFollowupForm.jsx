import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import FollowupProductForm from "./FollowupProductForm";
import FollowupContactForm from "./FollowupContactForm";
import EditLeadInfo from "./EditFollowup/EditLeadInfo";
import EditLeadType from "./EditFollowup/EditLeadType";
import EditFollowupDetails from "./EditFollowup/EditFollowupDetails";
import EditAddressDetails from "./EditFollowup/EditAddressDetails";
import EditAdditionalInfo from "./EditFollowup/EditAdditionalInfo";

const EditLeadFollowupForm = ({ followUp, onClose, onUpdate }) => {
  const [followupEdit, setfollowupEdit] = useState({
    id: "",
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

  useEffect(() => {
    if (followUp) {
      const parsedContacts = Array.isArray(followUp.contacts)
        ? followUp.contacts
        : JSON.parse(followUp.contacts || "[]");
      const parsedProducts = Array.isArray(followUp.products)
        ? followUp.products
        : JSON.parse(followUp.products || "[]");
        setfollowupEdit({
        ...followUp,
        contacts: parsedContacts.length > 0 ? parsedContacts : [],
        products: parsedProducts.length > 0 ? parsedProducts : [],
      });
    }
  }, [followUp]);

  const updateFollowup = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "You are not logged in. Please log in again.",
        });
        return;
      }

      // Log the followupEdit payload to check if it's in the correct format
      console.log("Payload to be sent:", followupEdit);

      const response = await axios.put(
        `http://127.0.0.1:8000/api/lead-followup/${followupEdit.id}`,
        followupEdit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Follow-up data has been updated successfully.",
      });

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating follow-up:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response && error.response.status === 401
            ? "Unauthorized. Please log in again."
            : "Failed to update follow-up.",
      });
    }
  };

  const handleAddContact = () => {
    setfollowupEdit((prevFollowup) => ({
      ...prevFollowup,
      contacts: [...prevFollowup.contacts, { name: "", phone: "", email: "" }],
    }));
  };

  const handleRemoveContact = (index) => {
    setfollowupEdit((prevFollowup) => ({
      ...prevFollowup,
      contacts: prevFollowup.contacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, updatedContact) => {
    const updatedContacts = followupEdit.contacts.map((contact, i) =>
      i === index ? updatedContact : contact
    );
    setfollowupEdit({
      ...followupEdit,
      contacts: updatedContacts,
    });
  };

  const handleAddProduct = () => {
    setfollowupEdit((prevFollowup) => ({
      ...prevFollowup,
      products: [...prevFollowup.products, { name: "", quantity: "" }],
    }));
  };

  const handleRemoveProduct = (index) => {
    setfollowupEdit((prevFollowup) => ({
      ...prevFollowup,
      products: prevFollowup.products.filter((_, i) => i !== index),
    }));
  };

  const handleProductChange = (index, updatedProduct) => {
    const updatedProducts = followupEdit.products.map((product, i) =>
      i === index ? updatedProduct : product
    );
    setfollowupEdit({
      ...followupEdit,
      products: updatedProducts,
    });
  };

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateFollowup();
        }}
        className="form-main"
      >
        {/* Lead Information */}
        <EditLeadInfo
          followupEdit={followupEdit}
          setfollowupEdit={setfollowupEdit}
        />
        {/* Address Details */}
        <EditAddressDetails
          followupEdit={followupEdit}
          setfollowupEdit={setfollowupEdit}
        />
        {/* Lead Type & Contact */}
        <EditLeadType
          followupEdit={followupEdit}
          setfollowupEdit={setfollowupEdit}
        />

        {/* Follow-up Details */}
        <EditFollowupDetails
          followupEdit={followupEdit}
          setfollowupEdit={setfollowupEdit}
        />
        <fieldset className="form-section">
          <legend>Products</legend>
          <div className="form-row">
            {followupEdit.products.map((product, index) => (
              <FollowupProductForm
                key={index}
                product={product}
                formFollowup={followupEdit}
                setfollowupEdit={setfollowupEdit}
                onChange={handleProductChange} // Update function
                onRemove={handleRemoveProduct} // Remove function
              />
            ))}
            <button type="button" onClick={handleAddProduct} className="add">
              Add Product
            </button>
          </div>
        </fieldset>
        <fieldset className="form-section">
          <legend>Contacts</legend>
          <div className="form-row">
            {followupEdit.contacts.map((contact, index) => (
              <FollowupContactForm
                key={index}
                contact={contact}
                formFollowup={followupEdit}
                setfollowupEdit={setfollowupEdit}
                onChange={handleContactChange} // Update function
                onRemove={handleRemoveContact} // Remove function
              />
            ))}
            <button type="button" onClick={handleAddContact} className="add">
              Add Contact
            </button>
          </div>
        </fieldset>
        {/* Additional Info */}
        <EditAdditionalInfo
          formFollowup={followupEdit}
          setfollowupEdit={setfollowupEdit}
        />

        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLeadFollowupForm;

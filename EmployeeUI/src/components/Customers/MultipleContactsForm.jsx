 function MultipleContactsForm({ customer, setCustomer }) {
  const handleAddContact = () => {
    setCustomer((prev) => ({
      ...prev,
      multipleContacts: [
        ...prev.multipleContacts,
        {
          name: "",
          contactNo: "",
          contactNoExt: "",
          email: "",
          fax: "",
          designation: "",
        },
      ],
    }));
  };

  const handleRemoveContact = (index) => {
    setCustomer((prev) => ({
      ...prev,
      multipleContacts: prev.multipleContacts.filter((_, i) => i !== index),
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = customer.multipleContacts.map((contact, i) =>
      i === index ? { ...contact, [name]: value } : contact
    );
    setCustomer((prev) => ({ ...prev, multipleContacts: updatedContacts }));
  };

  return (
    <fieldset>
      <legend>Multiple Contacts</legend>
      {customer.multipleContacts.map((contact, index) => (
        <div key={index} className="contact-entry">
          <div className="form-group">
            <label htmlFor={`contactName-${index}`}>Contact Name</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`contactNo-${index}`}>Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={contact.contactNo}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`contactNoExt-${index}`}>Contact No Ext</label>
            <input
              type="text"
              name="contactNoExt"
              value={contact.contactNoExt}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`email-${index}`}>Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`fax-${index}`}>Fax</label>
            <input
              type="text"
              name="fax"
              value={contact.fax}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`designation-${index}`}>Designation</label>
            <input
              type="text"
              name="designation"
              value={contact.designation}
              onChange={(e) => handleContactChange(index, e)}
            />
          </div>

          <button
            type="button"
            onClick={() => handleRemoveContact(index)}
            className="remove"
          >
            Remove Contact
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddContact} className="add">
        Add Contact
      </button>
    </fieldset>
  );
}

export default MultipleContactsForm;

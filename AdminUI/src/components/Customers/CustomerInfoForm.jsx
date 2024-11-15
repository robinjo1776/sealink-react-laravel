const customerType = [
  "Manufacturer",
  "Trader",
  "Distributor",
  "Retailer",
  "Freight Forwarder",
];

function CustomerInfoForm({ customer, setCustomer }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <fieldset>
      <legend>Customer Information</legend>

      <div className="form-group">
        <label htmlFor="customerType">Customer Type</label>
        <select
          name="customerType"
          value={customer.customerType}
          onChange={handleInputChange}
        >
          <option value="">Select..</option>
          {customerType.map((type) => (
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
          name="customerName"
          value={customer.customerName}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerRefNo">Customer Ref No.</label>
        <input
          type="text"
          name="customerRefNo"
          value={customer.customerRefNo}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          name="website"
          value={customer.website}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactNo">Contact No</label>
        <input
          type="text"
          name="contactNo"
          value={customer.contactNo}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactNoExt">Contact No Ext</label>
        <input
          type="text"
          name="contactNoExt"
          value={customer.contactNoExt}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="taxId">Tax ID</label>
        <input
          type="text"
          name="taxId"
          value={customer.taxId}
          onChange={handleInputChange}
        />
      </div>
    </fieldset>
  );
}

export default CustomerInfoForm;

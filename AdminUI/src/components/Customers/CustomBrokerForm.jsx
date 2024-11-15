function CustomBrokerForm({ customer, setCustomer }) {
  const handleChange = (field) => (e) => {
    setCustomer({
      ...customer,
      customBroker: {
        ...customer.customBroker,
        [field]: e.target.value,
      },
    });
  };

  return (
    <fieldset>
      <legend>Custom Broker</legend>

      <div className="form-group">
        <label htmlFor="broker">Broker</label>
        <select
          id="broker"
          value={customer.customBroker.broker || ""} // Fallback to empty string
          onChange={handleChange("broker")}
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
          value={customer.customBroker.paymentNotes || ""} // Fallback to empty string
          onChange={handleChange("paymentNotes")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="specialNotes">Special Notes for Confirmation Doc</label>
        <textarea
          id="specialNotes"
          value={customer.customBroker.specialNotes || ""} // Fallback to empty string
          onChange={handleChange("specialNotes")}
          rows="4"
        />
      </div>
    </fieldset>
  );
}

export default CustomBrokerForm;

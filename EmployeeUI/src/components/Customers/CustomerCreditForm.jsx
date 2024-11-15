const creditStatus = ["Approved", "Not Approved"];
const modeOfPayment = ["Direct Deposit", "Wire Transfer", "Visa"];
const currency = ["USD", "CAD"];

function CustomerCreditForm({ customer, setCustomer }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      customerCredit: { ...prev.customerCredit, [name]: value || "" },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomer((prev) => ({
      ...prev,
      customerCredit: { ...prev.customerCredit, [name]: checked },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCustomer((prev) => ({
      ...prev,
      customerCredit: { ...prev.customerCredit, [name]: files[0] },
    }));
  };

  return (
    <fieldset>
      <legend>Customer Credit</legend>

      <div className="form-group">
        <label htmlFor="creditStatus">Credit Status</label>
        <select
          name="creditStatus"
          value={customer.customerCredit.creditStatus || ""} // Fallback
          onChange={handleInputChange}
        >
          <option value="">Select..</option>
          {creditStatus.map((status) => (
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
          value={customer.customerCredit.modeOfPayment || ""} // Fallback
          onChange={handleInputChange}
        >
          <option value="">Select..</option>
          {modeOfPayment.map((payment) => (
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
          value={customer.customerCredit.currency || ""} // Fallback
          onChange={handleInputChange}
        >
          <option value="">Select..</option>
          {currency.map((curr) => (
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
          value={customer.customerCredit.approvalDate || ""} // Fallback
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="expiryDate">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={customer.customerCredit.expiryDate || ""} // Fallback
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="terms">Terms (Days)</label>
        <input
          type="number"
          name="terms"
          value={customer.customerCredit.terms || ""} // Fallback
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="limit">Limit</label>
        <input
          type="number"
          name="limit"
          value={customer.customerCredit.limit || ""} // Fallback
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          value={customer.customerCredit.notes || ""} // Fallback
          onChange={handleInputChange}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="creditApplication"
            checked={customer.customerCredit.creditApplication || false} // Fallback to false
            onChange={handleCheckboxChange}
          />
          Credit Application
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="creditAgreement">Credit Agreement</label>
        <input type="file" name="creditAgreement" onChange={handleFileChange} />
        <span>
          {customer.customerCredit.creditAgreement
            ? customer.customerCredit.creditAgreement.name
            : "No file chosen"}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="shipperBrokerAgreement">Shipper Broker Agreement</label>
        <input
          type="file"
          name="shipperBrokerAgreement"
          onChange={handleFileChange}
        />
        <span>
          {customer.customerCredit.shipperBrokerAgreement
            ? customer.customerCredit.shipperBrokerAgreement.name
            : "No file chosen"}
        </span>
      </div>
    </fieldset>
  );
}

export default CustomerCreditForm;

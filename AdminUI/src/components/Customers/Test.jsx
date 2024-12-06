function CustomerCredit({ formCustomer, setformCustomer }) {
  const creditStatusOptions = ["Approved", "Not Approved"];
  const modeOfPaymentOptions = ["Direct Deposit", "Wire Transfer", "Visa"];
  const currencyOptions = ["USD", "CAD"];

  // Helper function to render download link for existing file
  const renderDownloadLink = (fileUrl, fileLabel) => {
    if (fileUrl) {
      return (
        <div>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download {fileLabel}
          </a>
        </div>
      );
    }
    return null;
  };

  return (
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
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          Credit Application
          <input
            type="checkbox"
            id="creditApplication"
            checked={formCustomer.cust_credit_application}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_credit_application: e.target.checked,
              })
            }
          />
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
        {/* Show existing file download link if a file exists */}
        {renderDownloadLink(formCustomer.cust_credit_agreement, 'Credit Agreement')}
      </div>

      <div className="form-group">
        <label htmlFor="shipperBrokerAgreement">Shipper Broker Agreement</label>
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
        {/* Show existing file download link if a file exists */}
        {renderDownloadLink(formCustomer.cust_sbk_agreement, 'Shipper Broker Agreement')}
      </div>
    </fieldset>
  );
}

export default CustomerCredit;

function LeadInfo({ followupData, setFollowupData }) {
  return (
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
          <label htmlFor="leadDate">Lead Date*</label>
          <input
            type="date"
            value={followupData.lead_date}
            onChange={(e) =>
              setFollowupData({
                ...followupData,
                lead_date: e.target.value,
              })
            }
            id="leadDate" required
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
  );
}

export default LeadInfo;

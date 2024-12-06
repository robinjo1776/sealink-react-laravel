function EditLeadInfo({ followupEdit, setfollowupEdit }) {
  return (
    <fieldset className="form-section">
      <legend>Lead Information</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="leadNo">Lead No*</label>
          <input
            type="text"
            value={followupEdit.lead_no}
            onChange={(e) =>
              setfollowupEdit({ ...followupEdit, lead_no: e.target.value })
            }
            id="leadNo"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="leadDate">Lead Date</label>
          <input
            type="date"
            value={followupEdit.lead_date}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
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
            value={followupEdit.customer_name}
            onChange={(e) =>
              setfollowupEdit({
                ...followupEdit,
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
            value={followupEdit.phone}
            onChange={(e) =>
              setfollowupEdit({ ...followupEdit, phone: e.target.value })
            }
            id="phone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={followupEdit.email}
            onChange={(e) =>
              setfollowupEdit({ ...followupEdit, email: e.target.value })
            }
            id="email"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditLeadInfo;

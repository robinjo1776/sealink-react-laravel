function LeadType({ followupData, setFollowupData }) {
    const leadTypeOptions = [
        "AB",
        "BC",
        "BDS",
        "CA",
        "DPD MAGMA",
        "MB",
        "ON",
        "Super Leads",
        "TBAB",
        "USA",
      ];
    return (
        <fieldset className="form-section">
          <legend>Lead Type and Contact</legend>
          <div className="form-row">
          <div className="form-group">
          <label htmlFor="equipmentType">Lead Type</label>
          <select
            id="equipmentType"
            value={followupData.lead_type}
            onChange={(e) =>
                setFollowupData({ ...followupData, lead_type: e.target.value })
            }
          >
            <option value="">Select Lead Type</option>
            {leadTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
    );
  }
  
  export default LeadType;
  
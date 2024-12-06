function AdditionalInfo({ followupData, setFollowupData }) {
  const equipmentTypeOptions = [
    "Van",
    "Reefer",
    "Flatbed",
    "Triaxle",
    "Maxi",
    "Btrain",
    "Roll tite",
  ];
  return (
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
            id="equipment"
            value={followupData.equipment}
            onChange={(e) =>
              setFollowupData({
                ...followupData,
                equipment: e.target.value,
              })
            }
          >
            <option value="">Select Equipment Type</option>
            {equipmentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
  );
}

export default AdditionalInfo;

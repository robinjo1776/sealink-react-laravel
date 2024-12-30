function EditVendorLiabilityInsurance({ formVendor, setFormVendor }) {
  // Helper function to format the date
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
  };

  return (
    <fieldset className="form-section">
      <legend>Liability Insurance Details</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="liProvider">Liability Insurance Provider</label>
          <input
            type="text"
            value={formVendor.liab_company}
            onChange={(e) => setFormVendor({ ...formVendor, liab_company: e.target.value })}
            id="liProvider"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liStartDate">Start Date</label>
          <input
            type="date"
            value={formatDate(formVendor.liab_policy_start)}
            onChange={(e) => setFormVendor({ ...formVendor, liab_policy_start: e.target.value })}
            id="liStartDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liEndDate">End Date</label>
          <input
            type="date"
            value={formatDate(formVendor.liab_policy_end)}
            onChange={(e) => setFormVendor({ ...formVendor, liab_policy_end: e.target.value })}
            id="liEndDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="liCoverage">Coverage Amount</label>
          <input
            type="number"
            value={formVendor.liab_ins_amt}
            onChange={(e) => setFormVendor({ ...formVendor, liab_ins_amt: e.target.value })}
            id="liCoverage"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default EditVendorLiabilityInsurance;

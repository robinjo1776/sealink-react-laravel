function EditOrderGeneral({ formOrder, setFormOrder }) {
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">Customer</label>
          <input type="text" value={formOrder.customer} onChange={(e) => setFormOrder({ ...formOrder, customer: e.target.value })} id="dba" />
        </div>
        <div className="form-group">
          <label htmlFor="legalName">Customer Ref. No</label>
          <input type="text" value={formOrder.customer_ref_no} onChange={(e) => setFormOrder({ ...formOrder, customer_ref_no: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Branch</label>
          <input type="text" value={formOrder.branch} onChange={(e) => setFormOrder({ ...formOrder, branch: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Booked By</label>
          <input type="text" value={formOrder.booked_by} onChange={(e) => setFormOrder({ ...formOrder, booked_by: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Account Rep</label>
          <input type="text" value={formOrder.account_rep} onChange={(e) => setFormOrder({ ...formOrder, account_rep: e.target.value })} id="branch" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Sales Rep</label>
          <input type="text" value={formOrder.sales_rep} onChange={(e) => setFormOrder({ ...formOrder, sales_rep: e.target.value })} id="website" />
        </div>
        <div className="form-group">
          <label htmlFor="fedIdNo">Customer PO Number</label>
          <input type="text" value={formOrder.customer_po_no} onChange={(e) => setFormOrder({ ...formOrder, customer_po_no: e.target.value })} id="fedIdNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderGeneral;

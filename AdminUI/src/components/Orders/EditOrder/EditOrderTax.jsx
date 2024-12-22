function EditOrderTax({ formOrder, setFormOrder }) {
  return (
    <fieldset className="form-section">
      <legend>Tax</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">GST</label>
          <input type="text" value={formOrder.gst} onChange={(e) => setFormOrder({ ...formOrder, gst: e.target.value })} id="dba" />
        </div>
        <div className="form-group">
          <label htmlFor="legalName">PST</label>
          <input type="text" value={formOrder.pst} onChange={(e) => setFormOrder({ ...formOrder, pst: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">HST</label>
          <input type="text" value={formOrder.hst} onChange={(e) => setFormOrder({ ...formOrder, hst: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">QST</label>
          <input type="text" value={formOrder.qst} onChange={(e) => setFormOrder({ ...formOrder, qst: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Final Price</label>
          <input
            type="text"
            value={formOrder.final_price}
            onChange={(e) => setFormOrder({ ...formOrder, final_price: e.target.value })}
            id="branch"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Notes</label>
          <input type="text" value={formOrder.notes} onChange={(e) => setFormOrder({ ...formOrder, notes: e.target.value })} id="website" />
        </div>
      </div>
    </fieldset>
  );
}

export default EditOrderTax;

function OrderTax({ order, setOrder }) {
  return (
    <fieldset className="form-section">
      <legend>Tax</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">GST</label>
          <input type="text" value={order.gst} onChange={(e) => setOrder({ ...order, gst: e.target.value })} id="dba" />
        </div>
        <div className="form-group">
          <label htmlFor="legalName">PST</label>
          <input type="text" value={order.pst} onChange={(e) => setOrder({ ...order, pst: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">HST</label>
          <input type="text" value={order.hst} onChange={(e) => setOrder({ ...order, hst: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">QST</label>
          <input type="text" value={order.qst} onChange={(e) => setOrder({ ...order, qst: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Final Price</label>
          <input type="text" value={order.final_price} onChange={(e) => setOrder({ ...order, final_price: e.target.value })} id="branch" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Notes</label>
          <input type="text" value={order.notes} onChange={(e) => setOrder({ ...order, notes: e.target.value })} id="website" />
        </div>
      </div>
    </fieldset>
  );
}

export default OrderTax;

function OrderGeneral({ order, setOrder }) {
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dba">Customer</label>
          <input type="text" value={order.customer} onChange={(e) => setOrder({ ...order, customer: e.target.value })} id="dba" />
        </div>
        <div className="form-group">
          <label htmlFor="legalName">Customer Ref. No</label>
          <input type="text" value={order.customer_ref_no} onChange={(e) => setOrder({ ...order, customer_ref_no: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Branch</label>
          <input type="text" value={order.branch} onChange={(e) => setOrder({ ...order, branch: e.target.value })} id="remitName" />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Booked By</label>
          <input type="text" value={order.booked_by} onChange={(e) => setOrder({ ...order, booked_by: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Account Rep</label>
          <input type="text" value={order.account_rep} onChange={(e) => setOrder({ ...order, account_rep: e.target.value })} id="branch" />
        </div>
        <div className="form-group">
          <label htmlFor="website">Sales Rep</label>
          <input type="text" value={order.sales_rep} onChange={(e) => setOrder({ ...order, sales_rep: e.target.value })} id="website" />
        </div>
        <div className="form-group">
          <label htmlFor="fedIdNo">Customer PO Number</label>
          <input type="text" value={order.customer_po_no} onChange={(e) => setOrder({ ...order, customer_po_no: e.target.value })} id="fedIdNo" />
        </div>
      </div>
    </fieldset>
  );
}

export default OrderGeneral;

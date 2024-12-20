function QuoteDelivery({ quote_delivery = {}, index, onChange, onRemove }) {
  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    // Update contact with the new value
    const updatedQuote = { ...quote_delivery, [name]: value };
    onChange(index, updatedQuote);
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Address</label>
        <input type="text" name="address" value={quote_delivery.address || ''} onChange={handleQuoteChange} placeholder="Enter address" />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={quote_delivery.city || ''} onChange={handleQuoteChange} placeholder="Enter city" />
      </div>
      <div className="form-group">
        <label>State</label>
        <input type="text" name="state" value={quote_delivery.state || ''} onChange={handleQuoteChange} placeholder="Enter state" />
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input
          type="tel"
          name="postal"
          value={quote_delivery.postal || ''}
          onChange={handleQuoteChange}
          pattern="[0-9]{5}"
          placeholder="Enter postal code"
          maxLength="5"
        />
      </div>
      <div className="form-group">
        <label>Rate</label>
        <input type="number" name="rate" value={quote_delivery.rate || ''} onChange={handleQuoteChange} placeholder="Enter rate" />
      </div>
      <div className="form-group">
        <label>Currency</label>
        <input type="text" name="currency" value={quote_delivery.currency || ''} onChange={handleQuoteChange} placeholder="Enter currency code" />
      </div>
      <div className="form-group">
        <label>Equipment</label>
        <input type="text" name="equipment" value={quote_delivery.equipment || ''} onChange={handleQuoteChange} placeholder="Enter equipment type" />
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={quote_delivery.notes || ''} onChange={handleQuoteChange} placeholder="Enter notes" />
      </div>
      <div className="form-group">
        <label>Packages</label>
        <input
          type="number"
          name="packages"
          value={quote_delivery.packages || ''}
          onChange={handleQuoteChange}
          placeholder="Enter number of packages"
        />
      </div>
      <div className="form-group">
        <label>Dimensions</label>
        <input
          type="text"
          name="dimensions"
          value={quote_delivery.dimensions || ''}
          onChange={handleQuoteChange}
          placeholder="Enter dimensions (e.g., 20x20x20 cm)"
        />
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
}

export default QuoteDelivery;

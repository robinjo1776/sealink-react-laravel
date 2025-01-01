function EditQuoteGeneral({ formQuote, setFormQuote }) {
  const quoteTypeOptions = ['FTL', 'LTL'];
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="creditStatus">Quote Type*</label>

          <select
            id="customerType"
            value={formQuote.quote_type}
            onChange={(e) => setFormQuote({ ...formQuote, quote_type: e.target.value })}
            required
          >
            {quoteTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="legalName">Customer</label>
          <input
            type="text"
            value={formQuote.quote_customer}
            onChange={(e) => setFormQuote({ ...formQuote, quote_customer: e.target.value })}
            id="legalName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Customer Ref. No</label>
          <input
            type="text"
            value={formQuote.quote_cust_ref_no}
            onChange={(e) => setFormQuote({ ...formQuote, quote_cust_ref_no: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Booked By</label>
          <input
            type="text"
            value={formQuote.quote_booked_by}
            onChange={(e) => setFormQuote({ ...formQuote, quote_booked_by: e.target.value })}
            id="accNo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Temperature</label>
          <input
            type="text"
            value={formQuote.quote_temperature}
            onChange={(e) => setFormQuote({ ...formQuote, quote_temperature: e.target.value })}
            id="branch"
          />
        </div>

        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Hot
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_hot}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_hot: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Team
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_team}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_team: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Air Ride
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_air_ride}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_air_ride: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            TARP
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_tarp}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_tarp: e.target.checked,
                })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Hazmat
            <input
              type="checkbox"
              id="creditApplication"
              checked={formQuote.quote_hazmat}
              onChange={(e) =>
                setFormQuote({
                  ...formQuote,
                  quote_hazmat: e.target.checked,
                })
              }
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default EditQuoteGeneral;

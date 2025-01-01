function QuoteGeneral({ quote, setQuote }) {
  const quoteTypeOptions = ['FTL', 'LTL'];
  return (
    <fieldset className="form-section">
      <legend>General</legend>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="creditStatus">Quote Type*</label>
          <select
            name="creditStatus"
            value={quote.quote_type}
            onChange={(e) =>
              setQuote({
                ...quote,
                quote_type: e.target.value,
              })
            }
            required
          >
            <option value="">Select..</option>
            {quoteTypeOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="legalName">Customer</label>
          <input type="text" value={quote.quote_customer} onChange={(e) => setQuote({ ...quote, quote_customer: e.target.value })} id="legalName" />
        </div>
        <div className="form-group">
          <label htmlFor="remitName">Customer Ref. No</label>
          <input
            type="text"
            value={quote.quote_cust_ref_no}
            onChange={(e) => setQuote({ ...quote, quote_cust_ref_no: e.target.value })}
            id="remitName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="accNo">Booked By</label>
          <input type="text" value={quote.quote_booked_by} onChange={(e) => setQuote({ ...quote, quote_booked_by: e.target.value })} id="accNo" />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Temperature</label>
          <input
            type="text"
            value={quote.quote_temperature}
            onChange={(e) => setQuote({ ...quote, quote_temperature: e.target.value })}
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
              checked={quote.quote_hot}
              onChange={(e) =>
                setQuote({
                  ...quote,
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
              checked={quote.quote_team}
              onChange={(e) =>
                setQuote({
                  ...quote,
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
              checked={quote.quote_air_ride}
              onChange={(e) =>
                setQuote({
                  ...quote,
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
              checked={quote.quote_tarp}
              onChange={(e) =>
                setQuote({
                  ...quote,
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
              checked={quote.quote_hazmat}
              onChange={(e) =>
                setQuote({
                  ...quote,
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

export default QuoteGeneral;

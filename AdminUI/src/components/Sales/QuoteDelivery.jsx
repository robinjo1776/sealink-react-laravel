import { useEffect, useRef } from 'react';

function QuoteDelivery({ quote_delivery = {}, index, onChange, onRemove }) {
  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.maps) {
          initializeAutocomplete();
        }
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) {
        console.error('No valid address selected');
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;

    // Extract the main address (street_number + route)
    const streetNumber = getComponent('street_number', '', addressComponents);
    const route = getComponent('route', '', addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Now we call onChange to update the specific pickup field
    onChange(index, {
      ...quote_delivery,
      address: mainAddress,
      city: getComponent('locality', '', addressComponents),
      state: getComponent('administrative_area_level_1', '', addressComponents),
      country: getComponent('country', '', addressComponents),
      postal: getComponent('postal_code', '', addressComponents),
    });
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };
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
        <input
          type="text"
          name="address"
          value={quote_delivery.address || ''}
          onChange={handleQuoteChange}
          ref={addressRef}
          placeholder="Enter address"
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={quote_delivery.city || ''} onChange={handleQuoteChange} />
      </div>
      <div className="form-group">
        <label>State</label>
        <input type="text" name="state" value={quote_delivery.state || ''} onChange={handleQuoteChange} />
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input type="tel" name="postal" value={quote_delivery.postal || ''} onChange={handleQuoteChange} pattern="[0-9]{5}" maxLength="5" />
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

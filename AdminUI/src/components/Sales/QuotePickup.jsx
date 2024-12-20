import { useEffect, useRef } from 'react';

function QuotePickup({ setQuote, quote_pickup = {}, index, onChange, onRemove }) {
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
      ...quote_pickup,
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
    const updatedQuote = { ...quote_pickup, [name]: value };
    onChange(index, updatedQuote); // Ensure onChange is called to update parent state
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={quote_pickup.address || ''}
          onChange={handleQuoteChange}
          ref={addressRef}
          placeholder="Enter your address"
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={quote_pickup.city || ''} onChange={handleQuoteChange} placeholder="Enter city" />
      </div>
      <div className="form-group">
        <label>State</label>
        <input type="text" name="state" value={quote_pickup.state || ''} onChange={handleQuoteChange} placeholder="Enter state" />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input type="text" name="country" value={quote_pickup.country || ''} onChange={handleQuoteChange} placeholder="Enter country" />
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input type="text" name="postal" value={quote_pickup.postal || ''} onChange={handleQuoteChange} placeholder="Enter postal code" />
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
}

export default QuotePickup;

import { useEffect, useRef, useState } from 'react';

function QuotePickup({ setQuote = { setQuote }, quote, pickup = {}, index, onChange, onRemove }) {
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

    // Update the form customer state with the relevant values
    setQuote((prevQuote) => ({
      ...prevQuote,
      address: mainAddress, // Only store the main address in the state
      city: getComponent('locality', '', addressComponents),
      state: getComponent('administrative_area_level_1', '', addressComponents),
      country: getComponent('country', '', addressComponents),
      postal: getComponent('postal_code', '', addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    // Update contact with the new value
    const updatedPickup = { ...pickup, [name]: value };
    onChange(index, updatedPickup);
  };

  return (
    <div className="contact-form">
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={quote.address}
          onChange={handleQuoteChange}
          ref={addressRef}
          placeholder="Enter your address"
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={quote.city} onChange={handleQuoteChange} />
      </div>
      <div className="form-group">
        <label>State</label>
        <input type="text" name="state" value={quote.state} onChange={handleQuoteChange} />
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input type="text" name="postal" value={quote.postal} onChange={handleQuoteChange} />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input type="text" name="country" value={quote.country} onChange={handleQuoteChange} />
      </div>

      <button type="button" onClick={() => onRemove(index)} className="remove">
        Remove
      </button>
    </div>
  );
}

export default QuotePickup;

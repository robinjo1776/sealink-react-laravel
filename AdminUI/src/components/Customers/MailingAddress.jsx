import { useEffect, useRef } from "react";

function CustomerMailingAddressForm({ formCustomer, setformCustomer }) {
  const addressRef = useRef(null);
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places";
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
    const autocomplete = new window.google.maps.places.Autocomplete(
      addressRef.current,
      {
        types: ["address"],
      }
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place || !place.address_components) {
        console.error("No valid address selected");
        return;
      }
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;

    // Extract the main address (street_number + route)
    const streetNumber = getComponent("street_number", "", addressComponents);
    const route = getComponent("route", "", addressComponents);
    const mainAddress = `${streetNumber} ${route}`.trim(); // Combine street number and route

    // Update the form customer state with the relevant values
    setformCustomer((prevCustomer) => ({
      ...prevCustomer,
      cust_mailing_address: mainAddress, // Only store the main address in the state
      cust_mailing_city: getComponent("locality", "", addressComponents),
      cust_mailing_state: getComponent(
        "administrative_area_level_1",
        "",
        addressComponents
      ),
      cust_mailing_country: getComponent("country", "", addressComponents),
      cust_mailing_postal: getComponent("postal_code", "", addressComponents),
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };
  return (
    <fieldset>
      <legend>Mailing Address</legend>

      <div className="form-group">
        <label htmlFor="mailingAddressSame">
          <input
            type="checkbox"
            checked={formCustomer.sameAsPrimary || false}
            onChange={(e) =>
              setformCustomer({
                ...formCustomer,
                cust_contact_no: e.target.value,
              })
            }
          />
          Same as Primary Address
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="mailingAddressStreet">Street</label>
        <input
          type="text"
          ref={addressRef}
          value={formCustomer.cust_mailing_address}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_mailing_address: e.target.value,
            })
          }
          placeholder="Enter your address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mailingAddressCity">City</label>
        <input
          type="text"
          value={formCustomer.cust_mailing_city}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_mailing_city: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="mailingAddressState">State</label>
        <input
          type="text"
          value={formCustomer.cust_mailing_state}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_mailing_state: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="mailingAddressCountry">Country</label>
        <input
          type="text"
          value={formCustomer.cust_mailing_country}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_mailing_country: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="mailingAddressPostalCode">Postal Code</label>
        <input
          type="text"
          value={formCustomer.cust_mailing_postal}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_mailing_postal: e.target.value,
            })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="mailingAddressUnitNo">Unit No</label>
        <input
          type="text"
          value={formCustomer.cust_mailing_unit_no}
          onChange={(e) =>
            setformCustomer({
              ...formCustomer,
              cust_mailing_unit_no: e.target.value,
            })
          }
        />
      </div>
    </fieldset>
  );
}

export default CustomerMailingAddressForm;

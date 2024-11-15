import React, { useEffect, useRef } from "react";

function PrimaryAddressForm({ customer, setCustomer }) {
  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places"; // Replace with your API key
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
        componentRestrictions: { country: "us" }, // Adjust to your country if needed
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      updateAddressFields(place);
    });
  };

  const updateAddressFields = (place) => {
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address || "";

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      primaryAddress: {
        ...prevCustomer.primaryAddress,
        street: formattedAddress,
        city: getComponent("locality", "", addressComponents),
        state: getComponent(
          "administrative_area_level_1",
          "",
          addressComponents
        ),
        country: getComponent("country", "", addressComponents),
        postalCode: getComponent("postal_code", "", addressComponents),
      },
    }));
  };

  const getComponent = (type, fallback, components) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : fallback;
  };

  return (
    <fieldset>
      <legend>Primary Address</legend>
      {customer.primaryAddress && (
        <>
          <div className="form-group">
            <label htmlFor="primaryAddressStreet">Street</label>
            <input
              type="text"
              ref={addressRef}
              value={customer.primaryAddress.street}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  primaryAddress: {
                    ...customer.primaryAddress,
                    street: e.target.value,
                  },
                })
              }
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressCity">City</label>
            <input
              type="text"
              value={customer.primaryAddress.city}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  primaryAddress: {
                    ...customer.primaryAddress,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressState">State</label>
            <input
              type="text"
              value={customer.primaryAddress.state}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  primaryAddress: {
                    ...customer.primaryAddress,
                    state: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressCountry">Country</label>
            <input
              type="text"
              value={customer.primaryAddress.country}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  primaryAddress: {
                    ...customer.primaryAddress,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressPostalCode">Postal Code</label>
            <input
              type="text"
              value={customer.primaryAddress.postalCode}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  primaryAddress: {
                    ...customer.primaryAddress,
                    postalCode: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="primaryAddressUnitNo">Unit No</label>
            <input
              type="text"
              value={customer.primaryAddress.unitNo}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  primaryAddress: {
                    ...customer.primaryAddress,
                    unitNo: e.target.value,
                  },
                })
              }
            />
          </div>
        </>
      )}
    </fieldset>
  );
}

export default PrimaryAddressForm;

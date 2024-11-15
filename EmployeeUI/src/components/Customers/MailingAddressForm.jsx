import { useEffect, useRef } from "react";

function MailingAddressForm({ customer, setCustomer }) {
  const addressRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY&libraries=places";
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
        componentRestrictions: { country: "us" },
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
      mailingAddress: {
        ...prevCustomer.mailingAddress,
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
      <legend>Mailing Address</legend>

      <div className="form-group">
        <label htmlFor="mailingAddressSame">
          <input
            type="checkbox"
            checked={customer.mailingAddress.sameAsPrimary || false}
            onChange={(e) =>
              setCustomer({
                ...customer,
                mailingAddress: {
                  ...customer.mailingAddress,
                  sameAsPrimary: e.target.checked,
                },
              })
            }
          />
          Same as Primary Address
        </label>
      </div>

      {!customer.mailingAddress.sameAsPrimary && (
        <>
          <div className="form-group">
            <label htmlFor="mailingAddressStreet">Street</label>
            <input
              type="text"
              ref={addressRef}
              value={customer.mailingAddress.street || ""}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  mailingAddress: {
                    ...customer.mailingAddress,
                    street: e.target.value,
                  },
                })
              }
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressCity">City</label>
            <input
              type="text"
              value={customer.mailingAddress.city || ""}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  mailingAddress: {
                    ...customer.mailingAddress,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressState">State</label>
            <input
              type="text"
              value={customer.mailingAddress.state || ""}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  mailingAddress: {
                    ...customer.mailingAddress,
                    state: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressCountry">Country</label>
            <input
              type="text"
              value={customer.mailingAddress.country || ""}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  mailingAddress: {
                    ...customer.mailingAddress,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressPostalCode">Postal Code</label>
            <input
              type="text"
              value={customer.mailingAddress.postalCode || ""}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  mailingAddress: {
                    ...customer.mailingAddress,
                    postalCode: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="mailingAddressUnitNo">Unit No</label>
            <input
              type="text"
              value={customer.mailingAddress.unitNo || ""}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  mailingAddress: {
                    ...customer.mailingAddress,
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

export default MailingAddressForm;

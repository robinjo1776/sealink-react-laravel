import { useEffect, useRef } from "react";

function AccountsPayableForm({ customer, setCustomer }) {
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

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      accountsPayable: {
        ...prevCustomer.accountsPayable,
        street: place.formatted_address || "",
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

  const handleChange = (field) => (e) => {
    setCustomer({
      ...customer,
      accountsPayable: {
        ...customer.accountsPayable,
        [field]: e.target.value,
      },
    });
  };

  return (
    <fieldset>
      <legend>Accounts Payable</legend>

      <div className="form-group">
        <label htmlFor="accountsPayableName">Name</label>
        <input
          type="text"
          id="accountsPayableName"
          value={customer.accountsPayable.name}
          onChange={handleChange("name")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={addressRef}
          value={customer.accountsPayable.street}
          onChange={handleChange("street")}
          placeholder="Enter your address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={customer.accountsPayable.city}
          onChange={handleChange("city")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={customer.accountsPayable.state}
          onChange={handleChange("state")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          value={customer.accountsPayable.country}
          onChange={handleChange("country")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          value={customer.accountsPayable.postalCode}
          onChange={handleChange("postalCode")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="unitNo">Unit No</label>
        <input
          type="text"
          id="unitNo"
          value={customer.accountsPayable.unitNo}
          onChange={handleChange("unitNo")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={customer.accountsPayable.email}
          onChange={handleChange("email")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          value={customer.accountsPayable.phone}
          onChange={handleChange("phone")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneExt">Phone Ext</label>
        <input
          type="text"
          id="phoneExt"
          value={customer.accountsPayable.phoneExt}
          onChange={handleChange("phoneExt")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fax">Fax</label>
        <input
          type="text"
          id="fax"
          value={customer.accountsPayable.fax}
          onChange={handleChange("fax")}
        />
      </div>
    </fieldset>
  );
}

export default AccountsPayableForm;

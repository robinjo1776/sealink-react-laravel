import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CustomerInfoForm from "./CustomerInfoForm";
import PrimaryAddressForm from "./PrimaryAddressForm";
import MailingAddressForm from "./MailingAddressForm";
import AccountsPayableForm from "./AccountsPayableForm";
import CustomBrokerForm from "./CustomBrokerForm";
import CustomerCreditForm from "./CustomerCreditForm";
import MultipleContactsForm from "./MultipleContactsForm";
import MultipleEquipmentsForm from "./MultipleEquipmentsForm";

function AddCustomerForm() {
  const [customer, setCustomer] = useState({
    customerType: "",
    customerName: "",
    customerRefNo: "",
    website: "",
    email: "",
    contactNo: "",
    contactNoExt: "",
    taxId: "",
    primaryAddress: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      unitNo: "",
    },
    mailingAddress: {
      sameAsPrimary: false,
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      unitNo: "",
    },
    accountsPayable: {
      name: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      unitNo: "",
      email: "",
      phone: "",
      phoneExt: "",
      fax: "",
    },
    customBroker: {
      broker: "",
    },
    paymentNotes: "",
    specialNotes: "",
    customerCredit: {
      creditStatus: "",
      modeOfPayment: "",
      approvalDate: "",
      expiryDate: "",
      terms: "",
      limit: "",
      notes: "",
      currency: "",
    },
    creditApplication: "",
    creditAgreement: "",
    shipperBrokerAgreement: "",
    multipleContacts: [],
    multipleEquipments: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Customer data before submission:", customer); // Debugging log

    const payload = {
      cust_name: customer.customerName,
      cust_type: customer.customerType,
      cust_ref_no: customer.customerRefNo,
      cust_website: customer.website,
      cust_email: customer.email,
      cust_contact_no: customer.contactNo,
      cust_contact_no_ext: customer.contactNoExt,
      cust_tax_id: customer.taxId,
      cust_primary_address: customer.primaryAddress.street,
      cust_primary_city: customer.primaryAddress.city,
      cust_primary_state: customer.primaryAddress.state,
      cust_primary_country: customer.primaryAddress.country,
      cust_primary_postal: customer.primaryAddress.postalCode,
      cust_primary_unit_no: customer.primaryAddress.unitNo || null,
      cust_mailing_address: customer.mailingAddress.street,
      cust_mailing_city: customer.mailingAddress.city,
      cust_mailing_state: customer.mailingAddress.state,
      cust_mailing_country: customer.mailingAddress.country,
      cust_mailing_postal: customer.mailingAddress.postalCode,
      cust_mailing_unit_no: customer.mailingAddress.unitNo || null,
      cust_ap_name: customer.accountsPayable.name,
      cust_ap_address: customer.accountsPayable.street,
      cust_ap_city: customer.accountsPayable.city,
      cust_ap_state: customer.accountsPayable.state,
      cust_ap_country: customer.accountsPayable.country,
      cust_ap_postal: customer.accountsPayable.postalCode,
      cust_ap_unit_no: customer.accountsPayable.unitNo || null,
      cust_ap_email: customer.accountsPayable.email,
      cust_ap_phone: customer.accountsPayable.phone,
      cust_ap_phone_ext: customer.accountsPayable.phoneExt,
      cust_ap_fax: customer.accountsPayable.fax,
      cust_broker_name: customer.customBroker.broker || null,
      cust_bkp_notes: customer.paymentNotes || null,
      cust_bkspl_notes: customer.specialNotes || null,
      cust_credit_status: customer.customerCredit.creditStatus,
      cust_credit_mop: customer.customerCredit.modeOfPayment,
      cust_credit_appd: customer.customerCredit.approvalDate,
      cust_credit_expd: customer.customerCredit.expiryDate,
      cust_credit_terms: customer.customerCredit.terms,
      cust_credit_limit: customer.customerCredit.limit,
      cust_credit_notes: customer.customerCredit.notes || null,
      cust_credit_currency: customer.customerCredit.currency,
      cust_credit_application: customer.creditApplication || null, // Change here
      cust_credit_agreement: customer.creditAgreement || null, // Change here
      cust_sbk_agreement: customer.shipperBrokerAgreement || null,
      cust_contact: customer.multipleContacts.join(", "), // Adjust if needed
      cust_equipment: customer.multipleEquipments.join(", "), // Adjust if needed
    };

    if (validateCustomer()) {
      try {
        await axios.post("http://127.0.0.1:8000/api/customer", payload);
        Swal.fire(
          "Saved!",
          "Customer data has been saved successfully.",
          "success"
        );
        clearCustomerForm();
      } catch (error) {
        console.error(
          "Error saving customer:",
          error.response ? error.response.data : error.message
        );
        Swal.fire(
          "Error",
          "An error occurred while saving the customer.",
          "error"
        );
      }
    } else {
      Swal.fire(
        "Validation Error",
        "Please fill in all required fields.",
        "error"
      );
    }
  };

  const validateCustomer = () => {
    return customer.customerName && customer.customerType; // Add other required fields as necessary
  };

  const clearCustomerForm = () => {
    setCustomer({
      customerType: "",
      customerName: "",
      customerRefNo: "",
      website: "",
      email: "",
      contactNo: "",
      contactNoExt: "",
      taxId: "",
      primaryAddress: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        unitNo: "",
      },
      mailingAddress: {
        sameAsPrimary: false,
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        unitNo: "",
      },
      accountsPayable: {
        name: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        unitNo: "",
        email: "",
        phone: "",
        phoneExt: "",
        fax: "",
      },
      customBroker: {
        broker: "",
      },
      paymentNotes: "",
      specialNotes: "",
      customerCredit: {
        creditStatus: "",
        modeOfPayment: "",
        approvalDate: "",
        expiryDate: "",
        terms: "",
        limit: "",
        notes: "",
        currency: "",
      },
      creditApplication: "",
      creditAgreement: "",
      multipleContacts: [],
      multipleEquipments: [],
    });
  };

  return (
    <div>
      <style>
        {`
          .add-customer-form {
            display: flex;
            flex-wrap: wrap;
            gap: 20px; /* Space between sections */
            margin: 40px 0; /* Space above and below the form */
          }

          .form-section {
            flex: 1 1 300px; /* Base width and allows sections to grow/shrink */
            min-width: 250px; /* Minimum width */
          }
        `}
      </style>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="form-section">
          <CustomerInfoForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <PrimaryAddressForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <MailingAddressForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <AccountsPayableForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <CustomBrokerForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <CustomerCreditForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <MultipleContactsForm customer={customer} setCustomer={setCustomer} />
        </div>
        <div className="form-section">
          <MultipleEquipmentsForm
            customer={customer}
            setCustomer={setCustomer}
          />
        </div>

        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomerForm;

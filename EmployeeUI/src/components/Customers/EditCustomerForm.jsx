import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

function EditCustomerForm() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/customer/${id}`
        );
        console.log("Fetched customer data:", data); // Debugging log
        setCustomer({
          customerType: data.cust_type || "",
          customerName: data.cust_name || "",
          customerRefNo: data.cust_ref_no || "",
          website: data.cust_website || "",
          email: data.cust_email || "",
          contactNo: data.cust_contact_no || "",
          contactNoExt: data.cust_contact_no_ext || "",
          taxId: data.cust_tax_id || "",
          primaryAddress: {
            street: data.cust_primary_address || "",
            city: data.cust_primary_city || "",
            state: data.cust_primary_state || "",
            country: data.cust_primary_country || "",
            postalCode: data.cust_primary_postal || "",
            unitNo: data.cust_primary_unit_no || "",
          },
          mailingAddress: {
            sameAsPrimary: data.cust_mailing_same_as_primary || false,
            street: data.cust_mailing_address || "",
            city: data.cust_mailing_city || "",
            state: data.cust_mailing_state || "",
            country: data.cust_mailing_country || "",
            postalCode: data.cust_mailing_postal || "",
            unitNo: data.cust_mailing_unit_no || "",
          },
          accountsPayable: {
            name: data.cust_ap_name || "",
            street: data.cust_ap_address || "",
            city: data.cust_ap_city || "",
            state: data.cust_ap_state || "",
            country: data.cust_ap_country || "",
            postalCode: data.cust_ap_postal || "",
            unitNo: data.cust_ap_unit_no || "",
            email: data.cust_ap_email || "",
            phone: data.cust_ap_phone || "",
            phoneExt: data.cust_ap_phone_ext || "",
            fax: data.cust_ap_fax || "",
          },
          customBroker: {
            broker: data.cust_broker_name || "",
          },
          paymentNotes: data.cust_bkp_notes || "",
          specialNotes: data.cust_bkspl_notes || "",
          customerCredit: {
            creditStatus: data.cust_credit_status || "",
            modeOfPayment: data.cust_credit_mop || "",
            approvalDate: data.cust_credit_appd || "",
            expiryDate: data.cust_credit_expd || "",
            terms: data.cust_credit_terms || "",
            limit: data.cust_credit_limit || "",
            notes: data.cust_credit_notes || "",
            currency: data.cust_credit_currency || "",
          },
          creditApplication: data.cust_credit_application || "",
          creditAgreement: data.cust_credit_agreement || "",
          shipperBrokerAgreement: data.cust_sbk_agreement || "",
          multipleContacts: data.cust_contact
            ? data.cust_contact.split(", ")
            : [],
          multipleEquipments: data.cust_equipment
            ? data.cust_equipment.split(", ")
            : [],
        });
      } catch (error) {
        console.error("Error fetching customer data:", error);
        Swal.fire("Error", "Failed to load customer data.", "error");
      }
    };

    fetchCustomer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Customer data before submission:", customer);

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
      cust_credit_application: customer.creditApplication || null,
      cust_credit_agreement: customer.creditAgreement || null,
      cust_sbk_agreement: customer.shipperBrokerAgreement || null,
      cust_contact: customer.multipleContacts.join(", "),
      cust_equipment: customer.multipleEquipments.join(", "),
    };

    if (validateCustomer()) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/customer/${id}`, payload);
        Swal.fire(
          "Updated!",
          "Customer data has been updated successfully.",
          "success"
        );
      } catch (error) {
        console.error(
          "Error updating customer:",
          error.response ? error.response.data : error.message
        );
        Swal.fire(
          "Error",
          "An error occurred while updating the customer.",
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

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <style>
        {`
          .edit-customer-form {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 40px 0;
          }

          .form-section {
            flex: 1 1 300px;
            min-width: 250px;
          }

          .submit-button-container {
            text-align: right;
            margin-top: 20px;
            flex-basis: 100%;
          }
        `}
      </style>
      <form onSubmit={handleSubmit} className="edit-customer-form">
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCustomerForm;

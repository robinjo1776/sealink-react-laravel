import { Form, Button, Divider, message } from 'antd';
import axios from 'axios';
import CustomerDetailsForm from './CustomerDetailsForm';
import CommodityDetailsForm from './CommodityDetailsForm';
import OriginLocationForm from './OriginLocationForm';
import DestinationLocationForm from './DestinationLocationForm';
import RevenueForm from './RevenueForm';
import ChargesForm from './ChargesForm';
import DiscountsForm from './DiscountsForm';
import FinalCalculationsForm from './FinalCalculationsForm';

const AddOrderForm = () => {
  const [form] = Form.useForm();

  const formatDate = (dateString) => {
    if (!dateString) return null; // Return null if the date is not provided
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' '); // Format to 'YYYY-MM-DD HH:MM:SS'
  };

  const handleSubmit = async (values) => {
    try {
      console.log('Form Values:', values);

      const payload = {
        customer: values.customer,
        customer_ref_no: values.customerRefNo,
        branch: values.branch,
        booked_by: values.bookedBy,
        account_rep: values.accountRep,
        sales_rep: values.salesRep,
        shipment: values.shipment,
        commodity: values.commodity,
        temperature: values.temperature,
        origin_street: values.originStreet,
        origin_city: values.originCity,
        origin_state: values.originState,
        origin_country: values.originCountry,
        pickup_date: formatDate(values.pickupDate), // Format date
        pickup_time: formatDate(values.pickupTime), // Format time
        pickup_po: values.pickupPO,
        origin_postal_code: values.originPostalCode,
        origin_phone: values.originPhone,
        shipper_notes: values.shipperNotes,
        origin_packages: values.originPackages,
        origin_weight: values.originWeight,
        origin_dimensions: values.originDimensions,
        destination_street: values.destinationStreet,
        destination_city: values.destinationCity,
        destination_state: values.destinationState,
        destination_country: values.destinationCountry,
        delivery_date: formatDate(values.deliveryDate), // Format date
        delivery_time: formatDate(values.deliveryTime), // Format time
        delivery_po: values.deliveryPO,
        destination_postal_code: values.destinationPostalCode,
        destination_phone: values.destinationPhone,
        delivery_notes: values.deliveryNotes,
        destination_packages: values.destinationPackages,
        destination_weight: values.destinationWeight,
        destination_dimensions: values.destinationDimensions,
        equipment: values.equipment,
        load_type: values.loadType,
        gst: values.gst,
        pst: values.pst,
        hst: values.hst,
        currency: values.currency,
        base_price: values.basePrice,
        discounts: values.totalDiscounts,
        final_price: values.netTotal,
        notes: values.notes,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/order', payload);
      if (response.status === 201) {
        message.success('Order submitted successfully!');
        form.resetFields();
      } else {
        message.error('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error.response ? error.response.data : error.message);
      message.error('Submission failed. Please try again.');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <h2>Create Order</h2>
      <Divider />

      <CustomerDetailsForm />
      <CommodityDetailsForm />
      <OriginLocationForm />
      <DestinationLocationForm />
      <RevenueForm />
      <ChargesForm />
      <DiscountsForm />
      <FinalCalculationsForm />

      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Submit Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddOrderForm;

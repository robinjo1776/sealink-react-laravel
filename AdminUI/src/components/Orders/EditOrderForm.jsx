import React, { useEffect } from "react";
import { Form, Button, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomerDetailsForm from "./CustomerDetailsForm";
import CommodityDetailsForm from "./CommodityDetailsForm";
import OriginLocationForm from "./OriginLocationForm";
import DestinationLocationForm from "./DestinationLocationForm";
import RevenueForm from "./RevenueForm";
import ChargesForm from "./ChargesForm";
import DiscountsForm from "./DiscountsForm";
import FinalCalculationsForm from "./FinalCalculationsForm";

const EditOrderForm = () => {
  const [form] = Form.useForm();
  const { id: orderId } = useParams(); // Get orderId from URL params

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/order/${orderId}`);
        const orderData = response.data;

        // Map order data to the form fields
        form.setFieldsValue({
          customer: orderData.customer,
          customerRefNo: orderData.customer_ref_no,
          branch: orderData.branch,
          bookedBy: orderData.booked_by,
          accountRep: orderData.account_rep,
          salesRep: orderData.sales_rep,
          customerPONo: orderData.customer_po_no,
          shipment: orderData.shipment,
          commodity: orderData.commodity,
          equipment: orderData.equipment,
          loadType: orderData.load_type,
          temperature: orderData.temperature,
          originStreet: orderData.origin_street,
          originCity: orderData.origin_city,
          originState: orderData.origin_state,
          originCountry: orderData.origin_country,
          pickupDate: orderData.pickup_date,
          pickupTime: orderData.pickup_time,
          pickupPO: orderData.pickup_po,
          originPostalCode: orderData.origin_postal_code,
          originPhone: orderData.origin_phone,
          shipperNotes: orderData.shipper_notes,
          originPackages: orderData.origin_packages,
          originWeight: orderData.origin_weight,
          originDimensions: orderData.origin_dimensions,
          destinationStreet: orderData.destination_street,
          destinationCity: orderData.destination_city,
          destinationState: orderData.destination_state,
          destinationCountry: orderData.destination_country,
          deliveryDate: orderData.delivery_date,
          deliveryTime: orderData.delivery_time,
          deliveryPO: orderData.delivery_po,
          destinationPostalCode: orderData.destination_postal_code,
          destinationPhone: orderData.destination_phone,
          deliveryNotes: orderData.delivery_notes,
          destinationPackages: orderData.destination_packages,
          destinationWeight: orderData.destination_weight,
          destinationDimensions: orderData.destination_dimensions,
          specialInstructions: orderData.special_instructions,
          currency: orderData.currency,
          basePrice: orderData.base_price,
          charges: orderData.charges,
          discounts: orderData.discounts || [], // Ensure this is an array
          gst: orderData.gst,
          pst: orderData.pst,
          hst: orderData.hst,
          qst: orderData.qst,
          finalPrice: orderData.final_price,
          notes: orderData.notes,
        });
      } catch (error) {
        message.error("Failed to load order details.");
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
      };

      const response = await axios.put(`http://127.0.0.1:8000/api/order/${orderId}`, payload);
      if (response.status === 200) {
        message.success("Order updated successfully!");
      } else {
        message.error("Update failed. Please try again.");
      }
    } catch (error) {
      message.error("Error updating order.");
      console.error("Error:", error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <h2>Edit Order</h2>

      <CustomerDetailsForm />
      <CommodityDetailsForm />
      <OriginLocationForm />
      <DestinationLocationForm />
      <RevenueForm />
      <ChargesForm />
      <DiscountsForm />
      <FinalCalculationsForm />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditOrderForm;

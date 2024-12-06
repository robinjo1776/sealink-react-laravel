import { Form, Select, Input, Row, Col } from "antd";

const { Option } = Select;

const CustomerDetailsForm = () => (
  <>
       <h3>Customer Details:</h3>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Select Customer"
          name="customer"
          rules={[{ required: true, message: "Please select a customer!" }]}
        >
          <Select placeholder="Select a customer">
            <Option value="customer1">Customer 1</Option>
            <Option value="customer2">Customer 2</Option>
            {/* Add more customers as needed */}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Customer Ref. No" name="customerRefNo">
          <Input />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item label="Branch" name="branch">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Booked By" name="bookedBy">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Account Rep" name="accountRep">
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={8}>
        <Form.Item label="Sales Rep" name="salesRep">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Customer PO No" name="customerPONo">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Shipment" name="shipment">
          <Input />
        </Form.Item>
      </Col>
    </Row>
  </>
);

export default CustomerDetailsForm;

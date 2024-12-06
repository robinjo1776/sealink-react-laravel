import { Form, Select, Input, Row, Col } from 'antd';

const { Option } = Select;

const RevenueForm = () => (
  <>
     <h3>Revenue Details:</h3>
    <Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Currency"
            name="currency"

          >
            <Select placeholder="Select a currency">
              <Option value="USD">USD</Option>
              <Option value="USD">CAD</Option>
              <Option value="EUR">EUR</Option>
              <Option value="GBP">GBP</Option>
              {/* Add more currencies as needed */}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Base Price"
            name="basePrice"

          >
            <Input type="number" placeholder="Enter base price" />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
    </>
  );


export default RevenueForm;

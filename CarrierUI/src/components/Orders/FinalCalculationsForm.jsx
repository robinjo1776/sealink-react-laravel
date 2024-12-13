import React from 'react';
import { Form, Input, Row, Col } from 'antd';

const FinalCalculationsForm = () => (
  <>
    <h3>Final Calculations:</h3>
    <Row gutter={16}>
      <Col span={4}>
        <Form.Item label="GST" name="gst">
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="PST" name="pst">
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="HST" name="hst">
          <Input type="number" />
        </Form.Item>
      </Col>

      <Col span={4}>
        <Form.Item label="Total Charges" name="totalCharges">
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="Total Discounts" name="totalDiscounts">
          <Input type="number" />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="Net Total" name="netTotal">
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
    <Col span={24}>
    <Form.Item label="Notes" name="notes">
    <Input.TextArea />
        </Form.Item>
        </Col>
      </Row>
  </>
);

export default FinalCalculationsForm;

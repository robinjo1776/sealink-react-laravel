import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const CommodityDetailsForm = () => (
  <>
      <h3>Commodity Details:</h3>
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item label="Commodity" name="commodity">
          <Input />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item 
          label="Equipment" 
          name="equipment" 
          rules={[{ required: true, message: 'Equipment is required!' }]}
        >
          <Select placeholder="Select equipment">
            <Option value="equipment1">Equipment 1</Option>
            <Option value="equipment2">Equipment 2</Option>
            {/* Add more equipment options */}
          </Select>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item 
          label="Load Type" 
          name="loadType" 
          rules={[{ required: true, message: 'Load type is required!' }]}
        >
          <Select placeholder="Select load type">
            <Option value="type1">Type 1</Option>
            <Option value="type2">Type 2</Option>
            {/* Add more load types */}
          </Select>
        </Form.Item>
      </Col>
    
      <Col span={6}>

    <Form.Item label="Temperature" name="temperature">
      <Input />
    </Form.Item>
    </Col>
    </Row>
  </>
);

export default CommodityDetailsForm;

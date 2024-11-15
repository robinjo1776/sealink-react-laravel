import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const ChargesForm = () => (
  <>
    <h3>Charges:</h3>
    <Form.List name="charges">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Row key={key} gutter={16}>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'chargeType']}
                  fieldKey={[fieldKey, 'chargeType']}
                  rules={[{ required: true, message: 'Missing charge type' }]}
                >
                  <Input placeholder="Charge Type" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'charge']}
                  fieldKey={[fieldKey, 'charge']}
                  rules={[{ required: true, message: 'Missing charge' }]}
                >
                  <Input type="number" placeholder="Charge" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button type="link" onClick={() => remove(name)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block>
              Add Charge
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default ChargesForm;

import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

const DiscountsForm = () => (
  <>
    <h3>Discounts:</h3>
    <Form.List name="discounts">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Row key={key} gutter={16}>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'discountType']}
                  fieldKey={[fieldKey, 'discountType']}
                  rules={[{ required: true, message: 'Missing discount type' }]}
                >
                  <Input placeholder="Discount Type" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'discount']}
                  fieldKey={[fieldKey, 'discount']}
                  rules={[{ required: true, message: 'Missing discount' }]}
                >
                  <Input type="number" placeholder="Discount" />
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
              Add Discount
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default DiscountsForm;

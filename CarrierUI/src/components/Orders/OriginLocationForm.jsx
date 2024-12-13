import React from "react";
import { Form, Input, Row, Col, DatePicker, TimePicker, message } from "antd";
import dayjs from "dayjs";
import AutocompleteAddressInput from "../common/AutocompleteAddressInput";

const OriginLocationForm = () => {
  const [form] = Form.useForm();

  return (
    <>
      <h3>Origin Location:</h3>
      <Form form={form}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Street" name="originStreet">
              <AutocompleteAddressInput
                streetValue={form.getFieldValue('originStreet')}
                onStreetChange={(value) => form.setFieldsValue({ originStreet: value })}
                onCityChange={(value) => form.setFieldsValue({ originCity: value })}
                onStateChange={(value) => form.setFieldsValue({ originState: value })}
                onCountryChange={(value) => form.setFieldsValue({ originCountry: value })}
                onPostalCodeChange={(value) => form.setFieldsValue({ originPostalCode: value })}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="City" name="originCity">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="State" name="originState">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item label="Country" name="originCountry">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Pickup Date"
              name="pickupDate"
              rules={[{ required: true, message: "Pickup date is required!" }]}
            >
              <DatePicker 
                format="YYYY-MM-DD" 
                onChange={(date) => {
                  if (date && !dayjs(date).isValid()) {
                    message.error("Invalid date selected");
                  }
                }} 
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Pickup Time" name="pickupTime">
              <TimePicker />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Pickup PO" name="pickupPO">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Postal Code" name="originPostalCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Phone" name="originPhone">
              <Input />
            </Form.Item>
          </Col>
        </Row><br></br>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Shipper Notes" name="shipperNotes">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Packages" name="originPackages">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Weight (LBS)" name="originWeight">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Dimensions (L x W x H)" name="originDimensions">
              <Input placeholder="e.g. 10x10x10" />
            </Form.Item>
          </Col>
        </Row>
        <br></br><br></br>
      </Form>
    </>
  );
};

export default OriginLocationForm;

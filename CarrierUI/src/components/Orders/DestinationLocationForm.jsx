import React from "react";
import { Form, Input, Row, Col, DatePicker, TimePicker, message } from "antd";
import dayjs from "dayjs";
import AutocompleteAddressInput from "../common/AutocompleteAddressInput";

const DestinationLocationForm = () => {
  const [form] = Form.useForm();

  return (
    <>
      <h3>Destination Location:</h3>
      <Form form={form}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Street" name="destinationStreet">
              <AutocompleteAddressInput
                streetValue={form.getFieldValue("destinationStreet")}
                onStreetChange={(value) =>
                  form.setFieldsValue({ destinationStreet: value })
                }
                onCityChange={(value) =>
                  form.setFieldsValue({ destinationCity: value })
                }
                onStateChange={(value) =>
                  form.setFieldsValue({ destinationState: value })
                }
                onCountryChange={(value) =>
                  form.setFieldsValue({ destinationCountry: value })
                }
                onPostalCodeChange={(value) =>
                  form.setFieldsValue({ destinationPostalCode: value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="City" name="destinationCity">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="State" name="destinationState">
              <Input />
            </Form.Item>
          </Col>
        </Row><br></br>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item label="Country" name="destinationCountry">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Delivery Date"
              name="deliveryDate"
              rules={[
                { required: true, message: "Delivery date is required!" },
              ]}
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
            <Form.Item label="Delivery Time" name="deliveryTime">
              <TimePicker />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Delivery PO" name="deliveryPO">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Postal Code" name="destinationPostalCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Phone" name="destinationPhone">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <br></br>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Delivery Notes" name="deliveryNotes">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Packages" name="destinationPackages">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Weight (LBS)" name="destinationWeight">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Dimensions (L x W x H)"
              name="destinationDimensions"
            >
              <Input placeholder="e.g. 10x10x10" />
            </Form.Item>
          </Col>
        </Row><br></br><br></br>
      </Form>
    </>
  );
};

export default DestinationLocationForm;

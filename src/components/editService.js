import { useEffect, useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { updateServiceInfo, getServicesbyId } from "../services/service";

const { Title, Text } = Typography;

function EditService({ servId, closeModal }) {
  const [form] = Form.useForm();
  const [serviceInfo, setServiceInfo] = useState([]);

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const sendService = async (serviceInfo) => {
    try {
      const { data } = await updateServiceInfo(localStorage.getItem("servId"));
      setServiceInfo(data);
      closeModal();
      localStorage.removeItem("servId");
      message.success("Service have been updated");
    } catch (error) {
      console.dir(error);
      message.error("Error");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={sendService}>
      <Typography.Title level={1}>Service</Typography.Title>
      <Form.Item name="origin" label="Origin:">
        <Input name="origin" type="date" placeholder="Start Date" />
      </Form.Item>
      <Form.Item name="origin_floor" label="Origin Floor:">
        <Input name="end_Date" type="date" placeholder="End Date:" />
      </Form.Item>
      {/* <Text>Status: {status}</Text> */}
      {/* {status === "Complete" && ( */}
      <Form.Item name="rating" label="Rating:">
        {/* <Rate allowHalf defaultValue={data.rating} />*/}
      </Form.Item>
      {/* )} */}
      {/* {addresses && ( */}
      <Form.Item name="addresses" label="Addresses">
        <Text>
          {/* <Link to={`/addresses/${data.addresses}`}>Record</Link> */}
        </Text>
      </Form.Item>
      {/* )} */}
      <Form.Item name="items" label="Items">
        <Text>{/* <Link to="/items/">Record</Link> */}</Text>
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Save
      </Button>
    </Form>
  );
}

export default EditService;

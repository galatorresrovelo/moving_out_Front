import { Button, Form, Input, message } from "antd";
import { createAddresses } from "../services/addresses";
import useLocalStorage from "../hooks/useLocalStorage";

function CreateAddressesForm({ closeModal }) {
  const [form] = Form.useForm();
  const [address, setAddress] = useLocalStorage(null, "addresses");
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

  const sendAddresses = async (address) => {
    try {
      const { data } = await createAddresses({
        ...address,
        service: localStorage.getItem("servId"),
      });
      setAddress(data);
      closeModal();
      localStorage.removeItem("servId");
      message.success("Addresses have been created");
    } catch (error) {
      console.log(error);
      message.error("Error");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={sendAddresses}>
      <Form.Item name="origin" label="Origin Address:">
        <Input />
      </Form.Item>
      <Form.Item name="origin_floor" label="Origin Floor:">
        <Input />
      </Form.Item>
      <Form.Item name="destination" label="Destination Address:">
        <Input />
      </Form.Item>
      <Form.Item name="destination_floor" label="Destination Floor:">
        <Input />
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Save
      </Button>
    </Form>
  );
}

export default CreateAddressesForm;

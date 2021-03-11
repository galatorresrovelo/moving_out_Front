import { Button, Form, message, Select, Input } from "antd";
import { createExtraServices } from "../services/extraservices";
import useLocalStorage from "../hooks/useLocalStorage";

const { Option } = Select;
const { TextArea } = Input;

function CreateExtraServForm({ closeModal }) {
  const [form] = Form.useForm();
  const [extraservice, setExtraservice] = useLocalStorage(
    null,
    "extraservices"
  );
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

  const sendExtraServ = async (extraservice) => {
    try {
      const { data } = await createExtraServices({
        ...extraservice,
        service: localStorage.getItem("servId"),
      });
      setExtraservice(data);
      closeModal();
      localStorage.removeItem("servId");
      message.success("Extra services have been created");
    } catch (error) {
      console.dir(error);
      message.error("Error");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={sendExtraServ}>
      <Form.Item name="type" label="Type:">
        <Select
          showSearch
          placeholder="Select a type"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Painting">Painting</Option>
          <Option value="Carpenter">Carpenter</Option>
          <Option value="Cleaning">Cleaning</Option>
          <Option value="Plumber">Plumber</Option>
          <Option value="Electrician">Electrician</Option>
          <Option value="N/A">N/A</Option>
        </Select>
      </Form.Item>
      <Form.Item name="description" label="Description:">
        <TextArea rows={4} />
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Save
      </Button>
    </Form>
  );
}

export default CreateExtraServForm;

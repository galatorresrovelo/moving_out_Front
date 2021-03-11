import { useState } from "react";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { createItems, updateItemsInfo } from "../services/items";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const { Option } = Select;

function CreateItemsForm({ servId, closeModal }) {
  const [form] = Form.useForm();
  const [item, setItem] = useLocalStorage(null, "items");
  const [loading, setLoading] = useState(false);

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeImg = async (file) => {
    const fdata = new FormData();
    fdata.append("file", file);
    //                                            cloudname 👇    👇 tipo de recurso
    const cloudinaryApi =
      "https://api.cloudinary.com/v1_1/drugv5pqc/image/upload";
    fdata.append("upload_preset", "moving_out");
    setLoading(true);
    const { data } = await axios.post(cloudinaryApi, fdata);
    console.dir(data);
    const { data: value } = await createItems(data.secure_url);
    setLoading(false);
    setItem(value);
  };

  const sendItems = async (item) => {
    try {
      const { data } = await createItems({
        ...item,
        service: localStorage.getItem("servId"),
      });
      setItem(data);
      closeModal();
      localStorage.removeItem("servId");
      message.success("Item has been created");
    } catch (error) {
      console.dir(error);
      message.error("Error");
    }
  };

  return (
    <Form form={form} onFinish={sendItems} layout="vertical">
      <Form.Item name="name" label="Item Name:">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description:">
        <Input />
      </Form.Item>
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
          <Option value="Furniture">Furniture</Option>
          <Option value="Home appliances">Home appliance</Option>
          <Option value="Electronic">Electronic</Option>
          <Option value="Fragile">Fragile</Option>
        </Select>
      </Form.Item>
      <Form.Item name="height" label="Item Height:">
        <Input />
      </Form.Item>
      <Form.Item name="width" label="Item Width:">
        <Input />
      </Form.Item>
      <Form.Item name="weight" label="Item Weight:">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="Image">
        <Upload
          name="avatar"
          showUploadList={false}
          beforeUpload={handleChangeImg}
          listType="picture-card"
          className="avatar-uploader"
        >
          {uploadButton}
        </Upload>
      </Form.Item>
      <Button type="primary" block htmlType="submit">
        Save
      </Button>
    </Form>
  );
}

export default CreateItemsForm;

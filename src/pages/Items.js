import { useState, useEffect } from "react";
import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  message,
  Steps,
  Select,
  Input,
  Upload,
  Switch,
} from "antd";
import { createItems, getItemsId, updateItems } from "../services/items";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";
import "../App.css";

const { Step } = Steps;
const { Option } = Select;

function ItemsForm(props) {
  const [form] = Form.useForm();
  const [item, setItem] = useLocalStorage(null, "items");
  const [dataitem, setDataitem] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = props.match.params;

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getItemsId(id);
        setItem(data);
        console.log("888888", item);
      } catch (error) {
        console.log("fallo", error);
      }
    }
    if (id != null && id != undefined) loadData();
  }, []);

  function handleChange(name, value) {
    setDataitem({ ...dataitem, [name]: value });
    console.log(dataitem);
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
    //
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

  const sendItems = async (onFinishItem) => {
    const action = id ? updateItems : createItems;
    const params = id
      ? { ...item, id }
      : { ...onFinishItem, service: localStorage.getItem("servId") };
    try {
      await action(params);
      setItem({ Items: { item } });
      message.success("Item has been created");
      history.push("/extraservices");
    } catch (error) {
      //message.error("Error");
      console.log(error);
    }
  };

  const sendItemsandNew = async () => {
    try {
      const { data } = await createItems({
        ...item,
        service: localStorage.getItem("servId"),
      });
      setItem({ Items: { data } });
      history.push("/items");
      message.success("Item has been created");
    } catch (error) {
      console.log(error);
      message.error("Error");
    }
  };

  return (
    <div className="Steps">
      <Steps size="small" current={2} title="Process">
        <Step title="Step 1" description="Create a new Service" />
        <Step
          title="Step 2"
          description="Add origin and destination addresses"
        />
        <Step title="Step 3" description="Add items to move" />
        <Step title="Optional" description="Add Extra services" />
        <Step title="Finish" />
      </Steps>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={{ span: 8, offset: 8 }}>
          <Typography.Title level={1}>Items</Typography.Title>
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Item Name:">
              <Input
                //defaultValue={item["name"] ? item["name"] : ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="description" label="Description:">
              <Input
                //defaultValue={item["description"] ? item["description"] : ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="type" label="Type:">
              <Select
                showSearch
                //defaultValue={item["type"] ? item["type"] : ""}
                placeholder="Select a type"
                optionFilterProp="children"
                onChange={(e) => handleChange("type", e)}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Furniture">Furniture</Option>
                <Option value="Home appliances">Home appliances</Option>
                <Option value="Electronic">Electronic</Option>
                <Option value="Fragile">Fragile</Option>
              </Select>
            </Form.Item>
            <Form.Item name="height" label="Item Height:">
              <Input
                // defaultValue={item["height"] ? item["height"] : ""}
                onChange={(e) => handleChange("height", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="width" label="Item Width:">
              <Input
                // defaultValue={item["width"] ? item["width"] : ""}
                onChange={(e) => handleChange("width", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="weight" label="Item Weight:">
              <Input
                // defaultValue={item["weight"] ? item["weight"] : ""}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="plaster" label="Plaster:">
              <Switch
                // defaultValue={item["plaster"] ? item["plaster"] : ""}
                onChange={(e) => handleChange("plaster", e.target)}
              ></Switch>
            </Form.Item>
            <Form.Item name="url" label="Image">
              <Upload
                name="url"
                showUploadList={false}
                beforeUpload={handleChangeImg}
                listType="picture-card"
                className="url-uploader"
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            <Button type="primary" block onClick={() => sendItems()}>
              Save
            </Button>
            <Button type="primary" block onClick={() => sendItemsandNew()}>
              Save and New
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ItemsForm;

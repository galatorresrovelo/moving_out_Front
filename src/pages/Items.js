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
  Avatar,
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
  const [item, setItem] = useLocalStorage({}, "items");
  const [dataitem, setDataitem] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = props.match.params;

  useEffect(() => {
    console.log("ddddd", id);
    async function loadData() {
      try {
        const { data } = await getItemsId(id);
        console.log("eeeeee", data);
        setItem(data);
        console.log("fffff", item);
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
    setLoading(false);
  };

  const sendItems = async () => {
    const action = id ? updateItems : createItems;
    const params = id
      ? { ...item, id }
      : { ...dataitem, service: localStorage.getItem("servId") };
    try {
      await action(params);
      setItem({ Items: { dataitem } });
      message.success("Item has been saved");
      if (id) {
        history.push("/myservices");
      } else {
        history.push("/extraservices");
      }
    } catch (error) {
      //message.error("Error");
      console.log(error);
    }
  };

  const sendItemsandNew = async () => {
    const action = id ? updateItems : createItems;
    const params = id
      ? { ...item, id }
      : { ...dataitem, service: localStorage.getItem("servId") };
    try {
      await action(params);
      setItem({ Items: { dataitem } });
      message.success("Item has been saved");
      if (id) {
        history.push("/myservices");
      } else {
        history.push("/extraservices");
      }
    } catch (error) {
      //message.error("Error");
      console.log(error);
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
                defaultValue={item["name"] ? item["name"] : ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="description" label="Description:">
              <Input
                defaultValue={item["description"] ? item["description"] : ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="type" label="Type:">
              <Select
                showSearch
                defaultValue={item["type"] ? item["type"] : ""}
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
            <Form.Item form={form} name="height" label="Item Height:">
              <Input
                defaultValue={item["height"] ? item["height"] : ""}
                onChange={(e) => handleChange("height", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="width" label="Item Width:">
              <Input
                defaultValue={item["width"] ? item["width"] : ""}
                onChange={(e) => handleChange("width", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="weight" label="Item Weight:">
              <Input
                defaultValue={item["weight"] ? item["weight"] : ""}
                onChange={(e) => handleChange("weight", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="plaster" label="Plaster:">
              <Switch
                defaultValue={item["plaster"] ? item["plaster"] : ""}
                onChange={(e) => handleChange("plaster", e.target)}
              ></Switch>
            </Form.Item>
            {item.url && (
              <Form.Item name="url" label="Item Image:">
                <Avatar size={80} src={item.url} />
              </Form.Item>
            )}
            {!item.url && (
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
            )}
            <Form.Item>
              <Button type="primary" block onClick={() => sendItems()}>
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block onClick={() => sendItemsandNew()}>
                Save and New
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ItemsForm;

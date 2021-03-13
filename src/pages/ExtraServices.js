import React, { useEffect } from "react";
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
} from "antd";
import {
  createExtraServices,
  getExtraServId,
  updateExtraServInfo,
} from "../services/extraservices";
import { useHistory, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "../App.css";
import { useState } from "react";

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

function ExtraServicesForm() {
  const [form] = Form.useForm();
  const [extraservice, setExtraservice] = useLocalStorage({}, "extraservices");
  const [dataeserv, setDataeserv] = useState({});
  const history = useHistory();
  const { id } = useParams();

  function handleChange(name, value) {
    setDataeserv({ ...dataeserv, [name]: value });
    console.log(dataeserv);
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

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getExtraServId(id);
        setExtraservice(data);
      } catch (error) {
        console.log("fallo", error);
      }
    }
    if (id != null && id != undefined) loadData();
  }, []);

  async function sendExtraservices() {
    const action = id ? updateExtraServInfo : createExtraServices;
    const params = id
      ? { ...dataeserv, id }
      : { ...dataeserv, service: localStorage.getItem("servId") };
    try {
      await action(params);
      message.success("Extra Service has been saved");
      setExtraservice({ extraservices: { dataeserv } });
      if (id) {
        history.push("/myservices");
      } else {
        history.push("/finish");
      }
    } catch (error) {
      //message.error(error.response.data.message);
      console.log(error);
    }
  }

  async function sendExtraservicesandNew() {
    console.log("666666", dataeserv);
    const action = id ? updateExtraServInfo : createExtraServices;
    const params = id
      ? { ...dataeserv, id }
      : { ...dataeserv, service: localStorage.getItem("servId") };
    try {
      await action(params);
      message.success("Extra Service has been saved");
      setExtraservice({ extraservices: { dataeserv } });
      if (id) {
        history.push("/myservices");
      } else {
        history.push("/extraservices");
      }
    } catch (error) {
      //message.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <div className="Steps">
      <Steps size="small" current={3} title="Process">
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
          <Typography.Title level={1}>Extra Services</Typography.Title>
          <Form form={form} layout="vertical">
            <Form.Item name="type" label="Type:">
              <Select
                showSearch
                name="type"
                defaultValue={extraservice["type"] ? extraservice["type"] : ""}
                placeholder="Select a type"
                optionFilterProp="children"
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
                <Option value="Painting">Painting</Option>
                <Option value="Carpenter">Carpenter</Option>
                <Option value="Cleaning">Cleaning</Option>
                <Option value="Plumber">Plumber</Option>
                <Option value="Electrician">Electrician</Option>
                <Option value="N/A">N/A</Option>
              </Select>
            </Form.Item>
            <Form.Item name="description" label="Description:">
              <TextArea
                rows={4}
                name="description"
                defaultValue={
                  extraservice["description"] ? extraservice["description"] : ""
                }
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block onClick={() => sendExtraservices()}>
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                onClick={() => sendExtraservicesandNew()}
              >
                Save and New
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ExtraServicesForm;

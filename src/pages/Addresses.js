import React, { useEffect, useState } from "react";
import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  message,
  Steps,
  Input,
} from "antd";
import {
  createAddresses,
  updateAddressesInfo,
  getAddressesId,
} from "../services/addresses";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "../App.css";

const { Step } = Steps;

function AddressesForm(props) {
  const [form] = Form.useForm();
  const [address, setAddress] = useLocalStorage({}, "addresses");
  const [dataaddress, setDataaddress] = useState({});
  const history = useHistory();
  const { id } = props.match.params;

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getAddressesId(id);
        setAddress(data);
      } catch (error) {
        console.log("fallo", error);
      }
    }
    if (id != null && id != undefined) loadData();
  }, []);

  function handleChange(name, value) {
    setDataaddress({ ...dataaddress, [name]: value });
    console.log(dataaddress);
  }

  async function sendAddresses() {
    const action = id ? updateAddressesInfo : createAddresses;
    const params = id
      ? { ...dataaddress, id }
      : { ...dataaddress, service: localStorage.getItem("servId") };
    try {
      await action(params);
      setAddress({ Adresses: { dataaddress } });
      message.success("Addresses have been saved");
      if (id) {
        history.push("/myservices");
      } else {
        history.push("/items");
      }
    } catch (error) {
      console.dir(error);
    }
  }

  return (
    <div className="Steps">
      <Steps size="small" current={1} title="Process">
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
          ,<Typography.Title level={1}>Addresses</Typography.Title>
          <Form form={form} layout="vertical" onFinish={sendAddresses}>
            <Form.Item name="origin" label="Origin Address:">
              <Input
                defaultValue={address["origin"] ? address["origin"] : ""}
                onChange={(e) => handleChange("origin", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="origin_floor" label="Origin Floor:">
              <Input
                defaultValue={
                  address["origin_floor"] ? address["origin_floor"] : ""
                }
                onChange={(e) => handleChange("origin_floor", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="destination" label="Destination Address:">
              <Input
                defaultValue={
                  address["destination"] ? address["destination"] : ""
                }
                onChange={(e) => handleChange("destination", e.target.value)}
              />
            </Form.Item>
            <Form.Item name="destination_floor" label="Destination Floor:">
              <Input
                defaultValue={
                  address["destination_floor"]
                    ? address["destination_floor"]
                    : ""
                }
                onChange={(e) =>
                  handleChange("destination_floor", e.target.value)
                }
              />
            </Form.Item>
            <Button type="primary" block htmlType="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddressesForm;

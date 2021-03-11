import React, { useEffect } from "react";
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
import { getServicesbyId } from "../services/service";
import { useHistory, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "../App.css";
import dayjs from "dayjs";

const { Step } = Steps;
const { Text } = Typography;

function FinalForm(serviceId) {
  const [form] = Form.useForm();
  const [totalserv, setTotalServ] = useLocalStorage(null, "Total_Serv");
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const { data } = await getServicesbyId(localStorage.getItem("servId"));
      console.log("hhhhhhh", data);
      setTotalServ(data);
    }
    loadData();
  }, []);

  const close = () => {
    history.push("/");
    message.success(
      "Your service is completed, you can edit it in My Services"
    );
  };

  return (
    <div className="Steps">
      <Steps size="small" current={4} title="Process">
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
          <Typography.Title level={1}>Final Review</Typography.Title>
          <Form form={form} layout="vertical">
            <Form.Item name="start_Date" label="Start Date:">
              <Input
                defaultValue={dayjs(totalserv.start_Date).format("YYYY-MM-DD")}
                type="date"
                placeholder="Start Date"
              ></Input>
            </Form.Item>
            <Form.Item name="end_Date" label="End Date:">
              <Input
                defaultValue={dayjs(totalserv.end_Date).format("YYYY-MM-DD")}
                type="date"
                placeholder="End Date"
              ></Input>
            </Form.Item>
            <Form.Item name="addresses" label="Addresses:">
              <Text>
                <Link to={`addresses/address/${totalserv.addresses}`}>
                  Record
                </Link>
              </Text>
            </Form.Item>
            {/* {totalserv.items &&
              totalserv.items.map((sub, subindex) => (
                <Form.Item name="items" label="Items:">
                  <Text key={subindex}>{sub.name}</Text>
                </Form.Item>
              ))}
            {totalserv.extra_Services &&
              totalserv.extraservices.map((sub, subindex) => (
                <Form.Item name="extra_Services" label="Extra Services:">
                  <Text key={subindex}>{sub.type}</Text>
                </Form.Item>
              ))} */}
            <Button type="primary" block onClick={close}>
              Finish
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default FinalForm;

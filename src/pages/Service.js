import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  message,
  DatePicker,
  Steps,
} from "antd";
import { createService } from "../services/service";
import { useHistory } from "react-router-dom";
import "../App.css";

const { Step } = Steps;

function Service() {
  const [form] = Form.useForm();
  const history = useHistory();

  async function handleSubmit(serviceInfo) {
    try {
      const { data } = await createService(serviceInfo);
      console.log(data);
      localStorage.setItem("servId", data.service._id);
      message.success("Service created");
      history.push("/addresses");
    } catch (error) {
      message.error(error);
    }
  }

  return (
    <div className="Steps">
      <Steps size="small" current={0} title="Process">
        <Step title="Step 1" description="Create a new Service" />
        <Step
          title="Step 2"
          description="Add origin adn destination addresses"
        />
        <Step title="Step 3" description="Add items to move" />
        <Step title="Optional" description="Add Extra services" />
        <Step title="Finish" />
      </Steps>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={{ span: 8, offset: 8 }}>
          ,<Typography.Title level={1}>Service</Typography.Title>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="start_Date" label="Start Date:">
              <DatePicker style={{ width: "95%" }} />
            </Form.Item>
            <Form.Item name="end_Date" label="End Date:">
              <DatePicker style={{ width: "95%" }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Service;

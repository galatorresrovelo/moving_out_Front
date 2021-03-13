import { useState, useEffect } from "react";
import {
  Form,
  Typography,
  Col,
  Row,
  Button,
  message,
  Input,
  Steps,
} from "antd";
import {
  createService,
  updateServiceInfo,
  getServicesbyId,
} from "../services/service";
import useLocalStorage from "../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import "../App.css";

const { Step } = Steps;

function Service(props) {
  const [form] = Form.useForm();
  const [service, setService] = useLocalStorage({}, "service");
  const [dataservice, setDataservice] = useState({});
  const history = useHistory();
  const { id } = props.match.params;

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getServicesbyId(id);
        console.log("eeeeee", data);
        setService(data);
        console.log("fffff", service);
      } catch (error) {
        console.log("fallo", error);
      }
    }
    if (id != null && id != undefined) loadData();
  }, []);

  function handleChange(name, value) {
    setDataservice({ ...dataservice, [name]: value });
    console.log(dataservice);
  }

  async function handleSubmit(dataservice) {
    const action = id ? updateServiceInfo : createService;
    const params = id ? { ...dataservice, id } : { ...dataservice };
    try {
      const { data } = await action(params);
      setService({ service: { dataservice } });
      localStorage.setItem("servId", data.service._id);
      message.success("Service has been saved");
      if (id) {
        history.push("/myservices");
      } else {
        history.push("/addresses");
      }
    } catch (error) {
      console.dir(error);
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
              <Input
                name="start_Date"
                defaultValue={
                  dayjs(service.start_Date).format("YYYY-MM-DD")
                    ? dayjs(service.start_Date).format("YYYY-MM-DD")
                    : ""
                }
                type="date"
                onChange={(e) => handleChange("start_Date", e.target.value)}
                placeholder="Start Date"
              ></Input>
            </Form.Item>
            <Form.Item name="end_Date" label="End Date:">
              <Input
                name="end_Date"
                defaultValue={
                  dayjs(service.end_Date).format("YYYY-MM-DD")
                    ? dayjs(service.end_Date).format("YYYY-MM-DD")
                    : dataservice.start_Date
                }
                onChange={(e) => handleChange("end_Date", e.target.value)}
                placeholder="End Date:"
                type="date"
              ></Input>
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

import React, { useState, useEffect } from "react";
import {
  Typography,
  Col,
  Row,
  Button,
  Modal,
  Rate,
  Card,
  DatePicker,
  Input,
} from "antd";
import CreateAddressesForm from "../components/CreateAddressesForm";
import CreateItemsForm from "../components/CreateItems";
import CreateExtraServForm from "../components/CreateExtraServ";
import editService from "../components/editService";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getMyServices } from "../services/service";
import { useAuthInfo } from "../hooks/authContext";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Link } from "react-router-dom";
dayjs.extend(LocalizedFormat);

const { Title, Text } = Typography;

function UpdateService() {
  //TODO: Complementar
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAddresses, setShowModalAddresses] = useState(false);
  const [showModalItems, setShowModalItems] = useState(false);
  const [showModalExtraServices, setShowModalExtraServices] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceInfo, setServiceInfo] = useState([]);
  const { user } = useAuthInfo();
  const [id, setId] = useState();

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getMyServices(user.services);
        setServiceInfo(data.services);
      } catch (error) {
        console.log("fallo", error);
      }
    }

    loadData();
  }, []);

  const openModalAddresses = () => setShowModalAddresses(true);
  const closeModalAddresses = () => setShowModalAddresses(false);

  const openModalItems = () => setShowModalItems(true);
  const closeModalItems = () => setShowModalItems(false);

  const openModalExtraServices = () => setShowModalExtraServices(true);
  const closeModalExtraServices = () => setShowModalExtraServices(false);

  const openModalEdit = () => setShowModalEdit(true);
  const closeModalEdit = () => setShowModalEdit(false);

  return (
    <Row gutter={[16, 16]} style={{ overflowY: "scroll" }}>
      <Col xs={24} sm={24} md={{ span: 12 }}>
        {serviceInfo.map((itemServ, index) => (
          <Card key={index} style={{ width: "100%" }}>
            <Title level={1}>Service info:</Title>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Input
                  name="start_Date"
                  value={dayjs(itemServ.start_Date).format("YYYY-MM-DD")}
                  type="date"
                  placeholder="Start Date"
                ></Input>
              </Col>
              <Col span={24}>
                <Input
                  name="end_Date"
                  value={dayjs(itemServ.end_Date).format("YYYY-MM-DD")}
                  type="date"
                  placeholder="End Date:"
                ></Input>
              </Col>
              <Col span={24}>
                <Text>Status: {itemServ.status}</Text>
              </Col>
              {itemServ.addresses && (
                <Col span={24}>
                  <Text>
                    Addresses: {""}
                    <Link to={`/addresses/${itemServ.addresses}`}> Record</Link>
                  </Text>
                </Col>
              )}
              {itemServ.items &&
                itemServ.items.map((sub, subindex) => (
                  <Col span={24}>
                    <Text key={subindex}>
                      Items: {""}
                      <Link to={`/items/${sub}`}>{subindex}</Link>
                    </Text>
                  </Col>
                ))}
              {itemServ.extra_Services &&
                itemServ.extra_Services.map((sub, subindex) => (
                  <Col span={24}>
                    <Text key={subindex}>
                      Extra Services: {""}
                      <Link to={`/extraservices/${sub}`}>{subindex}</Link>
                    </Text>
                  </Col>
                ))}
              {itemServ.status === "Complete" && (
                <Col span={24}>
                  <Rate allowHalf defaultValue={itemServ.rating} />
                </Col>
              )}
              {itemServ.status === "Draft" && (
                <Col span={24}>
                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      localStorage.setItem("servId", itemServ._id);
                      openModalEdit();
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              )}
              {!itemServ.addresses && itemServ.status === "Draft" && (
                <Col span={24}>
                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      localStorage.setItem("servId", itemServ._id);
                      openModalAddresses();
                    }}
                  >
                    Add Addresses
                  </Button>
                </Col>
              )}
              <br />
              {itemServ.status === "Draft" && (
                <Col span={24}>
                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      localStorage.setItem("servId", itemServ._id);
                      openModalItems();
                    }}
                  >
                    Add Items
                  </Button>
                </Col>
              )}
              <br />
              {itemServ.status === "Draft" && (
                <Col span={24}>
                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      localStorage.setItem("servId", itemServ._id);
                      openModalExtraServices();
                    }}
                  >
                    Add Extra Services
                  </Button>
                </Col>
              )}
              <br />
            </Row>
          </Card>
        ))}
      </Col>
      {!user.services === null && serviceInfo.length && (
        <Col xs={24} sm={24} md={{ span: 12 }}>
          <Card style={{ width: "100%" }}>
            <Title level={1}>Service info:</Title>
            <Row>
              <Col span={24}>
                <Title level={5}>
                  Start Date:{" "}
                  <DatePicker
                    style={{ width: "95%" }}
                    defaultValue={serviceInfo.start_Date}
                  />
                </Title>
                <Title level={5}>
                  End Date:{" "}
                  <DatePicker
                    style={{ width: "95%" }}
                    defaultValue={serviceInfo.end_Date}
                  />
                </Title>
              </Col>
              {serviceInfo.status === "Complete" && (
                <Col span={12}>
                  <Title level={5}>Rating:</Title>
                  <Rate
                    defaultValue={serviceInfo.rating}
                    disabled
                    style={{ borderWidth: 1 }}
                  />
                </Col>
              )}
            </Row>
          </Card>
        </Col>
      )}
      <Modal
        title="Edit"
        onCancel={closeModalEdit}
        visible={showModalEdit}
        footer={false}
      >
        <editService servId={id} closeModal={closeModalEdit} />
      </Modal>
      <Modal
        title="Addresses Info"
        onCancel={closeModalAddresses}
        visible={showModalAddresses}
        footer={false}
      >
        <CreateAddressesForm servId={id} closeModal={closeModalAddresses} />
      </Modal>
      <Modal
        title="Items Info"
        onCancel={closeModalItems}
        visible={showModalItems}
        footer={false}
      >
        <CreateItemsForm servId={id} closeModal={closeModalItems} />
      </Modal>
      <Modal
        title="Extra Services Info"
        onCancel={closeModalExtraServices}
        visible={showModalExtraServices}
        footer={false}
      >
        <CreateExtraServForm servId={id} closeModal={closeModalExtraServices} />
      </Modal>
    </Row>
  );
}

export default UpdateService;

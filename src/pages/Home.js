import { Col, Row, Card, Button, Typography, Skeleton } from "antd";
import ReactPlayer from "react-player";
import "../App.css";
const { Title, Text } = Typography;

function Home() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title>How we work?</Title>
      </Col>
      <ReactPlayer url="https://youtu.be/4jwpzPh7Uts" />
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Card>
          <Title level={1}> Instructions: </Title>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Text>
                <>
                  <h5>#1 Create your Service</h5>
                  <h5>#2 Create your Addresses</h5>
                  <p>
                    **Specify the origin address and the destination address to
                    tranport all items***
                  </p>
                  <h5>#3 Add all the items you need to move</h5>
                  <p>**Plaster service will be charge as an extra**</p>
                  <h5>***Optional*** Add any Extra Services you might need</h5>
                </>
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Home;

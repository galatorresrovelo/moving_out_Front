import { Col, Row, Card, Button, Typography, Skeleton } from "antd";
import ReactPlayer from "react-player";
import "../App.css";
const { Title, Text } = Typography;

function Home() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title>Plan your move out....</Title>
      </Col>
      <ReactPlayer url="https://youtu.be/4jwpzPh7Uts" />
      <Col xs={{ span: 24 }} md={{ span: 8 }}>
        <Card>
          <Title level={1}>
            {" "}
            10 Ways to Simplify your apartment/house move{" "}
          </Title>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Text>
                <>
                  <h5>#1 Change your Address</h5>
                  <p>
                    Once you’ve signed your lease, the apartment move is on, so
                    make it official.
                  </p>
                  <h5>#2 Call your providers</h5>
                  <p>
                    Call your internet, cable, and utility providers. Schedule
                    cancellation at your current address for the day after the
                    move and have the lights and heat turned on at your new
                    place the day before the move.
                  </p>
                  <h5>#3 Let your friends know you're moving</h5>
                  <h5>#4 Schedule the movers</h5>
                  <p>Create your account and service with us.</p>
                  <h5>#5 Take stock of your things</h5>
                  <p>
                    This could be the hardest part of any move, but energy
                    invested here will streamline the entire moving process.
                    Begin with the largest pieces. If they won’t fit into your
                    new place, sell or donate them. For smaller items like
                    books, clothes, and knick-knacks, discard every item that
                    does not bring you joy.
                  </p>
                  <h5>#6 Host a fabulous yard sale</h5>
                  <p>
                    Simplify any yard sale with this easy tip: except for the
                    high-dollar items (in yard sale terms, this means anything
                    you’re selling for $10 or more), put everything on one table
                    with a “$1 each!” sign.
                  </p>
                  <h5>#7 Pack for the first few days</h5>
                  <p>
                    Pack a suitcase with some clothes, shower and beauty items,
                    medicine and vitamins, pajamas, and your favorite pillow
                  </p>
                  <h5>#8 Pack by room and use layers</h5>
                  <p>
                    For each room, choose the items you will need right away.
                  </p>
                  <h5>#9 Move your clothes the easy way</h5>
                  <p>Leave your clothes on the hangers.</p>
                  <h5>#10 Treat your friends like rock stars</h5>
                  <p>
                    LIf your friends are helping with your apartment move, make
                    it a great day for everyone.
                  </p>
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

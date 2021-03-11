import { useState, useEffect } from "react";
import { useAuthInfo } from "../hooks/authContext";
import {
  Typography,
  Col,
  Row,
  Avatar,
  Button,
  Upload,
  Card,
  Input,
  message,
} from "antd";
import { updateAvatar } from "../services/auth";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

function Profile() {
  const history = useHistory();
  const { user, setUser } = useAuthInfo();
  const [loading, setLoading] = useState(false);
  const [datauser, setDatauser] = useState({});

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  function onChange(name, value) {
    setDatauser({ ...datauser, [name]: value });
    console.log(datauser);
  }

  const handleChange = async (file) => {
    const fdata = new FormData();
    fdata.append("file", file);
    //                                            cloudname 👇    👇 tipo de recurso
    const cloudinaryApi =
      "https://api.cloudinary.com/v1_1/drugv5pqc/image/upload";
    fdata.append("upload_preset", "moving_out");
    setLoading(true);
    const { data } = await axios.post(cloudinaryApi, fdata);
    const { data: user } = await updateAvatar(data.secure_url);
    setLoading(false);
    setUser(user);
  };

  const updateUser = async (userInfo) => {
    try {
      const { data } = await updateUser(userInfo);
      setUser(data);
      message.success("User Updated");
      history.push("/myservices");
    } catch (error) {
      //message.error(error);
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={{ span: 12 }}>
        <Card style={{ width: "100%" }}>
          <Title level={1}>Profile:</Title>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Avatar size={80} src={user.avatar} />
            </Col>
            <Col span={24}>
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={handleChange}
                listType="picture-card"
                className="avatar-uploader"
              >
                {uploadButton}
              </Upload>
            </Col>
            <Col span={24}>
              <Input
                defaultValue={user.username}
                placeholder="Username:"
                onChange={(e) => onChange("username", e.target.value)}
              ></Input>
            </Col>
            <Col span={24}>
              <Input
                defaultValue={user.phone}
                placeholder="Phone:"
                onChange={(e) => onChange("phone", e.target.value)}
              ></Input>
            </Col>
            <Col span={24}>
              <Button type="primary" block onClick={() => updateUser()}>
                Save
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Profile;

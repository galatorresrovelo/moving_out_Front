import { Layout, Menu, Avatar } from "antd";
import {
  CarOutlined,
  LogoutOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "../App.css";
import { useAuthInfo } from "../hooks/authContext";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutApp = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthInfo();
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        style={{ height: "100vh", paddingTop: "14px" }}
      >
        <div className="logo">
          <Link to="/">
            <img
              src="https://cdn2.steamgriddb.com/file/sgdb-cdn/logo_thumb/26e3dcb90aa10011db5b660c463f325f.png"
              alt="Moving_out"
              width="50%"
            />
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {user && (
            <>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">
                  <Link to="/profile">
                    <Avatar alt="avatar" src={user.avatar} size="small" />
                    &nbsp; Profile
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/myservices">My Services</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreAddOutlined />} title="New">
                <Menu.Item key="5" icon={<CarOutlined />}>
                  <Link to="/service"></Link>Service
                </Menu.Item>
              </SubMenu>
              <Menu.Item
                key="8"
                icon={<LogoutOutlined />}
                title="Logout"
                onClick={() => logout()}
              >
                LogOut
              </Menu.Item>
            </>
          )}
          {!user && (
            <>
              <Menu.Item key="9" icon={<LoginOutlined />} title="Login">
                <Link to="/login">LogIn</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<UserAddOutlined />} title="Signup">
                <Link to="/signup">SignUp</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              overflowY: "scroll",
              maxHeight: "80vh",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Moving Out ©2021</Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;

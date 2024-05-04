import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  ContactsOutlined,
  UserOutlined, 
  BankOutlined,
} from '@ant-design/icons';

import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState("/admin/dashboard")
  const {pathname} = useLocation()

  useEffect(
    () =>{
      setKey(pathname)
    },[pathname]
  )


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{height: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{color: "white", fontSize: '24px', marginBottom: '10px'}} >Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={key}
          items={[
            {
              key:"/",
              icon: <BankOutlined />,
              label: <Link to='/'>Home</Link>
            },
            {
              key: '/admin/dashboard',
              icon: <ContactsOutlined />,
              label: <Link to='/admin/dashboard'>Dashboard</Link>,
            },
            {
              key: '/admin/teachers',
              icon: <UserOutlined /> ,
              label: <Link to="/admin/teachers">Teahcers</Link>,
            },
            {
              key: '/admin/students',
              icon: <UploadOutlined />,
              label: <Link to="/admin/students">Students</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: `1px solid ${borderRadiusLG}`
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            height: "100vh",
            overflowY: 'scroll',
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
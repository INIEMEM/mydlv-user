import React from "react";
import { Layout, Menu, Badge } from "antd";
import {
  HomeOutlined,
  BellOutlined,
  ShoppingOutlined,
  CarOutlined,
  OrderedListOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"; 

const { Header, Sider, Content, Footer } = Layout;

export default function DashboardLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { key: "explore", icon: <HomeOutlined />, label: "Explore" },
    { key: "notifications", icon: <BellOutlined />, label: "Notifications" },
    { key: "shopping-list", icon: <ShoppingOutlined />, label: "Shopping List" },
    { key: "rider", icon: <CarOutlined />, label: "My Rider" },
    { key: "orders", icon: <OrderedListOutlined />, label: "My Orders" },
    { key: "services", icon: <ToolOutlined />, label: "My Services" },
    { key: "support", icon: <QuestionCircleOutlined />, label: "Support" },
  ];

  const bottomMenu = [
    { key: "explore", icon: <HomeOutlined />, label: "Explore" },
    { key: "rider", icon: <CarOutlined />, label: "My Rider" },
    { key: "orders", icon: <OrderedListOutlined />, label: "Orders" },
    { key: "services", icon: <ToolOutlined />, label: "Services" },
  ];

  return (
    <Layout className="min-h-screen font-poppins bg-gray-50">
      {/* 🧭 Sidebar for Desktop */}
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block fixed h-screen"
        theme="light"
        width={220}
        
      >
        {/* <div className="flex justify-center items-center py-6">
          <img src={Logo} alt="Logo" className="w-32" />
        </div> */}
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          selectedKeys={[location.pathname.split("/")[1] || "explore"]}
          items={menuItems}
          className="border-none text-gray-700"
          onClick={({ key }) => navigate(`/${key}`)} 
        />
      </Sider>

      {/* 🟩 Main Layout */}
      <Layout className="main-layout ml-0 lg:ml-[220px]">
        {/* Header */}
        <Header className="bg-white shadow-sm px-6 flex justify-between items-center sticky top-0 z-50">
          <img src={Logo} alt="logo" className="w-28 md:w-32" />
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <WalletOutlined className="text-[#37B34A] text-lg" />
              <span className="font-medium">₦500,000.00</span>
            </div>
            <Badge count={2} size="small">
              <ShoppingCartOutlined className="text-xl text-gray-700" />
            </Badge>
          </div>
        </Header>

        {/* Content */}
        <Content className="p-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className=" p-4 min-h-[75vh]"
          >
            <Outlet />
          </motion.div>
        </Content>

        {/* Footer */}
        <Footer className="text-center text-gray-500 bg-white shadow-inner">
          © {new Date().getFullYear()} MyDLV. All rights reserved.
        </Footer>
      </Layout>

      {/* 📱 Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-t border-t flex justify-around py-2 z-50">
        {bottomMenu.map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(`/${item.key}`)}
            className={`flex flex-col items-center text-xs ${
              location.pathname.includes(item.key)
                ? "text-[#37B34A]"
                : "text-gray-500"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}

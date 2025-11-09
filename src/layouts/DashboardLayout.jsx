import React from "react";
import { Layout, Menu, Badge, Dropdown, Button } from "antd";
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
  EnvironmentOutlined,
  DownOutlined,
  AppleOutlined,
  AndroidOutlined,
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

  const locationMenu = (
    <Menu
      items={[
        { key: "uyo", label: "Uyo" },
        { key: "lagos", label: "Lagos" },
        { key: "abuja", label: "Abuja" },
      ]}
    />
  );

  return (
    <Layout className="min-h-screen font-poppins">
      {/* 🧭 Sidebar for Desktop */}
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block fixed h-screen bg-[#e8e8e8] border-r border-gray-200"
        theme="light"
        width={240}
      >
        <div className="flex justify-center items-center py-6 border-b border-gray-200">
          <img src={Logo} alt="Logo" className="w-28" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split("/")[1] || "explore"]}
          items={menuItems}
          className="custom-menu border-none text-gray-700 bg-[#e8e8e8] mt-4"
          onClick={({ key }) => navigate(`/${key}`)}
          style={{
            fontSize: "15px",
           
          }}
        />
        <style jsx>{`
          .custom-menu .ant-menu-item-selected {
            background-color: transparent !important;
            color: #000 !important;
          }
          .custom-menu .ant-menu-item-selected::after {
            border-right: 3px solid #000 !important;
          }
          .custom-menu .ant-menu-item:hover {
            color: #000 !important;
          }
        `}</style>
      </Sider>

      {/* 🟩 Main Layout */}
      <Layout className="main-layout ml-0 lg:ml-[240px]">
        {/* Header */}
        <Header className="bg-[#e8e8e8] shadow-sm px-6 flex justify-between items-center sticky top-0 z-50 h-[72px]">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="logo" className="w-28 md:w-32 lg:hidden" />
            <Dropdown overlay={locationMenu} trigger={["click"]}>
              <Button
                type="text"
                className="hidden lg:flex items-center gap-2 text-gray-700 font-medium bg-white py-6"
              >
                <EnvironmentOutlined className="text-[#37B34A]" />
                Home
                <DownOutlined className="text-xs" />
              </Button>
            </Dropdown>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg">
              <span className="text-gray-600 text-sm">Wallet Balance</span>
              <WalletOutlined className="text-[#37B34A] text-lg" />
              <span className="font-semibold text-gray-800">₦500,000.00</span>
            </div>
            <Badge count={2} size="small" offset={[-5, 5]}>
              <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
            </Badge>
          </div>
        </Header>

        {/* Content */}
        <Content className="p-0 bg-[#e8e8e8] min-h-[calc(100vh-72px-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 md:p-6"
          >
            <Outlet />
          </motion.div>
        </Content>

        {/* Footer */}
        <Footer className=" border-t border-gray-200 py-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo & About */}
            <div className="col-span-2 md:col-span-1">
              <img src={Logo} alt="MyDLV" className="w-32 mb-4" />
              <p className="text-gray-600 text-sm">
                Your trusted delivery and service platform
              </p>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    About MYDLV
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Term & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-use" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Terms of use
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/vendor" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Become a vendor
                  </a>
                </li>
                <li>
                  <a href="/rider" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Become a Rider
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Locations & Apps */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Locations</h3>
              <ul className="space-y-2 mb-4">
                <li>
                  <a href="/uyo" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Uyo
                  </a>
                </li>
                <li>
                  <a href="/lagos" className="text-gray-600 hover:text-[#37B34A] text-sm">
                    Lagos
                  </a>
                </li>
              </ul>
              <h3 className="font-semibold text-gray-800 mb-3 mt-6">Our Apps</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-800 transition-colors"
                >
                  <AndroidOutlined className="text-base" />
                  <div>
                    <div className="text-[10px]">Get it On</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-800 transition-colors"
                >
                  <AppleOutlined className="text-base" />
                  <div>
                    <div className="text-[10px]">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-gray-200">
            © {new Date().getFullYear()} MyDLV. All rights reserved.
          </div>
        </Footer>
      </Layout>

      {/* 📱 Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around py-3 z-50">
        {menuItems.slice(0, 4).map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(`/${item.key}`)}
            className={`flex flex-col items-center text-xs cursor-pointer transition-colors ${
              location.pathname.includes(item.key)
                ? "text-[#37B34A]"
                : "text-gray-500"
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[11px]">{item.label}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}

<style jsx global>{`
  /* 🔹 Active (selected) menu item */
  .custom-menu .ant-menu-item-selected {
    background-color: #37b34a20 !important; /* subtle green tint */
    color: #37b34a !important;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(55, 179, 74, 0.25); /* 👈 greenish soft shadow */
    border-radius: 8px; /* optional - makes it look smooth */
    transition: all 0.3s ease;
  }

  /* 🔹 Remove default blue border on the left */
  .custom-menu .ant-menu-item-selected::after {
    border-right: 3px solid #37b34a !important;
  }

  /* 🔹 Hover effect */
  .custom-menu .ant-menu-item:hover {
    background-color: #37b34a10 !important;
    color: #37b34a !important;
  }
`}</style>
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
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Logos from "../assets/logo.png";
const { Header, Sider, Content, Footer } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("explore");
  const navigate = useNavigate();
  const location = useLocation();
 

  // sidebar menu items
  const menuItems = [
    { key: "explore", icon: <HomeOutlined />, label: "Explore", path: "/explore" },
    { key: "notifications", icon: <BellOutlined />, label: "Notifications", path: "/notifications" },
    { key: "shopping-list", icon: <ShoppingOutlined />, label: "Shopping List", path: "/shopping-list" },
    { key: "rider", icon: <CarOutlined />, label: "My Rider", path: "/rider" },
    { key: "orders", icon: <OrderedListOutlined />, label: "My Orders", path: "/orders" },
    { key: "services", icon: <ToolOutlined />, label: "My Services", path: "/services" },
    { key: "support", icon: <QuestionCircleOutlined />, label: "Support", path: "/support" },
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

  const Logo = () => (
    <img src={Logos} alt="Logo" className="w-28" />
  );
  const handleMenuClick = ({ key }) => {
    const item = menuItems.find((i) => i.key === key);
    if (item) navigate(item.path);
  };
  React.useEffect(() => {
    // Extract the first part of the pathname (e.g. '/orders' -> 'orders')
    const path = location.pathname.split("/")[1] || "explore";
    setCurrentPath(path);
  }, [location.pathname]);
  return (
    <Layout className="min-h-screen font-sans">
      {/* Desktop Sidebar */}
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block fixed h-screen bg-[#e8e8e8] border-none"
        theme="light"
        width={240}
      >
        <div className="flex justify-center items-center py-6 border-b border-gray-200">
          <Logo />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          items={menuItems}
          className="custom-menu border-none text-gray-700 bg-[#e8e8e8] mt-4"
          onClick={handleMenuClick}
          style={{ fontSize: "15px" }}
        />
      </Sider>

      {/* Main Layout */}
      <Layout className="main-layout ml-0 lg:ml-[240px]">
        {/* Header */}
        <Header className="bg-[#e8e8e8] shadow-sm px-4 md:px-6 sticky top-0 z-50 h-auto lg:h-[72px]">
          {/* Tablet Layout (md to lg) */}
          <div className="hidden md:flex lg:hidden justify-between items-center h-[72px]">
            {/* Left: User Greeting */}
            <div className="flex items-center gap-3 relative bg-[#333] rounded-lg h-[50px]  px-3">
                <div className="w-[25px] h-[25px] rounded-full bg-gray-700 flex items-center justify-center mt-[-10px] text-white ">
                  <UserOutlined className="text-white text-xs" />
                </div>
                <div className="relative">
                  <p className="text-xs text-gray-600 absolute top-0 text-white ">Hello</p>
                  <p className="font-semibold text-gray-800 text-white text-xs mt-[15px]">Micheal</p>
                </div>
              </div>

            {/* Center: Location */}
            <Dropdown overlay={locationMenu} trigger={["click"]} className="bg-white px-5 h-[50px]">
              <Button
                type="text"
                className="flex items-center gap-1 font-semibold text-[#37B34A] px-2"
              >
                <EnvironmentOutlined className="text-lg text-[#333]" />
                Home
                <DownOutlined className="text-xs text-[#333]" />
              </Button>
            </Dropdown>

            {/* Right: Wallet, Notification & Cart */}
            <div className="flex items-center gap-3">
              {/* Wallet */}
              <div className="bg-white h-[50px] rounded-lg px-5 flex items-center gap-2">
                <WalletOutlined className="text-lg text-gray-700" />
                <div className="relative">
                  <p className="text-[10px] text-gray-600 mt-[-10px]">Wallet Balance</p>
                  <p className="font-semibold text-xs text-gray-800 flex absolute top-8 ">
                  <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="hover:text-[#37B34A] transition-colors"
                >
                  {showBalance ? (
                    <EyeInvisibleOutlined className="text-sm text-gray-600" />
                  ) : (
                    <EyeOutlined className="text-sm text-gray-600" />
                  )}
                </button>
                    {showBalance ? "₦500,000.00" : "₦******"}
                  </p>
                </div>
                
              </div>

              {/* Notification */}
              <Badge count={2} size="small" color="#37B34A" className="bg-white p-2 rounded-lg">
                <BellOutlined className="text-2xl text-gray-700 cursor-pointer" />
              </Badge>

              {/* Cart */}
              <Badge count={2} size="small" color="#37B34A" className="bg-white p-2 rounded-lg">
                <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
              </Badge>
            </div>
          </div>

          {/* Mobile Layout (< md) */}
          <div className="md:hidden py-4">
            {/* Top Row: Avatar, Location, Notification */}
            <div className="flex justify-between items-center mb-4">
              {/* Left: User Greeting */}
              <div className="flex items-center gap-3 relative bg-[#333] rounded-lg h-[50px]  px-3">
                <div className="w-[25px] h-[25px] rounded-full bg-gray-700 flex items-center justify-center mt-[-10px] text-white ">
                  <UserOutlined className="text-white text-xs" />
                </div>
                <div className="relative">
                  <p className="text-xs text-gray-600 absolute top-0 text-white ">Hello</p>
                  <p className="font-semibold text-gray-800 text-white text-xs mt-[15px]">Micheal</p>
                </div>
              </div>

              {/* Center: Location */}
              <Dropdown overlay={locationMenu} trigger={["click"]}>
                <Button
                  type="text"
                  className="flex items-center gap-1 font-semibold bg-white   h-[45px] text-[#37B34A] px-2"
                >
                  <EnvironmentOutlined className="text-lg text-[#333]" />
                  Home
                  <DownOutlined className="text-xs text-[#333]" />
                </Button>
              </Dropdown>

              {/* Right: Notification only */}
              <Badge count={2} size="small" color="#37B34A" className="bg-white p-2 rounded-lg">
                <BellOutlined className="text-2xl text-gray-700 cursor-pointer" />
              </Badge>
            </div>

            {/* Bottom Row: Wallet & Cart */}
            <div className=" flex items-center justify-between gap-3">
              <div className="h-[50px] flex-1  bg-white rounded-lg p-4 flex items-center gap-3">
                <WalletOutlined className="text-2xl text-gray-700" />
                <div>
                  <p className="text-xs text-gray-600">Wallet Balance</p>
                  <p className="font-bold text-sm text-gray-800 flex">
                    <div className="flex items-center  gap-3">
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="hover:text-[#37B34A] transition-colors"
                      >
                        {showBalance ? (
                          <EyeInvisibleOutlined className="text-xl text-gray-600" />
                        ) : (
                          <EyeOutlined className="text-xl text-gray-600" />
                        )}
                      </button>
                      
                      
                    </div>
                    {showBalance ? "₦500,000.00" : "₦******"}
                  </p>
                </div>
              
              </div>
              
              
             <div className="p-2 rounded-lg bg-white h-[50px] flex items-center justify-center"> <Badge count={2} size="small" color="#37B34A">
                  <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
                </Badge></div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center h-[72px]">
            <div className="flex items-center gap-4">
              <Dropdown overlay={locationMenu} trigger={["click"]}>
                <Button
                  type="text"
                  className="flex items-center gap-2 font-medium bg-white py-6 text-[#37B34A]"
                >
                  <EnvironmentOutlined className="text-gray-700" />
                  Home
                  <DownOutlined className="text-xs" />
                </Button>
              </Dropdown>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 bg-[#fcfcfc] rounded-lg h-[50px] px-2">
                <div>
                  <WalletOutlined className="text-[#333] text-lg" />
                </div>
                <div className="flex flex-col px-4 rounded-lg h-[50px]">
                  <span className="text-gray-600 text-xs mt-[5px]">
                    Wallet Balance
                  </span>
                  <div className="mt-[-20px] flex items-center gap-2">
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="hover:text-[#37B34A] transition-colors"
                    >
                      {showBalance ? (
                        <EyeInvisibleOutlined className="text-xs text-gray-600" />
                      ) : (
                        <EyeOutlined className="text-xs text-gray-600" />
                      )}
                    </button>
                    <span className="font-semibold text-gray-800 text-xs">
                      {showBalance ? "₦500,000.00" : "₦******"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#fcfcfc] h-[50px] p-2 flex items-center justify-center rounded-lg">
                <Badge count={2} size="small" offset={[-5, 5]} color="#37B34A">
                  <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
                </Badge>
              </div>
            </div>
          </div>
        </Header>

        {/* Content */}
        <Content className="p-0 bg-[#e8e8e8] min-h-[calc(100vh-72px-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-2 md:p-6"
          >
            {/* Sample Content */}
            <Outlet/>
          </motion.div>
        </Content>

        {/* Footer */}
        <Footer className="border-t border-gray-200 py-8 px-6 bg-[#e8e8e8]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo & About */}
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="text-gray-600 text-sm mt-4">
                Your trusted delivery and service platform
              </p>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
                    About MYDLV
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
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
                  <a
                    href="#privacy"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-of-use"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
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
                  <a
                    href="#vendor"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
                    Become a vendor
                  </a>
                </li>
                <li>
                  <a
                    href="#rider"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
                    Become a Rider
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
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
                  <a
                    href="#uyo"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
                    Uyo
                  </a>
                </li>
                <li>
                  <a
                    href="#lagos"
                    className="text-gray-600 hover:text-[#37B34A] text-sm"
                  >
                    Lagos
                  </a>
                </li>
              </ul>
              <h3 className="font-semibold text-gray-800 mb-3 mt-6">
                Our Apps
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="#play"
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-800 transition-colors"
                >
                  <AndroidOutlined className="text-base" />
                  <div>
                    <div className="text-[10px]">Get it On</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
                <a
                  href="#appstore"
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

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around py-3 z-50">
        {[
          { key: "explore", icon: <HomeOutlined />, label: "Explore", path: "/explore" },
          { key: "rider", icon: <CarOutlined />, label: "My Rider", path: "/rider", count: 12 },
          { key: "orders", icon: <OrderedListOutlined />, label: "My Orders", path: "/orders", count: 12 },
          { key: "services", icon: <ToolOutlined />, label: "Services", path: "/services" },
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`relative flex flex-col items-center text-xs cursor-pointer transition-colors ${
              currentPath === item.key ? "text-[#333]" : "text-gray-400"
            }`}
          >
            {/* Icon with optional badge */}
            <div className="relative">
              <span className="text-xl mb-1">{item.icon}</span>
              {item.count && (
                <span className="absolute -top-1 -right-2 bg-[#37B34A] text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.count}
                </span>
              )}
              </div>
            <span className="text-[11px] mt-1">{item.label}</span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        /* Custom Menu Styling */
        .custom-menu {
          background: #e8e8e8 !important;
          padding: 0 30px
        }

        .custom-menu .ant-menu-item {
          height: 48px !important;
          line-height: 48px !important;
          margin: 20px 0 !important;
          padding: 0 16px !important;
          border-radius: 8px !important;
          color: #444 !important;
          font-weight: 400 !important;
        }

        .custom-menu .ant-menu-item-selected {
          background-color: transparent !important;
          color: #111 !important;
          font-weight: 600 !important;
          border-left: 8px solid #111 !important;
          border-radius: 8px !important;
          padding-left: 13px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important; /* added shadow */
          transition: all 0.3s ease !important; /* smooth hover feel */
        }

        .custom-menu .ant-menu-item-selected::after {
          border: none !important;
        }

        .custom-menu .ant-menu-item:hover {
          scale: 1.02
        }

        .ant-layout-header {
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .ant-layout-header {
            padding: 0 16px;
          }
        }
      `}</style>
    </Layout>
  );
}
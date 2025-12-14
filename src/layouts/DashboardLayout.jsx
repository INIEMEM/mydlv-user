import React, {useContext} from "react";
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
import axios from "axios";
import { MainContext } from "../context/Context";
const { Header, Sider, Content, Footer } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("explore");
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [unreadNotifications, setUnreadNotifications] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { token, baseUrl } = useContext(MainContext);
  
  React.useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
   
    if (token){
      fetchUserData();
    }
  }, [token]);

  React.useEffect(() => {
    // Fetch notification count
    const fetchNotificationCount = async () => {
      try {
        const response = await axios.get(`${baseUrl}notification`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnreadNotifications(response.data.data.stat.unread || 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (token) {
      fetchNotificationCount();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotificationCount, 30000);
      return () => clearInterval(interval);
    }
  }, [token, baseUrl]);

  React.useEffect(() => {
    // Extract the first part of the pathname (e.g. '/orders' -> 'orders')
    const path = location.pathname.split("/")[1] || "explore";
    setCurrentPath(path);
  }, [location.pathname]);

  const displayName = userData?.firstname || "User";
  const walletBalance = userData?.wallet?.NGN || 0;
  const profilePicture = userData?.profile_picture;

  // sidebar menu items
  const menuItems = [
    { key: "explore", icon: <HomeOutlined />, label: "Explore", path: "/" },
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
 
  return (
    <Layout className="min-h-screen ">
       {/* Header */}
      <Header className="bg-[#e8e8e8]  lg:border-b-[0.5px] lg:border-solid lg:border-[#6F6F6F] px-0 md:px-6 sticky top-0 z-50 h-auto lg:h-[72px]">
          {/* Tablet Layout (md to lg) */}
          <div className="hidden md:flex lg:hidden justify-between items-center h-[72px]">
            
            {/* Left: User Greeting */}
            <div 
               onClick={() => navigate("/profile")}
              className="flex items-center gap-3 relative bg-[#333] rounded-lg h-[50px]  px-3 cursor-pointer">
                <div className="w-[25px] h-[25px] rounded-full bg-gray-700 flex items-center justify-center mt-[-10px] text-white overflow-hidden">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserOutlined className="text-white text-xs" />
                  )
                  }
                </div>
                <div className="relative">
                  <p className="text-xs text-gray-600 absolute top-0 text-white ">Hello</p>
                  <p className="font-semibold text-gray-800 text-white text-xs mt-[15px]">{displayName}</p>
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
                    {showBalance ? `₦${walletBalance.toLocaleString()}.00` : "₦******"}
                  </p>
                </div>
                
              </div>

              {/* Notification */}
              <Badge count={unreadNotifications} size="small" color="#37B34A" className="bg-white  p-2 rounded-lg">
                <BellOutlined 
                  className="text-2xl text-gray-700 cursor-pointer" 
                  onClick={() => navigate("/notifications")}
                />
              </Badge>

              {/* Cart */}
              <Badge count={2} size="small" color="#37B34A" className="bg-white p-2 rounded-lg">
                <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
              </Badge>
            </div>
          </div>

          {/* Mobile Layout (< md) */}
          <div className="md:hidden py-4">
            {/* Conditional rendering based on current path */}
            {currentPath === 'explore' || currentPath === 'shopping-list' ? (
              // Original header for '/' (explore) and 'shopping-list'
              <>
                <div className="flex gap-2 justify-between items-center mb-4">
                  <div 
                    onClick={() => navigate("/profile")}
                    className="flex  items-center gap-3 relative bg-[#333] rounded-lg h-[50px] px-3 cursor-pointer">
                    <div className="w-[25px] h-[25px] rounded-full bg-gray-700 flex items-center justify-center mt-[-10px] text-white overflow-hidden">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserOutlined className="text-white text-xs" />
                      )}
                    </div>
                    <div className="relative">
                      <p className="text-xs text-gray-600 absolute top-0 text-white">Hello</p>
                      <p className="font-semibold text-gray-800 text-white text-xs mt-[15px]">{displayName}</p>
                    </div>
                  </div>

                  <Dropdown overlay={locationMenu} trigger={["click"]} className="flex-1">
                    <Button
                      type="text"
                      className="flex items-center gap-1 font-semibold bg-white h-[45px] text-[#37B34A] px-2"
                    >
                      <EnvironmentOutlined className="text-lg text-[#333]" />
                      Home
                      <DownOutlined className="text-xs text-[#333]" />
                    </Button>
                  </Dropdown>

                  <Badge count={unreadNotifications} size="small" color="#37B34A" className="bg-white flex justify-center items-center p-2 h-[40px]  rounded-lg">
                    <BellOutlined 
                      className="text-2xl text-gray-700 cursor-pointer " 
                      onClick={() => navigate("/notifications")}
                    />
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="h-[50px] flex-1 bg-white rounded-lg p-4 flex items-center gap-3">
                    <WalletOutlined className="text-2xl text-gray-700" />
                    <div>
                      <p className="text-xs text-gray-600">Wallet Balance</p>
                      <p className="font-bold text-sm text-gray-800 flex">
                        <div className="flex items-center gap-3">
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
                        {showBalance ? `₦${walletBalance.toLocaleString()}.00` : "₦******"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-2 rounded-lg bg-white h-[50px] flex items-center justify-center">
                    <Badge count={2} size="small" color="#37B34A">
                      <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
                    </Badge>
                  </div>
                </div>
              </>
            ) : (
              // New simplified header for all other pages
              <div className="flex items-center justify-between gap-2">
                {/* Wallet Balance */}
                <div className="h-[50px] flex-1 bg-white rounded-lg p-4 flex items-center gap-3">
                    <WalletOutlined className="text-2xl text-gray-700" />
                    <div className="">
                      <p className="text-xs text-gray-600 ">Wallet Balance</p>
                      <p className="font-bold text-sm text-gray-800 flex">
                        <div className="flex items-center gap-3">
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
                        {showBalance ? `₦${walletBalance.toLocaleString()}.00` : "₦******"}
                      </p>
                    </div>
                  </div>

                {/* Cart */}
                <div className="bg-white p-1 rounded-lg h-[40px] flex items-center">
                  <Badge count={2} size="small" color="#37B34A">
                    <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
                  </Badge>
                </div>

                {/* Customer Service */}
                <div className="bg-white p-1 rounded-lg h-[40px] flex items-center">
                  <Badge count={2} size="small" color="#37B34A">
                    <QuestionCircleOutlined className="text-2xl text-gray-700 cursor-pointer" />
                  </Badge>
                </div>

                {/* Notification */}
                <div className="bg-white flex items-center p-1 rounded-lg  h-[40px]">
                  <Badge count={unreadNotifications} size="small" color="#37B34A">
                    <BellOutlined 
                      className="text-2xl text-gray-700 cursor-pointer" 
                      onClick={() => navigate("/notifications")}
                    />
                  </Badge>
                </div>
              </div>
            )}
          </div>
                        
          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center h-[72px]">
            <div className="flex gap-10 items-center ">
              <Logo />
              <div className="flex items-center gap-4">

              <Dropdown overlay={locationMenu} trigger={["click"]}>
                <Button
                  type="text"
                  className="flex items-center gap-2 font-medium bg-white py-6 text-[#37B34A]"
                >
                  <EnvironmentOutlined className="text-gray-700" />
                  Home
                  <DownOutlined className="text-xs text-gray-700" />
                </Button>
              </Dropdown>
            </div>
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
                      {showBalance ? `₦${walletBalance.toLocaleString()}.00` : "₦******"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-[#fcfcfc] h-[50px] lg:hidden p-2 flex items-center justify-center rounded-lg">
                <Badge count={unreadNotifications} size="small" offset={[-5, 5]} color="#37B34A">
                  <BellOutlined 
                    className="text-2xl text-gray-700 cursor-pointer" 
                    onClick={() => navigate("/notifications")}
                  />
                </Badge>
              </div>
              <div className="bg-[#fcfcfc] h-[50px] p-2 flex items-center justify-center rounded-lg">
                <Badge count={2} size="small" offset={[-5, 5]} color="#37B34A">
                  <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer" />
                </Badge>
              </div>
            </div>
          </div>
        </Header>           
      {/* Main Layout */}
      <Layout className="main-layout ml-0">
       
        {/* Desktop Sidebar */}
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth="0"
        className="hidden lg:block relative  h- bg-[#e8e8e8] border-none flex "
        theme="light"
        width={240}
      >
        
        <Menu
          mode="inline"
          selectedKeys={[currentPath]}
          items={menuItems}
          className="custom-menu border-none relative text-gray-700 bg-[#e8e8e8] mt-4"
          onClick={handleMenuClick}
          style={{ fontSize: "15px", 
           }}
        />

        <div className="w-full px-10 ">
            <div 
               onClick={() => navigate("/profile")}
              className="flex items-center gap-3 relative bg-[#333] rounded-lg h-[50px]  px-3 cursor-pointer">
                <div className="w-[25px] h-[25px] rounded-full bg-gray-700 flex items-center justify-center mt-[-10px] text-white overflow-hidden">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserOutlined className="text-white text-xs" />
                  )
                  }
                </div>
                <div className="relative">
                  <p className="text-xs text-gray-600 absolute top-0 text-white ">Hello</p>
                  <p className="font-semibold text-gray-800 text-white text-xs mt-[15px]">{displayName}</p>
                </div>
            </div>
        </div>

      </Sider>

        {/* Content */}
        <Content className="p-0 bg-[#e8e8e8]  ml-0 lg:ml-[0px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-2 md:py-6"
          >
            {/* Sample Content */}
            <Outlet/>
          </motion.div>
        </Content>

        {/* Footer */}
        
      </Layout>
      <Footer className="border-t border-gray-200 py-8 px-6 bg-[#e8e8e8]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Logo & About */}
            <div className="col-span-2 md:col-span-1">
              <Logo />
              {/* <p className="text-gray-600 text-sm mt-4">
                Your trusted delivery and service platform
              </p> */}
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
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around py-3 z-50">
        {[
          { key: "explore", icon: <HomeOutlined />, label: "Explore", path: "/" },
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
          padding: 0 30px;
          border: none !important;
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
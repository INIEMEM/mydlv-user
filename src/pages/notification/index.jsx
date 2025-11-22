import React, { useState, useEffect } from "react";
import { Button, Switch, Modal, Badge, Tabs, Empty, Spin, message } from "antd";
import { 
  BellOutlined, 
  CheckOutlined, 
  DeleteOutlined,
  MobileOutlined,
  DesktopOutlined,
  TabletOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { motion } from "framer-motion";

const API_URL = "https://mydlv.onrender.com/api/v1";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [currentDeviceId, setCurrentDeviceId] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  // Initialize and check device status
  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId') || generateDeviceId();
    setCurrentDeviceId(deviceId);
    checkDeviceStatus(deviceId);
    fetchNotifications();
    fetchDevices();
  }, []);

  const generateDeviceId = () => {
    const id = `web_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    localStorage.setItem('deviceId', id);
    return id;
  };

  const checkDeviceStatus = async (deviceId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/auth/device/status?deviceId=${deviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setPushEnabled(data.data?.isActive || false);
    } catch (error) {
      console.error('Error checking device status:', error);
    }
  };

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/notification?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setNotifications(data.data.notifications);
      setUnreadCount(data.data.stat.unread);
      setTotalPages(data.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      message.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchDevices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/auth/devices`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setDevices(data.data || []);
    } catch (error) {
      message.error('Failed to fetch devices');
    }
  };

  const handlePushToggle = async (checked) => {
    try {
      const token = localStorage.getItem('token');
      
      if (checked) {
        // Subscribe device
        const deviceData = {
          deviceId: currentDeviceId,
          platform: "web",
          browser: getBrowserName(),
          fcmToken: "dummy_token_" + Date.now(),
          deviceInfo: {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language,
            timestamp: new Date().toISOString()
          }
        };
        
        await fetch(
          `${API_URL}/auth/device/subscribe`,
          {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(deviceData)
          }
        );
        message.success('Push notifications enabled');
      } else {
        // Unsubscribe device
        await fetch(
          `${API_URL}/auth/device/unsubscribe`,
          {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ deviceId: currentDeviceId })
          }
        );
        message.success('Push notifications disabled');
      }
      
      setPushEnabled(checked);
      fetchDevices();
    } catch (error) {
      message.error('Failed to update notification settings');
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(
        `${API_URL}/notification/${notificationId}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchNotifications(currentPage);
    } catch (error) {
      message.error('Failed to mark as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(
        `${API_URL}/notification`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      message.success('All notifications marked as read');
      fetchNotifications(currentPage);
    } catch (error) {
      message.error('Failed to mark all as read');
    }
  };

  const toggleDeviceStatus = async (deviceId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(
        `${API_URL}/auth/device/${deviceId}`,
        {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isActive: !currentStatus })
        }
      );
      message.success(`Device ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchDevices();
    } catch (error) {
      message.error('Failed to update device status');
    }
  };

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    return 'other';
  };

  const getDeviceIcon = (platform) => {
    if (platform?.toLowerCase().includes('mobile') || platform === 'android' || platform === 'ios') {
      return <MobileOutlined className="text-2xl" />;
    }
    if (platform?.toLowerCase().includes('tablet')) {
      return <TabletOutlined className="text-2xl" />;
    }
    return <DesktopOutlined className="text-2xl" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      wallet: 'bg-green-100 text-green-700',
      order: 'bg-blue-100 text-blue-700',
      promotion: 'bg-purple-100 text-purple-700',
      system: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors.system;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const NotificationItem = ({ notification }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl mb-3 cursor-pointer transition-all ${
        notification.isRead 
          ? 'bg-white hover:bg-gray-50' 
          : 'bg-green-0 hover:bg-green-50 border-l-4 border-green-500'
      }`}
      onClick={() => !notification.isRead && markAsRead(notification._id)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(notification.category)}`}>
              {notification.category}
            </span>
            {!notification.isRead && (
              <Badge status="processing" text="New" />
            )}
          </div>
          <p className="text-gray-800 text-sm mb-2">{notification.message}</p>
          <p className="text-gray-500 text-xs">{formatDate(notification.createdAt)}</p>
        </div>
        
        {!notification.isRead && (
          <Button
            type="text"
            icon={<CheckOutlined />}
            size="small"
            className="text-green-600"
            onClick={(e) => {
              e.stopPropagation();
              markAsRead(notification._id);
            }}
          />
        )}
      </div>
    </motion.div>
  );

  const DeviceItem = ({ device }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className=" p-4 rounded-xl mb-3 border border-gray-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <div className="text-gray-600">
            {getDeviceIcon(device.platform)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-1">
              {device.browser?.toUpperCase() || 'Unknown'} on {device.platform || 'Unknown'}
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              Device ID: {device.deviceId?.substring(0, 20)}...
            </p>
            <p className="text-xs text-gray-400">
              Last active: {formatDate(device.lastActive || device.createdAt)}
            </p>
            {device.deviceId === currentDeviceId && (
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                Current Device
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs ${device.isActive ? 'text-green-600' : 'text-gray-400'}`}>
            {device.isActive ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          </span>
          <Switch
            checked={device.isActive}
            onChange={(checked) => toggleDeviceStatus(device.deviceId, device.isActive)}
            size="small"
          />
        </div>
      </div>
    </motion.div>
  );

  const tabItems = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <BellOutlined />
          Notifications
          {unreadCount > 0 && (
            <Badge count={unreadCount} className="ml-1" />
          )}
        </span>
      ),
      children: (
        <div>
          {/* Notification Controls */}
          <div className=" p-4 rounded-xl mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BellOutlined className="text-xl text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                <p className="text-xs text-gray-500">
                  {pushEnabled ? 'Enabled on this device' : 'Enable to receive updates'}
                </p>
              </div>
            </div>
            <Switch
              checked={pushEnabled}
              onChange={handlePushToggle}
              className="bg-gray-300"
            />
          </div>

          {/* Mark All Read Button */}
          {unreadCount > 0 && (
            <div className="mb-4">
              <Button
                type="default"
                icon={<CheckOutlined />}
                onClick={markAllAsRead}
                className="w-full sm:w-auto"
              >
                Mark all as read
              </Button>
            </div>
          )}

          {/* Notifications List */}
          {loading ? (
            <div className="text-center py-12">
              <Spin size="large" />
            </div>
          ) : notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <NotificationItem key={notification._id} notification={notification} />
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => fetchNotifications(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <span className="px-4 py-2 text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    disabled={currentPage === totalPages}
                    onClick={() => fetchNotifications(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Empty
              description="No notifications yet"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      )
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <DesktopOutlined />
          Devices
          <Badge count={devices.length} showZero className="ml-1" />
        </span>
      ),
      children: (
        <div>
          <div className="bg-green- p-4 rounded-xl mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Manage Your Devices</h3>
            <p className="text-sm text-gray-600">
              Control which devices can receive notifications. Toggle off to disable notifications for specific devices.
            </p>
          </div>

          {devices.length > 0 ? (
            devices.map((device) => (
              <DeviceItem key={device._id} device={device} />
            ))
          ) : (
            <Empty
              description="No devices registered"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated with your orders and account activity</p>
        </div>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="notification-tabs"
        />
      </div>
    </div>
  );
}
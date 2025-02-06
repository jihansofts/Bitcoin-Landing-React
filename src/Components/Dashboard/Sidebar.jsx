import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaHome, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa"; // React Icons

const Sidebar = ({ onLogout }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-6 text-center">Dashboard</h1>
        <Tabs>
          {/* Sidebar Navigation */}
          <TabList className="space-y-2">
            <Tab className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-md hover:bg-gray-700 transition">
              <FaHome size={18} />
              <span>Home</span>
            </Tab>
            <Tab className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-md hover:bg-gray-700 transition">
              <FaUsers size={18} />
              <span>Users</span>
            </Tab>
            <Tab className="flex items-center gap-2 px-4 py-3 cursor-pointer rounded-md hover:bg-gray-700 transition">
              <FaCog size={18} />
              <span>Settings</span>
            </Tab>
          </TabList>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="mt-auto flex items-center gap-2 px-4 py-3 rounded-md bg-red-600 hover:bg-red-700 transition">
            <FaSignOutAlt size={18} />
            <span>Logout</span>
          </button>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        <Tabs>
          <TabPanel>
            <h2 className="text-2xl font-semibold">🏠 Home Content</h2>
            <p>Welcome to your dashboard!</p>
          </TabPanel>
          <TabPanel>
            <h2 className="text-2xl font-semibold">👥 User Management</h2>
            <p>Manage your users here.</p>
          </TabPanel>
          <TabPanel>
            <h2 className="text-2xl font-semibold">⚙️ Settings</h2>
            <p>Configure your settings here.</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Sidebar;

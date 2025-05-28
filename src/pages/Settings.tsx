import React, { useState } from 'react';
import { Bell, Lock, User, BellOff, Globe, Sliders } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
 
  const tabs = [
    { id: 'general', name: 'General', icon: Sliders },
    { id: 'account', name: 'Account', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
  ];
 
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    lowStock: true,
    overdue: true,
    newItems: false,
    checkouts: true,
    returns: true,
    reports: false,
  });
 
  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
 
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    autoLogout: '30',
  });
 
  const handleGeneralChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and system preferences
        </p>
      </div>
     
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="sm:flex sm:divide-x sm:divide-gray-200">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 w-full sm:w-60 border-b sm:border-b-0 border-gray-200">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                >
                  <tab.icon
                    className={`${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                    aria-hidden="true"
                  />
                  {tab.name}
                </button>
              ))}
            </nav>
          </aside>
         
          {/* Content */}
          <div className="px-4 py-6 sm:px-6 w-full">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
               
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={generalSettings.language}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                 
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={generalSettings.timezone}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    </select>
                  </div>
                 
                  <div>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                      Date Format
                    </label>
                    <select
                      id="dateFormat"
                      name="dateFormat"
                      value={generalSettings.dateFormat}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                 
                  <div>
                    <label htmlFor="autoLogout" className="block text-sm font-medium text-gray-700">
                      Auto Logout (minutes)
                    </label>
                    <select
                      id="autoLogout"
                      name="autoLogout"
                      value={generalSettings.autoLogout}
                      onChange={handleGeneralChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">2 hours</option>
                      <option value="0">Never</option>
                    </select>
                  </div>
                </div>
               
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
           
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
               
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    A
                  </div>
                  <div className="ml-6">
                    <button
                      type="button"
                      className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Avatar
                    </button>
                  </div>
                </div>
               
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue="Admin"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                 
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue="User"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                 
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue="admin@school.edu"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                 
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      defaultValue="(555) 123-4567"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
               
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
           
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
               
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" /> */}
                      <div>
                        <p className="text-sm font-medium text-gray-900">Low Stock Alerts</p>
                        <p className="text-xs text-gray-500">Get notified when items reach their minimum stock level</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification('lowStock')}
                      className={`${
                        notificationSettings.lowStock ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      aria-pressed="true"
                    >
                      <span className="sr-only">Toggle notification</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          notificationSettings.lowStock ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      ></span>
                    </button>
                  </div>
                 
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Overdue Item Notifications</p>
                        <p className="text-xs text-gray-500">Get notified when items are past their due date</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification('overdue')}
                      className={`${
                        notificationSettings.overdue ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      aria-pressed="true"
                    >
                      <span className="sr-only">Toggle notification</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          notificationSettings.overdue ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      ></span>
                    </button>
                  </div>
                 
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Plus className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">New Item Notifications</p>
                        <p className="text-xs text-gray-500">Get notified when new items are added to inventory</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification('newItems')}
                      className={`${
                        notificationSettings.newItems ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      aria-pressed="true"
                    >
                      <span className="sr-only">Toggle notification</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          notificationSettings.newItems ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      ></span>
                    </button>
                  </div>
                 
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <LogOut className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Checkout Notifications</p>
                        <p className="text-xs text-gray-500">Get notified when items are checked out</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleNotification('checkouts')}
                      className={`${
                        notificationSettings.checkouts ? 'bg-blue-600' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      aria-pressed="true"
                    >
                      <span className="sr-only">Toggle notification</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          notificationSettings.checkouts ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      ></span>
                    </button>
                  </div>
                </div>
               
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
           
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
               
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                      <button
                        type="button"
                        className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                 
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Session Management</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You are currently logged in from this device
                      </p>
                      <button
                        type="button"
                        className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        Sign out all other sessions
                      </button>
                    </div>
                  </div>
                </div>
               
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Import additional icons
import { Plus, Clock, LogOut } from 'lucide-react';

export default Settings;
import React from "react";
import { useAuth } from '../context/AuthContext';
import {
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Calendar,
  AlertTriangle,
  Clock,
} from "lucide-react"; // Make sure lucide-react is installed!

const InventoryStatusChart = () => (
  <div className="h-full bg-blue-100 flex items-center justify-center">Chart</div>
);

const RecentActivity = ({ activities }) => (
  <div>{activities.length} activities</div>
);

const LowStockWidget = ({ items }) => (
  <div>{items.length} low stock items</div>
);

const UpcomingReturns = ({ returns }) => (
  <div>{returns.length} upcoming returns</div>
);

const Dashboard = () => {
  const { user } = useAuth();

  const totalItems = 100;
  const itemsCheckedOut = 40;
  const lowStockItems = [1, 2, 3];
  const overdueItems = 5;
  const inventory = [];
  const recentActivity = [1, 2];
  const upcomingReturns = [1];

  return (
    <div className="space-y-6 bg-[#BBD8EE] min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        Welcome back, {user ? user.username : 'Admin'}!
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Items</p>
              <p className="text-2xl font-bold mt-1">{totalItems}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-green-600">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Checked Out</p>
              <p className="text-2xl font-bold mt-1">{itemsCheckedOut}</p>
            </div>
            <div className="h-12 w-12 bg-teal-50 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-red-600">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            <span>3% from last week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold mt-1">{lowStockItems.length}</p>
            </div>
            <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-red-600">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>2 more than yesterday</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold mt-1">{overdueItems}</p>
            </div>
            <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs font-medium text-amber-600">
            <span>Requires attention</span>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border-4 border-blue-700 relative">
          <h2 className="absolute -top-3 left-6 bg-[#BBD8EE] px-2 text-lg font-medium text-blue-700">
            Inventory Status
          </h2>
          <div className="h-64 mt-4">
            <InventoryStatusChart inventory={inventory} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <RecentActivity activities={recentActivity} />
        </div>
      </div>

      {/* Low Stock and Upcoming Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Low Stock Items</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <LowStockWidget items={lowStockItems} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Returns</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <UpcomingReturns returns={upcomingReturns} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

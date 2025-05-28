import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { 
  BarChart2, 
  Calendar, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown,
  Package,
  Users
} from 'lucide-react';

const Reports = () => {
  const { inventory, checkouts } = useInventory();
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('30days');
  
  // Calculate metrics
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter(item => item.status === 'low').length;
  const unavailableItems = inventory.filter(item => item.status === 'unavailable').length;
  
  const activeCheckouts = checkouts.filter(c => c.status === 'checked-out').length;
  const overdueCheckouts = checkouts.filter(c => c.status === 'overdue').length;
  
  // Top categories by quantity
  const categories = inventory.reduce((acc, item) => {
    const existingCategory = acc.find(c => c.name === item.category);
    if (existingCategory) {
      existingCategory.count += item.quantity;
    } else {
      acc.push({ name: item.category, count: item.quantity });
    }
    return acc;
  }, [] as { name: string; count: number }[]);
  
  categories.sort((a, b) => b.count - a.count);
  
  // Get colors for categories
  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-teal-500',
      'bg-amber-500',
      'bg-indigo-500',
      'bg-green-500',
      'bg-red-500',
    ];
    return colors[index % colors.length];
  };
  
  // Mock data for activity over time
  const activityData = [
    { date: '1', checkouts: 5, returns: 3 },
    { date: '2', checkouts: 8, returns: 4 },
    { date: '3', checkouts: 12, returns: 7 },
    { date: '4', checkouts: 6, returns: 10 },
    { date: '5', checkouts: 9, returns: 5 },
    { date: '6', checkouts: 15, returns: 8 },
    { date: '7', checkouts: 7, returns: 12 },
    { date: '8', checkouts: 10, returns: 9 },
    { date: '9', checkouts: 8, returns: 6 },
    { date: '10', checkouts: 11, returns: 10 },
    { date: '11', checkouts: 13, returns: 9 },
    { date: '12', checkouts: 9, returns: 11 },
  ];
  
  // Function to get max value for scaling
  const getMaxValue = () => {
    const checkoutMax = Math.max(...activityData.map(d => d.checkouts));
    const returnsMax = Math.max(...activityData.map(d => d.returns));
    return Math.max(checkoutMax, returnsMax);
  };
  
  const maxValue = getMaxValue();
  
  // Get the highest value in the data
  const barHeight = (value: number) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <button
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>
      
      {/* Date Range Filter */}
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setDateRange('7days')}
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-l-md border ${
              dateRange === '7days'
                ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last 7 days
          </button>
          <button
            type="button"
            onClick={() => setDateRange('30days')}
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium border-t border-b ${
              dateRange === '30days'
                ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last 30 days
          </button>
          <button
            type="button"
            onClick={() => setDateRange('90days')}
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-r-md border ${
              dateRange === '90days'
                ? 'bg-blue-50 border-blue-500 text-blue-600 z-10'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last 90 days
          </button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Total Inventory</h3>
            <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            <p className="ml-2 text-sm font-medium text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              8%
            </p>
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            vs. previous period
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Active Checkouts</h3>
            <div className="h-10 w-10 bg-teal-50 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{activeCheckouts}</p>
            <p className="ml-2 text-sm font-medium text-red-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              3%
            </p>
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            vs. previous period
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
            <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{lowStockItems}</p>
            <p className="ml-2 text-sm font-medium text-red-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              12%
            </p>
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            vs. previous period
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">Overdue Items</h3>
            <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">{overdueCheckouts}</p>
            <p className="ml-2 text-sm font-medium text-green-600 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              5%
            </p>
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-500">
            vs. previous period
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory by Category</h3>
          <div className="space-y-3">
            {categories.slice(0, 5).map((category, index) => (
              <div key={category.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">{category.name}</span>
                  <span className="font-medium text-gray-900">{category.count}</span>
                </div>
                <div className="mt-1 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getCategoryColor(index)} rounded-full`}
                    style={{ width: `${(category.count / totalItems) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Activity Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Over Time</h3>
          <div className="h-64 flex items-end space-x-2">
            {activityData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex space-x-1 h-48">
                  <div 
                    className="w-1/2 bg-blue-500 rounded-t-sm"
                    style={{ height: barHeight(data.checkouts) }}
                  ></div>
                  <div 
                    className="w-1/2 bg-green-500 rounded-t-sm"
                    style={{ height: barHeight(data.returns) }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{data.date}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Checkouts</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Returns</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {checkouts.slice(0, 5).map((checkout) => {
              const item = inventory.find(i => i.id === checkout.itemId);
              
              return (
                <tr key={checkout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {checkout.userName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      checkout.status === 'checked-out' 
                        ? 'bg-blue-100 text-blue-800' 
                        : checkout.status === 'returned'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {checkout.status === 'checked-out' 
                        ? 'Checked Out' 
                        : checkout.status === 'returned'
                          ? 'Returned'
                          : 'Overdue'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item?.name || 'Unknown Item'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {checkout.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(checkout.checkoutDate).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Import AlertTriangle icon
import { AlertTriangle } from 'lucide-react';

export default Reports;
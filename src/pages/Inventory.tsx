import React, { useState } from 'react';
import { useInventory, InventoryItem } from '../context/InventoryContext';
import { Plus, Search, Filter, AlertTriangle, Package, CheckCircle2, X } from 'lucide-react';
import InventoryTable from '../components/inventory/InventoryTable';
import AddInventoryModal from '../components/inventory/AddInventoryModal';

const Inventory = () => {
  const { inventory } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Get unique categories
  const categories = Array.from(new Set(inventory.map(item => item.category)));
  
  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? item.status === selectedStatus : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Stats
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = inventory.filter(item => item.status === 'low').length;
  const unavailableCount = inventory.filter(item => item.status === 'unavailable').length;

  return (
    <div className="space-y-6 bg-[#BBD8EE] min-h-screen p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Items</p>
            <p className="text-xl font-bold">{totalItems}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center mr-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Low Stock</p>
            <p className="text-xl font-bold">{lowStockCount}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
          <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center mr-3">
            <X className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Unavailable</p>
            <p className="text-xl font-bold">{unavailableCount}</p>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or location"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <div className="w-40">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="w-40">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="available">Available</option>
                <option value="low">Low Stock</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <InventoryTable items={filteredInventory} />
      </div>
      
      {/* Add Item Modal */}
      {showAddModal && (
        <AddInventoryModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default Inventory;

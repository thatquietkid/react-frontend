import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { Search, Filter, Clock, Calendar, Package } from 'lucide-react';

const ResourceList = () => {
  const { inventory, checkouts } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Get unique categories
  const categories = Array.from(new Set(inventory.map(item => item.category)));
  
  // Filter resources based on search and filters
  const filteredResources = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get checkout info for an item
  const getCheckoutInfo = (itemId: string) => {
    const activeCheckouts = checkouts.filter(
      c => c.itemId === itemId && c.status === 'checked-out'
    );
    
    return {
      checkedOut: activeCheckouts.length > 0,
      quantity: activeCheckouts.reduce((sum, c) => sum + c.quantity, 0),
      users: Array.from(new Set(activeCheckouts.map(c => c.userName))),
      earliestReturn: activeCheckouts.length > 0 
        ? new Date(Math.min(...activeCheckouts.map(c => new Date(c.dueDate).getTime())))
        : null
    };
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto">
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
        </div>
      </div>
      
      {/* Resource List */}
      <div className="divide-y divide-gray-200">
        {filteredResources.length === 0 ? (
          <div className="p-6 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          filteredResources.map(resource => {
            const checkoutInfo = getCheckoutInfo(resource.id);
            
            return (
              <div key={resource.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-4">
                    {resource.image ? (
                      <img 
                        src={resource.image} 
                        alt={resource.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {resource.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {resource.category}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="truncate">
                        {resource.status === 'unavailable' ? (
                          <span className="text-red-600 font-medium">Unavailable</span>
                        ) : (
                          <>
                            <span className="font-medium">{resource.quantity}</span> available of{' '}
                            <span className="font-medium">
                              {resource.quantity + (checkoutInfo.quantity || 0)}
                            </span> total
                          </>
                        )}
                      </span>
                    </div>
                    
                    {checkoutInfo.checkedOut && (
                      <div className="mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {checkoutInfo.quantity} checked out by {checkoutInfo.users.join(', ')}
                          </span>
                        </div>
                        {checkoutInfo.earliestReturn && (
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Next return: {formatDate(checkoutInfo.earliestReturn)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4">
                    <button
                      className={`inline-flex items-center px-3 py-1 border border-transparent rounded text-xs font-medium ${
                        resource.quantity > 0
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={resource.quantity <= 0}
                    >
                      Check Out
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ResourceList;
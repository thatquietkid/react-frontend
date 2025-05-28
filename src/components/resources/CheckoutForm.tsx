import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { useAuth } from '../../context/AuthContext';
import { X, Search, Calendar, Package } from 'lucide-react';

interface CheckoutFormProps {
  onClose: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { inventory, checkoutItem } = useInventory();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Filter inventory based on search
  const filteredInventory = inventory
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      item.quantity > 0 // Only show available items
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Get the selected item details
  const selectedItemDetails = selectedItem 
    ? inventory.find(item => item.id === selectedItem) 
    : null;
  
  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  // Set max date to 30 days from now
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];
  
  // Handle checkout
  const handleCheckout = () => {
    if (!selectedItem) {
      setError('Please select an item to check out');
      return;
    }
    
    if (!dueDate) {
      setError('Please select a return date');
      return;
    }
    
    if (quantity <= 0) {
      setError('Quantity must be at least 1');
      return;
    }
    
    const item = inventory.find(i => i.id === selectedItem);
    
    if (!item) {
      setError('Selected item not found');
      return;
    }
    
    if (quantity > item.quantity) {
      setError(`Only ${item.quantity} ${item.name}${item.quantity !== 1 ? 's' : ''} available`);
      return;
    }
    
    const success = checkoutItem(
      selectedItem,
      user?.id || 'unknown',
      user?.name || 'Unknown User',
      quantity,
      new Date(dueDate).toISOString()
    );
    
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('Failed to check out item');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Check Out Resources
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          {success ? (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Checkout Successful</h3>
              <p className="mt-2 text-sm text-gray-500">
                {selectedItemDetails?.name} has been checked out successfully.
              </p>
            </div>
          ) : (
            <>
              {/* Item Search */}
              <div className="mb-4">
                <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Item
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for items"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedItem(null);
                    }}
                  />
                </div>
                
                {/* Search Results */}
                {searchQuery && (
                  <div className="mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                    {filteredInventory.length === 0 ? (
                      <div className="p-3 text-sm text-gray-500">
                        No available items found
                      </div>
                    ) : (
                      filteredInventory.map(item => (
                        <div
                          key={item.id}
                          className={`p-3 flex items-center hover:bg-gray-50 cursor-pointer ${
                            selectedItem === item.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            setSelectedItem(item.id);
                            setSearchQuery(item.name);
                          }}
                        >
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 mr-3">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <Package className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} available • {item.location}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              {/* Selected Item Details */}
              {selectedItemDetails && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100 mr-3">
                      {selectedItemDetails.image ? (
                        <img 
                          src={selectedItemDetails.image} 
                          alt={selectedItemDetails.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedItemDetails.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedItemDetails.category} • {selectedItemDetails.location}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={selectedItemDetails?.quantity || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {selectedItemDetails && (
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedItemDetails.quantity} available
                  </p>
                )}
              </div>
              
              {/* Due Date */}
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Return By
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dueDate"
                    min={minDate}
                    max={maxDateString}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Maximum checkout period is 30 days
                </p>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={!selectedItem || !dueDate || quantity <= 0}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Import the Check icon
import { Check } from 'lucide-react';

export default CheckoutForm;
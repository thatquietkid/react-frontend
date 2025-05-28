import React from 'react';
import { InventoryItem, useInventory } from '../../context/InventoryContext';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  item: InventoryItem;
  onClose: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ item, onClose }) => {
  const { deleteItem } = useInventory();
  
  const handleDelete = () => {
    deleteItem(item.id);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
          Delete Inventory Item
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete "{item.name}"? This action cannot be undone.
        </p>
        
        <div className="flex justify-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
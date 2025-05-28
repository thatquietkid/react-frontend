import React, { useState } from 'react';
import { InventoryItem, useInventory } from '../../context/InventoryContext';
import { Edit, Trash2, MoreVertical, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import EditInventoryModal from './EditInventoryModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface InventoryTableProps {
  items: InventoryItem[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items }) => {
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<InventoryItem | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
 
  // Function to toggle dropdown
  const toggleDropdown = (id: string) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };
 
  // Function to close dropdown when clicking outside
  const closeDropdown = () => {
    setOpenDropdownId(null);
  };
 
  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Available
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Low Stock
          </span>
        );
      case 'unavailable':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Unavailable
          </span>
        );
      default:
        return null;
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-10 flex flex-col items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <Package className="h-6 w-6 text-gray-500" />
        </div>
        <p className="text-gray-500">No inventory items found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 font-medium">{item.quantity}</div>
                <div className="text-xs text-gray-500">Min: {item.minQuantity}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(item.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.lastUpdated).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
               
                {openDropdownId === item.id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={closeDropdown}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          onClick={() => {
                            setEditItem(item);
                            closeDropdown();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteItem(item);
                            closeDropdown();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                          role="menuitem"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      {/* Edit Modal */}
      {editItem && (
        <EditInventoryModal
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
     
      {/* Delete Confirmation Modal */}
      {deleteItem && (
        <DeleteConfirmModal
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
};

// Import the Package icon
import { Package } from 'lucide-react';

export default InventoryTable;  
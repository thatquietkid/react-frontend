import React from 'react';
import { InventoryItem } from '../../context/InventoryContext';
import { AlertTriangle } from 'lucide-react';

interface LowStockWidgetProps {
  items: InventoryItem[];
}

const LowStockWidget: React.FC<LowStockWidgetProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <Check className="h-8 w-8 text-green-500 mb-2" />
        <p>No low stock items to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
          <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden mr-3">
            {item.image ? (
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            ) : (
              <Package className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-xs font-bold">{item.quantity} left</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-xs text-gray-500">{item.location}</p>
            </div>
            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${Math.min(100, (item.quantity / item.minQuantity) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Import the Package and Check icons
import { Package, Check } from 'lucide-react';

export default LowStockWidget;
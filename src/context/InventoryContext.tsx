import React, { createContext, useContext, useState, useEffect } from 'react';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  location: string;
  lastUpdated: string;
  status: 'available' | 'low' | 'unavailable';
  image?: string;
}

export interface CheckoutRecord {
  id: string;
  itemId: string;
  userId: string;
  userName: string;
  quantity: number;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'checked-out' | 'returned' | 'overdue';
}

interface InventoryContextType {
  inventory: InventoryItem[];
  checkouts: CheckoutRecord[];
  lowStockItems: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'status' | 'lastUpdated'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  checkoutItem: (itemId: string, userId: string, userName: string, quantity: number, dueDate: string) => boolean;
  returnItem: (checkoutId: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Mock inventory data
const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Science Textbook - Grade 10',
    category: 'Books',
    quantity: 25,
    minQuantity: 10,
    location: 'Library Shelf A3',
    lastUpdated: '2025-06-01T09:30:00Z',
    status: 'available',
    image: 'https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    name: 'Chromebook - Student Model',
    category: 'Electronics',
    quantity: 8,
    minQuantity: 10,
    location: 'IT Room Cabinet 2',
    lastUpdated: '2025-05-28T14:15:00Z',
    status: 'low',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    name: 'Basketball',
    category: 'Sports',
    quantity: 12,
    minQuantity: 5,
    location: 'Gym Storage',
    lastUpdated: '2025-06-02T11:45:00Z',
    status: 'available',
    image: 'https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    name: 'Microscope - Advanced',
    category: 'Lab Equipment',
    quantity: 0,
    minQuantity: 3,
    location: 'Science Lab Cabinet B',
    lastUpdated: '2025-05-30T16:20:00Z',
    status: 'unavailable',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    name: 'Whiteboard Markers',
    category: 'Supplies',
    quantity: 15,
    minQuantity: 20,
    location: 'Supply Closet 1',
    lastUpdated: '2025-06-03T08:10:00Z',
    status: 'low',
    image: 'https://images.pexels.com/photos/3846178/pexels-photo-3846178.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    name: 'Projector - Portable',
    category: 'Electronics',
    quantity: 4,
    minQuantity: 2,
    location: 'AV Room',
    lastUpdated: '2025-05-29T13:40:00Z',
    status: 'available',
    image: 'https://images.pexels.com/photos/1447264/pexels-photo-1447264.png?auto=compress&cs=tinysrgb&w=800'
  }
];

// Mock checkout data
const mockCheckouts: CheckoutRecord[] = [
  {
    id: '1',
    itemId: '2',
    userId: '2',
    userName: 'Teacher Smith',
    quantity: 1,
    checkoutDate: '2025-05-25T09:00:00Z',
    dueDate: '2025-06-25T09:00:00Z',
    status: 'checked-out'
  },
  {
    id: '2',
    itemId: '3',
    userId: '3',
    userName: 'Staff Johnson',
    quantity: 3,
    checkoutDate: '2025-05-28T14:30:00Z',
    dueDate: '2025-06-04T14:30:00Z',
    status: 'checked-out'
  },
  {
    id: '3',
    itemId: '6',
    userId: '2',
    userName: 'Teacher Smith',
    quantity: 1,
    checkoutDate: '2025-05-20T10:15:00Z',
    dueDate: '2025-05-27T10:15:00Z',
    returnDate: '2025-05-26T15:30:00Z',
    status: 'returned'
  },
  {
    id: '4',
    itemId: '1',
    userId: '2',
    userName: 'Teacher Smith',
    quantity: 5,
    checkoutDate: '2025-05-15T11:00:00Z',
    dueDate: '2025-05-22T11:00:00Z',
    status: 'overdue'
  }
];

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [checkouts, setCheckouts] = useState<CheckoutRecord[]>(mockCheckouts);
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // Identify low stock items
    const lowItems = inventory.filter(item => 
      item.quantity <= item.minQuantity && item.quantity > 0
    );
    setLowStockItems(lowItems);
  }, [inventory]);

  const addItem = (item: Omit<InventoryItem, 'id' | 'status' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString(),
      status: item.quantity <= 0 
        ? 'unavailable' 
        : item.quantity <= item.minQuantity 
          ? 'low' 
          : 'available'
    };
    
    setInventory(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prev => 
      prev.map(item => {
        if (item.id === id) {
          const updatedItem = { 
            ...item, 
            ...updates,
            lastUpdated: new Date().toISOString()
          };
          
          // Update status based on quantity
          if (updatedItem.quantity <= 0) {
            updatedItem.status = 'unavailable';
          } else if (updatedItem.quantity <= updatedItem.minQuantity) {
            updatedItem.status = 'low';
          } else {
            updatedItem.status = 'available';
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const checkoutItem = (
    itemId: string, 
    userId: string, 
    userName: string,
    quantity: number, 
    dueDate: string
  ): boolean => {
    // Find the item
    const item = inventory.find(i => i.id === itemId);
    
    // Check if enough quantity is available
    if (!item || item.quantity < quantity) {
      return false;
    }
    
    // Create checkout record
    const newCheckout: CheckoutRecord = {
      id: Date.now().toString(),
      itemId,
      userId,
      userName,
      quantity,
      checkoutDate: new Date().toISOString(),
      dueDate,
      status: 'checked-out'
    };
    
    // Update inventory quantity
    updateItem(itemId, { quantity: item.quantity - quantity });
    
    // Add checkout record
    setCheckouts(prev => [...prev, newCheckout]);
    
    return true;
  };

  const returnItem = (checkoutId: string) => {
    const checkout = checkouts.find(c => c.id === checkoutId);
    
    if (checkout && checkout.status === 'checked-out') {
      // Find the item
      const item = inventory.find(i => i.id === checkout.itemId);
      
      if (item) {
        // Update inventory quantity
        updateItem(checkout.itemId, { quantity: item.quantity + checkout.quantity });
        
        // Update checkout record
        setCheckouts(prev =>
          prev.map(c => {
            if (c.id === checkoutId) {
              return {
                ...c,
                returnDate: new Date().toISOString(),
                status: 'returned'
              };
            }
            return c;
          })
        );
      }
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        checkouts,
        lowStockItems,
        addItem,
        updateItem,
        deleteItem,
        checkoutItem,
        returnItem
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
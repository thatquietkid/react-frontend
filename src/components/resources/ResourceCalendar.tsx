import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ResourceCalendar = () => {
  const { checkouts, inventory } = useInventory();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get the days in the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const result = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      result.push(day);
    }
    
    return result;
  };
  
  // Get the first day of the month (for offset)
  const getFirstDayOffset = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };
  
  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(prev => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return new Date(year, month - 1, 1);
    });
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const year = prev.getFullYear();
      const month = prev.getMonth();
      return new Date(year, month + 1, 1);
    });
  };
  
  // Format the month and year
  const formatMonthYear = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  // Get checkouts for a specific day
  const getCheckoutsForDay = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    
    return checkouts.filter(checkout => {
      const checkoutDate = new Date(checkout.checkoutDate);
      return checkoutDate >= start && checkoutDate <= end;
    });
  };
  
  // Get returns for a specific day
  const getReturnsForDay = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    
    return checkouts.filter(checkout => {
      if (checkout.status !== 'checked-out') return false;
      
      const dueDate = new Date(checkout.dueDate);
      return dueDate >= start && dueDate <= end;
    });
  };
  
  // Days in the current month
  const days = getDaysInMonth(currentMonth);
  const firstDayOffset = getFirstDayOffset(currentMonth);
  
  // Create empty cells for offset
  const offsetCells = Array(firstDayOffset).fill(null);
  
  // Get top-checked out items this month
  const getTopCheckoutsThisMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    
    const monthCheckouts = checkouts.filter(checkout => {
      const checkoutDate = new Date(checkout.checkoutDate);
      return checkoutDate >= startOfMonth && checkoutDate <= endOfMonth;
    });
    
    const itemCounts: Record<string, number> = {};
    
    monthCheckouts.forEach(checkout => {
      if (itemCounts[checkout.itemId]) {
        itemCounts[checkout.itemId] += checkout.quantity;
      } else {
        itemCounts[checkout.itemId] = checkout.quantity;
      }
    });
    
    const sortedItems = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([itemId, count]) => {
        const item = inventory.find(i => i.id === itemId);
        return {
          id: itemId,
          name: item ? item.name : 'Unknown Item',
          count
        };
      });
    
    return sortedItems;
  };
  
  const topCheckouts = getTopCheckoutsThisMonth();

  return (
    <div className="p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {formatMonthYear(currentMonth)}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Top Checkouts */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Top Checked Out Items This Month
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topCheckouts.length === 0 ? (
            <p className="text-sm text-gray-500">No checkouts this month</p>
          ) : (
            topCheckouts.map(item => (
              <div 
                key={item.id} 
                className="bg-gray-50 p-3 rounded-lg border border-gray-100"
              >
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Checked out {item.count} times
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Day Headers */}
        <div className="grid grid-cols-7 text-center border-b border-gray-200 bg-gray-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Cells */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {/* Offset cells */}
          {offsetCells.map((_, index) => (
            <div 
              key={`offset-${index}`} 
              className="min-h-[100px] p-1 border-r border-t border-gray-200 bg-gray-50"
            ></div>
          ))}
          
          {/* Day cells */}
          {days.map(day => {
            const dayCheckouts = getCheckoutsForDay(day);
            const dayReturns = getReturnsForDay(day);
            
            return (
              <div 
                key={day.toISOString()} 
                className={`min-h-[100px] p-2 border-r border-t border-gray-200 ${
                  isToday(day) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`text-sm font-medium ${
                    isToday(day) ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {day.getDate()}
                  </span>
                </div>
                
                {/* Activity markers */}
                <div className="mt-2 space-y-1">
                  {dayCheckouts.length > 0 && (
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                      <span className="text-xs text-gray-600">
                        {dayCheckouts.length} checkout{dayCheckouts.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  
                  {dayReturns.length > 0 && (
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-xs text-gray-600">
                        {dayReturns.length} due return{dayReturns.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
          <span className="text-xs text-gray-600">Checkouts</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
          <span className="text-xs text-gray-600">Due Returns</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-100 mr-1"></span>
          <span className="text-xs text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCalendar;
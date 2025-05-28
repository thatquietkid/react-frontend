import React from 'react';
import { CheckoutRecord } from '../../context/InventoryContext';
import { Calendar, Clock } from 'lucide-react';

interface UpcomingReturnsProps {
  returns: CheckoutRecord[];
}

const UpcomingReturns: React.FC<UpcomingReturnsProps> = ({ returns }) => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Function to calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  if (returns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <Calendar className="h-8 w-8 text-blue-500 mb-2" />
        <p>No upcoming returns to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {returns.map(item => {
        const daysRemaining = getDaysRemaining(item.dueDate);
        
        return (
          <div key={item.id} className="flex items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
              daysRemaining <= 1 ? 'bg-red-50 text-red-600' : 
              daysRemaining <= 3 ? 'bg-amber-50 text-amber-600' : 
              'bg-blue-50 text-blue-600'
            }`}>
              <Clock className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">{item.userName}</h3>
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                  daysRemaining <= 1 ? 'bg-red-50 text-red-600' : 
                  daysRemaining <= 3 ? 'bg-amber-50 text-amber-600' : 
                  'bg-blue-50 text-blue-600'
                }`}>
                  {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  {item.quantity} item(s) due
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(item.dueDate)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingReturns;
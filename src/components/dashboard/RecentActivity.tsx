import React from 'react';
import { CheckoutRecord } from '../../context/InventoryContext';
import { Clock, Check, AlertCircle } from 'lucide-react';

interface RecentActivityProps {
  activities: CheckoutRecord[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  // Get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'checked-out':
        return { 
          icon: <Clock className="h-4 w-4" />, 
          color: 'text-blue-600 bg-blue-50' 
        };
      case 'returned':
        return { 
          icon: <Check className="h-4 w-4" />, 
          color: 'text-green-600 bg-green-50' 
        };
      case 'overdue':
        return { 
          icon: <AlertCircle className="h-4 w-4" />, 
          color: 'text-red-600 bg-red-50' 
        };
      default:
        return { 
          icon: <Clock className="h-4 w-4" />, 
          color: 'text-gray-600 bg-gray-50' 
        };
    }
  };

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity</p>
      ) : (
        activities.map(activity => {
          const statusInfo = getStatusInfo(activity.status);
          
          return (
            <div key={activity.id} className="flex items-start">
              <div className={`rounded-full p-2 ${statusInfo.color} mr-3`}>
                {statusInfo.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.userName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {activity.status === 'checked-out' 
                    ? 'Checked out' 
                    : activity.status === 'returned' 
                      ? 'Returned' 
                      : 'Overdue'} {activity.quantity} item(s)
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDate(activity.checkoutDate)}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecentActivity;
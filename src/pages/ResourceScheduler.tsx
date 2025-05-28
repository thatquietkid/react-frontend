import React, { useState } from 'react';
import { Calendar, User, Check } from 'lucide-react';
import ResourceCalendar from '../components/resources/ResourceCalendar';
import ResourceList from '../components/resources/ResourceList';
import CheckoutForm from '../components/resources/CheckoutForm';

const ResourceScheduler = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  return (
    <div className="space-y-6" style={{ backgroundColor: '#CDEAFF', minHeight: '100vh', padding: '20px' }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resource Scheduler</h1>
        <div className="mt-3 sm:mt-0 flex">
          <div className="inline-flex rounded-md shadow-sm mr-3">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                viewMode === 'list'
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              List View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                viewMode === 'calendar'
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </button>
          </div>

          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowCheckoutForm(true)}
          >
            <Check className="h-4 w-4 mr-2" />
            Check Out
          </button>
        </div>
      </div>

      {/* Main content based on view mode */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {viewMode === 'list' ? <ResourceList /> : <ResourceCalendar />}
      </div>

      {/* Checkout Form Modal */}
      {showCheckoutForm && <CheckoutForm onClose={() => setShowCheckoutForm(false)} />}
    </div>
  );
};

export default ResourceScheduler;

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  BarChart2,
  Settings,
  AlertTriangle,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Resources', href: '/resources', icon: Calendar },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Reports', href: '/reports', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-auto`}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        {/* Header displaying only "Manav Rachna Institute" */}
        <div className="h-16 flex-shrink-0 flex items-center px-6 border-b border-gray-200 lg:border-none">
          <div className="text-xl font-bold text-blue-600">Manav Rachna Institute</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                  isActive
                    ? 'text-blue-600'  // Removed background color here, only blue text now
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className={({ isActive }: { isActive: boolean }) =>
                  `mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`
                }
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-medium text-gray-900">Low Stock Alert</h3>
            </div>
            <p className="text-xs text-gray-600">5 items require your attention</p>
            <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

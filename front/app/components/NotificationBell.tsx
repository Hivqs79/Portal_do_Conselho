import { useNotifications } from '@/hooks/UseNotifications';
import { useState } from 'react';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();

  const toggleDropdown = () => {
    if (!isOpen && unreadCount > 0) {
      markAsRead();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-200 relative"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-10">
          <div className="py-1">
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-700">Nenhuma notificação</div>
            ) : (
              notifications.map((notification, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100">
                  <div className="font-medium text-gray-900">{notification.title}</div>
                  <div className="text-sm text-gray-600">{notification.message}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(notification.creationTime).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
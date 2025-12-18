import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Notification = () => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  const getColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      className={`${getColor()} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in cursor-pointer`}
      onClick={() => onRemove(notification.id)}
    >
      <span className="text-2xl font-bold">{getIcon()}</span>
      <p className="flex-1 font-medium">{notification.message}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(notification.id);
        }}
        className="text-white hover:text-gray-200 text-xl font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;

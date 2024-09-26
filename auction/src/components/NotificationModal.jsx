import React from "react";
import moment from "moment";

const NotificationModal = ({ isOpen, notifications, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold">Notifications</h2>
        <ul className="mt-4 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index} className="text-gray-700">
                <p>{notification.message}</p>
                <p className="text-gray-500 text-sm">
                  {moment(notification.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No new notifications</li>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;

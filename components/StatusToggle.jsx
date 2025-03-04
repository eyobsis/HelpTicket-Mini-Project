'use client';

import { useState } from 'react';

const StatusToggle = ({ ticketId, currentStatus, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    try {
      setLoading(true);
      
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const data = await res.json();
      
      if (data.success && onStatusChange) {
        onStatusChange(ticketId, newStatus);
      }
    } catch (error) {
      console.error('Update status error:', error);
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={loading}
      className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      <option value="open">Open</option>
      <option value="in progress">In Progress</option>
      <option value="closed">Closed</option>
    </select>
  );
};

export default StatusToggle;

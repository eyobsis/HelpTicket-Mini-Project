'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import StatusToggle from './StatusToggle';

export default function TicketList({ tickets = [], onDelete, onUpdate, isAdmin = false }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    
    setDeletingId(ticketId);
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete ticket');
      }

      onDelete?.(ticketId);
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (ticketId) => {
    router.push(`/tickets/${ticketId}/edit`);
  };

  const handleStatusChange = (ticketId, newStatus) => {
    onUpdate?.(ticketId, newStatus);
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket._id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{ticket.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <span className={`px-2 py-1 text-sm rounded-full ${
                ticket.status === 'open' ? 'bg-red-100 text-red-800' : 
                ticket.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {ticket.status}
              </span>
              {isAdmin && <StatusToggle 
                ticketId={ticket._id} 
                currentStatus={ticket.status}
                onStatusChange={handleStatusChange}
              />}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500">
              {new Date(ticket.createdAt).toLocaleDateString()}
              {isAdmin && ticket.user?.name && (
                <span className="block mt-1">User: {ticket.user.name}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(ticket._id)}
                className="text-blue-500 hover:text-blue-600 disabled:opacity-50"
                disabled={deletingId === ticket._id}
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(ticket._id)}
                className="text-red-500 hover:text-red-600 disabled:opacity-50"
                disabled={deletingId === ticket._id}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
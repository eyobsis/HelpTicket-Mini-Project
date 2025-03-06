'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TicketList from '@/components/TicketList';
import Spinner from '@/components/Spinner';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && user.role !== 'admin') {
      router.push('/dashboard/user');
    } else if (user) {
      fetchTickets();
    }
  }, [user, authLoading, router]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/tickets');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to fetch tickets');
      
      setTickets(data.data);
    } catch (error) {
      setError(error.message);
      console.error('Fetch tickets error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      setProcessingId(ticketId);
      setError('');
      
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update ticket');

      // Optimistic update with immediate refresh
      setTickets(prev => prev.map(ticket => 
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      ));
      await fetchTickets(); // Refresh data from server
    } catch (error) {
      setError(error.message);
      console.error('Status change error:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (ticketId) => {
    try {
      if (!window.confirm('Are you sure you want to delete this ticket?')) return;
      
      setProcessingId(ticketId);
      setError('');
      
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete ticket');
      }

      // Optimistic update with immediate refresh
      setTickets(prev => prev.filter(ticket => ticket._id !== ticketId));
      await fetchTickets(); // Refresh data from server
    } catch (error) {
      setError(error.message);
      console.error('Delete error:', error);
    } finally {
      setProcessingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <TicketList 
        tickets={tickets} 
        isAdmin={true} 
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        processingId={processingId}
      />
    </div>
  );
}
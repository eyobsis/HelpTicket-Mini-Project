'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TicketForm from '@/components/TicketForm';
import TicketList from '@/components/TicketList';
import Spinner from '@/components/Spinner';

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push('/login');
      else if (user.role === 'admin') router.push('/dashboard/admin');
      else fetchTickets();
    }
  }, [user, authLoading, router]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tickets', { credentials: 'include' });
      const data = await res.json();
      if (data.success) setTickets(data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketCreated = async (newTicket) => {
    try {
      setFormLoading(true);
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) setTickets([data.data, ...tickets]);
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleTicketDeleted = (deletedId) => {
    setTickets(prev => prev.filter(t => t._id !== deletedId));
  };

  const handleTicketUpdated = async (ticketId) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setTickets(prev => prev.map(t => 
          t._id === ticketId ? data.data : t
        ));
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner className="h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Support Tickets</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
            <TicketForm 
              onTicketCreated={handleTicketCreated}
              loading={formLoading}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Your Tickets ({tickets.length})
            </h2>
            <TicketList
              tickets={tickets}
              onDelete={handleTicketDeleted}
              onUpdate={handleTicketUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
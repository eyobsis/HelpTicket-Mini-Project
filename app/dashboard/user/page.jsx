'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TicketForm from '@/components/TicketForm';
import TicketList from '@/components/TicketList';
import Spinner from '@/components/Spinner';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchTickets();
    }
  }, [user, authLoading]);

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

  const handleCreateTicket = async (formData) => {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Creation failed');

      setTickets(prev => [data.data, ...prev]);
      setFormSuccess('Ticket created successfully!');
      setFormError('');
      setTimeout(() => setFormSuccess(''), 3000);
    } catch (error) {
      setFormError(error.message);
      setFormSuccess('');
      setTimeout(() => setFormError(''), 5000);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!res.ok) throw new Error('Delete failed');
      setTickets(prev => prev.filter(t => t._id !== ticketId));
      setSelectedTicket(null);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Spinner className="h-12 w-12 text-orange-500 dark:text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-yellow-300">
            Your Support Tickets
          </h1>
          <span className="px-4 py-2 bg-orange-500/10 text-orange-500 dark:text-orange-400 rounded-full">
            {tickets.length} Active
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Create Ticket Card */}
          <div className="gradient-border">
            <div className="gradient-border-inner">
              <h2 className="text-xl font-semibold mb-4 dark:text-yellow-300 flex items-center gap-2">
                Create New Ticket
              </h2>
              {formError && (
                <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-300">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="mb-4 p-3 bg-green-100/80 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-green-600 dark:text-green-300">
                  <CheckCircleIcon className="h-5 w-5" />
                  {formSuccess}
                </div>
              )}
              <TicketForm onSubmit={handleCreateTicket} />
            </div>
          </div>

          {/* Ticket List Card */}
          <div className="gradient-border">
            <div className="gradient-border-inner">
              <h2 className="text-xl font-semibold mb-4 dark:text-yellow-300 flex items-center gap-2">
                Ticket History
              </h2>
              <TicketList
                tickets={tickets}
                onDelete={setSelectedTicket}
              />
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4 dark:text-yellow-300">
                Confirm Delete
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this ticket? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTicket(selectedTicket)}
                  className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors"
                >
                  Delete Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
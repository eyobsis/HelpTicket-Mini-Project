'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TicketList from '@/components/TicketList';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
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
      
      const res = await fetch('/api/tickets');
      const data = await res.json();
      
      if (data.success) {
        setTickets(data.data);
      }
    } catch (error) {
      console.error('Fetch tickets error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <TicketList 
        tickets={tickets} 
        isAdmin={true} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
}
